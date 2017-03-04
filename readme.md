## GraphQuery
#### SPA to query the Azure AD graph API

This tool allows you to easily query the Azure AD graph API from the browser like the [Microsoft graph explorer][1]. 
You log in using directory administrator credentials and consent the application into your directory. 
Then you can pick a query from the dropdown list or enter your own query.
The JSON in the response will be nicely formatted and the tool enables you to easily navigate the tree by collapsing nodes.

- ensure you have [.NET Core 1.1][2] installed
- clone the repo into a folder
- run `dotnet restore` from the folder
- run `dotnet run` from the folder
- navigate your browser to `http://localhost:5002`
- consent the application into your directory
- pick a query from the dropdown list and click the query button.


[1]: https://graph.microsoft.io/en-us/graph-explorer
[2]: https://www.microsoft.com/net/download/core#/current