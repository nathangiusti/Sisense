import requests
import shutil
import yaml
import sys


def authenticate(authentication_params):
    """
    Authenticates with Sisense a

    :param authentication_params: A dictionary with a username and password entry
    :return: A json blob to be used as a header for sisense calls
    """
    if 'username' not in authentication_params or 'password' not in authentication_params:
        print('Missing username or password')
        exit()

    data = {'username': authentication_params['username'], 'password': authentication_params['password']}
    resp = requests.post('http://localhost:8081/api/v1/authentication/login', data=data)
    parse_error_response(resp, "Error authenticating", True)

    access_code = "Bearer " + resp.json()['access_token']
    return {'authorization': access_code}


def build_query_string(query_parameters):
    """
    Turns a dictionary of query parameters into a query string

    :param query_parameters: a dictionary of query parameters
    :return: The query_parameters dictionary flattened into a string
    """
    query_string = ''
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
        if exit_on_error:
            exit()
        return False
    return True


def build_path(folder, dashboard_id, file_format):
    """
    Builds the path to save the export to

    :param folder: Folder to save dashboard to
    :param dashboard_id: Id of dashboard
    :param file_format: Format to save dashboard to
    :return: A string in the format <path>/dashboard_id.file_format
    """
    return "{}\\{}.{}".format(folder, dashboard_id, file_format)


def export_dash(dashboard, headers, file_folder):
    """
    Exports dashboard to dash file

    :param dashboard: Dashboard id
    :param headers: Header object with authentication
    :param file_folder: Folder to save dash file to
    :return: Nothing
    """
    resp = requests.get('http://localhost:8081/api/v1/dashboards/{}/export/dash'
                        .format(dashboard), headers=headers, stream=True)
    if parse_error_response(resp, "Error exporting dashboard {}".format(dashboard)):
        print("Dashboard {} exported to dash successfully".format(dashboard))
    with open(build_path(file_folder, dashboard, 'dash'), 'wb') as out_file:
        out_file.write(resp.content)


def export_png(format_vars, dashboard, headers, file_folder):
    """
    Exports dashboard to png

    :param format_vars: Dictionary from YAML containing format variables
    :param dashboard: The dashboard id
    :param headers: The header of the response file with authorization code
    :param file_folder: Folder to export dashboard to
    :return: Nothing
    """
    query_string = build_query_string(format_vars['query_params'])
    resp = requests.get('http://localhost:8081/api/v1/dashboards/{}/export/png?{}'
                        .format(dashboard, query_string), headers=headers, stream=True)
    if parse_error_response(resp, "Error exporting dashboard {}".format(dashboard)):
        print("Dashboard {} exported to {} successfully".format(dashboard, format_vars['file_type']))
    with open(build_path(file_folder, dashboard, format_vars['file_type']), 'wb') as out_file:
        shutil.copyfileobj(resp.raw, out_file)


def export_pdf(format_vars, dashboard, headers, file_folder):
    """
    Exports dashboard to pdf

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
    query_string = build_query_string(format_vars['query_params'])
    resp = requests.get('http://localhost:8081/api/v1/dashboards/{}/export/pdf?{}'
                        .format(dashboard, query_string), headers=headers, stream=True)
    if parse_error_response(resp, "Error exporting dashboard {}".format(dashboard)):
        print("Dashboard {} exported to {} successfully".format(dashboard, format_vars['file_type']))
    with open(build_path(file_folder, dashboard, format_vars['file_type']), 'wb') as out_file:
        out_file.write(resp.content)


def main():
    if sys.argv[1] is None:
        print("No config file supplied")
        exit()

    config = sys.argv[1]

    with open(config, 'r') as stream:
        data_loaded = yaml.safe_load(stream)

    headers = authenticate(data_loaded['authentication'])
    global_vars = data_loaded['globals']
    format_vars = global_vars['format']
    file_folder = global_vars['folder']

    for dashboard in data_loaded['dashboards']:
        if format_vars['file_type'] == 'png':
            export_png(format_vars, dashboard, headers, file_folder)
        elif format_vars['file_type'] == 'pdf':
            export_pdf(format_vars, dashboard, headers, file_folder)
        elif format_vars['file_type'] == 'dash':
            export_dash(dashboard, headers, file_folder)


main()
