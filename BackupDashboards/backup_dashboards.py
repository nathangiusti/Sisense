from PIL import Image
import requests
import yaml
import sys

RETRY = 3
ERROR_DASHES = []


def authenticate(host, authentication_params):
    """
    Authenticates with Sisense

    :param host: the host address
    :param authentication_params: A dictionary with a username and password entry
    :return: A json blob to be used as a header for sisense calls
    """
    if 'username' not in authentication_params or 'password' not in authentication_params:
        print('Missing username or password')
        exit()

    data = {'username': authentication_params['username'], 'password': authentication_params['password']}
    resp = requests.post('{}/api/v1/authentication/login'.format(host), data=data)
    parse_error_response(resp, "Error authenticating", True)

    access_code = "Bearer " + resp.json()['access_token']
    print("Authentication successful")
    return {'authorization': access_code}


def build_query_string(query_parameters):
    """
    Turns a dictionary of query parameters into a query string

    :param query_parameters: a dictionary of query parameters
    :return: The query_parameters dictionary flattened into a string
    """

    query_string = ''
    if not query_parameters:
        return query_string
    for param in query_parameters:
        if isinstance(query_parameters[param], bool):
            val = str(query_parameters[param]).lower()
        else:
            val = query_parameters[param]
        query_string += '{}={}&'.format(param, val)
    if not query_string:
        return ''
    else:
        return query_string[:-1]


def parse_error_response(response, error_text, exit_on_error=False):
    """
    Parses REST response object for errors

    :param response: the REST response object
    :param error_text: Text to print on error
    :param exit_on_error: True to exit on error, false to continue
    :return: True if no error, false if response errored
    """
    if response.status_code != 200:
        print("ERROR: {}: {}".format(error_text, response.status_code))
        print(response.content)
        if exit_on_error:
            exit()
        return False
    return True


def build_path(folder, dashboard_id, file_format, file_num=None):
    """
    Builds the path to save the export to

    :param folder: Folder to save dashboard to
    :param dashboard_id: Id of dashboard
    :param file_format: Format to save dashboard to
    :param file_num: A number to place after the file name in case multiple images from the same dash are taken
    :return: A string in the format <path>/dashboard_id.file_format
    """
    if file_num:
        return "{}\\{}-{}.{}".format(folder, dashboard_id, file_num, file_format)
    else:
        return "{}\\{}.{}".format(folder, dashboard_id, file_format)


def call_export_api(headers, request_string):
    """
    Wrapper for making and parsing API export calls

    :param headers: The header with bearer token
    :param request_string: String of API to call
    :return: Response if successful, none if not
    """
    i = 0
    while i < RETRY:
        i += 1
        try:
            print('Calling {}'.format(request_string))
            resp = requests.get(request_string, headers=headers)
        except requests.exceptions.RequestException as err:
            if i < RETRY:
                print("Error with request, retyring")
                continue
            else:
                print('Maximum retries exceeded for {}'.format(request_string))
                print(err)
                ERROR_DASHES.append(request_string)
                return None

        if parse_error_response(resp, "Error exporting dashboard"):
            return resp
        else:
            if i < RETRY:
                print("Error with response, retyring")
            else:
                ERROR_DASHES.append(request_string)
                print('Maximum retries exceeded for {}'.format(request_string))
                return None


def export_dash(host, dashboard, headers, file_folder):
    """
    Exports dashboard to dash file

    :param host: The host address
    :param dashboard: Dashboard id
    :param headers: Header object with authentication
    :param file_folder: Folder to save dash file to
    :return: Nothing
    """
    request_string = '{}/api/v1/dashboards/{}/export/dash'.format(host, dashboard)
    resp = call_export_api(headers, request_string)
    if resp:
        print("Dashboard {} exported to dash successfully".format(dashboard))
        with open(build_path(file_folder, dashboard, 'dash'), 'wb') as out_file:
            out_file.write(resp.content)


def generate_file(host, format_vars, dashboard, headers, file_folder, widget_id=None, count=0):
    query_string = ''
    if 'query_params' in format_vars:
        query_string = build_query_string(format_vars['query_params'])
    if widget_id:
        request_string = '{}/api/v1/dashboards/{}/widgets/{}/export/{}?{}'.format(host, dashboard, widget_id, format_vars['file_type'], query_string)
    else:
        request_string = '{}/api/v1/dashboards/{}/export/{}?{}'.format(host, dashboard, format_vars['file_type'], query_string)
    resp = call_export_api(headers, request_string)
    file_path = build_path(file_folder, dashboard, format_vars['file_type'], count)
    if resp:
        with open(file_path, 'wb') as out_file:
            for chunk in resp:
                out_file.write(chunk)
        print("Dashboard {} exported to {} successfully".format(dashboard, format_vars['file_type']))
    return file_path


