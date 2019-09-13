Automated Backup

The automated backup script uses the REST API to automate the backing up of dashboards. The program takes one argument, a yaml config file. 

To run the program with a yaml file in the same directory as the program

python export_dashboards.py config.yaml

If it is in another directory, pass in the full path

python export_dashboards.py "C:\Somefolder\config.yaml"

The YAML File

Host: Fill in with the address your Sisense instance is hosted at. You can get this from the url you access Sisense at, copying everything before the /app. For local instances the host would probably be similar to http://localhost:8081
Authentication:

Authentication: Fill in the username and password to your Sisense. Ensure the account used has access to all the dashboards you are looking to export.

Global variables:
- format: Defines the format and additional parameters for exporting the dashboard
	- file_type: png, pdf, or dash
	- query_params: the query parameters to pass into the dashboard, these very by format, see the api documentation for details
- folder: The folder to export the files to. Files will be named based on their dashboard_id and file format. 

After the global settings, we set up the dashboards to backup. We can do this by explicit listing of ids, by pulling ids from the API or both. If you want to pull all the dashboards but with no filtering, create a query_params argument in the yaml, but don't add anything to it. Details for this can be seen rest_dash.yaml

You can also download images of just parts of the dashboard. This can be done by either grabbing a specific widget off a dashboard or by cropping the entire dashboard image. 
See example configs
example_png.yaml - For exporting to YAML
example_pdf.yaml - For exporting to PDF
example_dash.yaml - For exporting to .dash
rest_dash.yaml - For pulling dashboard ids from the API
example_crop.yaml - For cropping dashboards (only works for PNG exports)


Details on the Sisense REST API can be found at https://developers.sisense.com/display/API2/REST+API+Reference+-+v1.0

Troubleshooting:

You may need to install the dependent python libraries. This is done with the following commands:
pip install requests
pip install pyyaml
pip install Pillow

If you find you are getting 500 Internal Server Errors
- Disable/Update your JAQLine plugin (this is known to cause REST issues)
- Disable all plugins, if that works, enable them one by one to see which one is causing rest errors
- Ensure that the account used to authorize has at least viewer access to the dashboard and data permissions for all data in the dashboard
