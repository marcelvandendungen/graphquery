var graphEndpoint = {
            'https://graph.windows.net/': '00000002-0000-0000-c000-000000000000'
        };

window.config = {
    instance: 'https://login.microsoftonline.com/',
    tenant: 'common', // multi-tenant
    clientId: 'a43e27ea-e047-4504-84d2-831800ebda98',   // client id
    postLogoutRedirectUri: window.location.origin,
    cacheLocation: 'localStorage',
    endpoints: graphEndpoint
};
