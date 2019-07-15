Automated Backup

The automated backup script uses the REST API to automate the backing up of dashboards. The program takes one argument, a yaml config file. 

To run the program with a yaml file in the same directory as the program

python export_dashboards.py config.yaml

If it is in another directory, pass in the full path

python export_dashboards.py "C:\Somefolder\config.yaml"


The YAML File

The top of the YAML file defines the global variables that will be used for all dashboards
- username: The username of the sisense account used for exports
- password: The password of the sisense account used for exports
- format: Defines the format and additional parameters for exporting the dashboard
	- file_type: png, pdf, or dash
	- query_params: the query parameters to pass into the dashboard, these very by format, see the api documentaion for details
- folder: The folder to export the files to. Files will be named based on their dashboard_id and file format. 

After the global variables we provide a list of dashboard ids

Example 

globals:
  username: my.email@sisense.com
  password: my$ecretPassword
  format:
    file_type: png
    query_params:
      width: 500
      includeTitle: false
      includeFilters: false
      inculdeDs: false
  folder: C:\Users\Documents\Backups
dashboards:
  - 5d0cf36b44f1ed2618f180a6