def create_cropping_list(cropping_string):
    coord_list = []
    for coord_str in cropping_string:
        if len(coord_str.split(',')) != 5:
            print("Invalid coordinate string {}. Requires 5 integers.".format(cropping_string))
            continue
        for coord in coord_str.split(','):
            coord_list.append(int(coord))
    return coord_list


def export_png(host, format_vars, dashboard, headers, file_folder, cropping):
    """
    Exports dashboard to png

    :param host: The host address
    :param format_vars: Dictionary from YAML containing format variables
    :param dashboard: The dashboard id
    :param headers: The header of the response file with authorization code
    :param file_folder: Folder to export dashboard to
    :param cropping: The cropping yaml section
    :return: Nothing
    """
    if cropping and dashboard in cropping:
        i = 0
        for coord_str in cropping[dashboard]:
            i += 1
            coord_arr = coord_str.split(',')
            if len(coord_arr) == 5:
                png_file = generate_file(host, format_vars, dashboard, headers, file_folder)
                image_obj = Image.open(png_file)
                x1 = int(coord_arr[0])
                y1 = int(coord_arr[1])
                x2 = int(coord_arr[2])
                y2 = int(coord_arr[3])
                width = int(coord_arr[4])
                cropped_image = image_obj.crop((x1, y1, x2, y2))
                scaling_ratio = width / (x2 - x1)
                y_coord = scaling_ratio * (y2 - y1)
                resized_image = cropped_image.resize((width, int(y_coord)))
                file_path = build_path(file_folder, dashboard, format_vars['file_type'], i)
                print('Cropped image to {} by {}'.format(width, int(y_coord)))
                resized_image.save(file_path)
                print("Image saved to {}".format(file_path))
            elif len(coord_arr) == 3:
                width = int(coord_arr[1])
                height = int(coord_arr[2])
                widget_format = {'file_type': 'png', 'query_params': {'width': width, 'height': height}}
                generate_file(host, widget_format, dashboard, headers, file_folder, coord_arr[0], count=i)
    else:
        return generate_file(host, format_vars, dashboard, headers, file_folder)


def export_pdf(host, format_vars, dashboard, headers, file_folder):
    """
    Exports dashboard to pdf

    :param host: The host address
    :param format_vars: Dictionary from YAML containing format variables
    :param dashboard: The dashboard id
    :param headers: The header of the response file with authorization code
    :param file_folder: Folder to export dashboard to
    :return: Nothing
    """
    required_params = ['paperFormat', 'paperOrientation', 'layout']
    for param in required_params:
        if param not in format_vars['query_params']:
            print('Missing parameter {}. Cannot export dashboard {}'.format())
            return
    generate_file(host, format_vars, dashboard, headers, file_folder)


def get_dashboards(host, headers, query_parameters):
    """
    Calls for list of dashboards from API

    :param host: The host address
    :param headers: The header of the response file with authorization code
    :param query_parameters: Query params to pass to api call
    :return: A list of dashboards ids returned by the API
    """
    return_arr = []
    query_string = build_query_string(query_parameters)
    resp = requests.get('{}/api/v1/dashboards?{}'
                        .format(host, query_string), headers=headers)
    if not parse_error_response(resp, "Error in getting Dashboard ids from API call"):
        return
    resp_json = resp.json()
    print('Found {} dashboards through API call'.format(len(resp_json)))
    for dashboard in resp_json:
        return_arr.append(dashboard['oid'])
    return return_arr


def main():
    if sys.argv[1] is None:
        print("No config file supplied")
        exit()

    config = sys.argv[1]

    with open(config, 'r') as stream:
        data_loaded = yaml.safe_load(stream)

    host = data_loaded['host']
    if not host:
        print('Missing host parameter')
        exit()

    if host.endswith('/'):
        host = host[:-1]

    headers = authenticate(host, data_loaded['authentication'])
    global_vars = data_loaded['globals']
    format_vars = global_vars['format']
    file_folder = global_vars['folder']
    cropping = data_loaded['cropping'] if 'cropping' in data_loaded else None

    dashboard_id_list = []
    if 'query_params' in data_loaded['dashboards']:
        dashboard_id_list = get_dashboards(host, headers, data_loaded['dashboards']['query_params'])

    if 'ids' in data_loaded['dashboards']:
        for dashboard in data_loaded['dashboards']['ids']:
            if dashboard not in dashboard_id_list:
                dashboard_id_list.append(dashboard)

    print('Backing up {} dashboards'.format(len(dashboard_id_list)))
    for dashboard in dashboard_id_list:
        if format_vars['file_type'] == 'png':
            export_png(host, format_vars, dashboard, headers, file_folder, cropping)
        elif format_vars['file_type'] == 'pdf':
            export_pdf(host, format_vars, dashboard, headers, file_folder)
        elif format_vars['file_type'] == 'dash':
            generate_file(host, format_vars, dashboard, headers, file_folder)

    print('Backups complete')
    if len(ERROR_DASHES) > 0:
        print("Following calls failed:")
        for dash in ERROR_DASHES:
            print(dash)


main()
