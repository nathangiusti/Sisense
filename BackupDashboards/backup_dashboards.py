import requests
import shutil
import yaml
import sys


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
    return "{}/{}.{}".format(folder, dashboard_id, file_format)


def export_png(format_vars, dashboard, headers, file_folder):
    """
    Exports dashboard to png

    :param format_vars: Dictionary from YAML containing format variables
    :param dashboard: The dashboard id
    :param headers: The header of the response file with authorization code
    :param file_folder: Folder to export dashboard to
    :return: Nothing
    """
    query_string = ''
    for param in format_vars['query_params']:
        query_string += '{}={}&'.format(param, format_vars['query_params'][param])
    resp = requests.get('http://localhost:8081/api/v1/dashboards/5d0a3f85108902389c0cbc08/export/png?{}'
                        .format(query_string), headers=headers, stream=True)
    if parse_error_response(resp, "Error exporting dashboard {}".format(dashboard)):
        print("Dashboard {} exported to {} successfully".format(dashboard, format_vars['file_type']))
    with open(build_path(file_folder, dashboard, format_vars['file_type']), 'wb') as out_file:
        shutil.copyfileobj(resp.raw, out_file)


def main():
    if sys.argv[1] is None:
        print("No config file supplied")
        exit()

    config = sys.argv[1]

    with open(config, 'r') as stream:
        data_loaded = yaml.safe_load(stream)

    global_vars = data_loaded['globals']
    if 'username' not in global_vars or 'password' not in global_vars:
        print('Missing username or password')
        exit()

    data = {'username': global_vars['username'], 'password': global_vars['password']}
    resp = requests.post('http://localhost:8081/api/v1/authentication/login', data=data)
    parse_error_response(resp, "Error authenticating", True)

    access_code = "Bearer " + resp.json()['access_token']
    headers = {'authorization': access_code}
    format_vars = global_vars['format']

    file_folder = global_vars['folder']

    for dashboard in data_loaded['dashboards']:
        if format_vars['file_type'] == 'png':
            export_png(format_vars, dashboard, headers, file_folder)


main()
