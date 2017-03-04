(function () {

    var formatter = new JsonFormatter();
    var json = '';

    var getTenantId = function (token) {
        var parts = token.split(".");
        var claims = JSON.parse(atob(parts[1]));
        return claims.tid;
    };

    var executeGraphQuery = function (adal, query, callback) {

        adal.acquireToken("https://graph.windows.net/", function(error, token) {
        
        if (token) {

            var tid = getTenantId(token);

            var path = query.replace("{tid}", tid);

            var url = "https://graph.windows.net" + path;
            if (url.indexOf('?') === -1) {
                url += "?api-version=1.6";
            } else {
                if (url.indexOf('api-version') === -1) {
                    url += "&api-version=1.6";
                }
            }

            $.ajax({
                type: "GET",
                url: url,
                headers: {
                'Accept': 'application/json;odata=nometadata',
                'Authorization': 'Bearer ' + token,
            },
            success: function(data) {
                callback(data);
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

    var user = authContext.getCachedUser();
    if (user) {

        $('body').on('click', '.image', function() { formatter.toggleNode(this); });

        var $submit = $('#submit');
        $submit.on('click', function (e) {

            var $path = $('#graphUrl').val();
            executeGraphQuery(authContext, $path, function(data) {

                var $textarea = $('#response');
                json = JSON.stringify(data, null, 2);
                $textarea.val(json);
                var canvas = $('#canvas');
                canvas.html(formatter.formatJson(data));
            });
            e.preventDefault();
        });

    } else {

        authContext.login();
    }

}());
