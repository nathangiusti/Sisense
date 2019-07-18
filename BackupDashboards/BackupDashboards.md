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

After the global settings, we set up the dashboards to backup. We can do this by explicit listing of ids, by pulling ids from the API or both.

See example configs
example_png.yaml - For exporting to YAML
example_pdf.yaml - For exporting to PDF
example_dash.yaml - For exporting to .dash
rest_dash.yaml - For pulling dashboard ids from the API

Details on the Sisense REST API can be found at https://developers.sisense.com/display/API2/REST+API+Reference+-+v1.0