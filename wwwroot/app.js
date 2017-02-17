(function () {

    var getTenantId = function (token) {
        var parts = token.split(".");
        var claims = JSON.parse(atob(parts[1]));
        return claims.tid;
    };

    var executeGraphQuery = function (adal) {

        adal.acquireToken("https://graph.windows.net/", function(error, token) {
        
        if (token) {

            var tid = getTenantId(token);

            var $path = $('#graphUrl').val();
            var path = $path.replace("{tid}", tid);

            $.ajax({
                type: "GET",
                url: "https://graph.windows.net" + path + "?api-version=1.6",
                headers: {
                'Accept': 'application/json;odata=nometadata',
                'Authorization': 'Bearer ' + token,
            },
            success: function(data) {
                var $testarea = $('#response');
                $testarea.val(JSON.stringify(data, null, 2));
                console.log(data);
            }});
        } else if (error) {
            console.log(error);
        } 

        });
    };

    var authContext = new AuthenticationContext(config);

    var isCallback = authContext.isCallback(window.location.hash);
    authContext.handleWindowCallback();
    
    var error = authContext.getLoginError();
    if (error) {
        console.log(error);
    }

    if (window !== window.parent) {
        return;
    }

    if (isCallback && !authContext.getLoginError()) {
        window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
    }

    var that = this;

    var $submit = $('#submit');
    $submit.on('click', function (e) {
        executeGraphQuery(authContext);
        e.preventDefault();
    });

    var user = authContext.getCachedUser();
    if (user) {

        executeGraphQuery(authContext);

    } else {

        authContext.login();
    }

}());