var _default_max_retry = 3;

/**
 * @define retry or prompt
 * */
function createDefaultErrorHandler(func, errorCount, p1, p2, p3, p4) {
    return function (e) {
        if (errorCount >= _default_max_retry) {
            var message = "Network not stable, please come later";
            alert(message);
            console.log(message);
            console.log(e);
            console.log("errorCount=" + errorCount);
        } else {
            if (errorCount == null)
                errorCount = 1;
            func(errorCount + 1, p1, p2, p3, p4)
        }
    };
}

function api_call(api_action, data, success, failed) {
    console.log("calling api " + api_action);
    var payload = {
        "action": api_action,
        "data": data
    };
    $.ajax({
        type: "POST",
        url: _api_url,
        data: payload,
        success: function (e) {
            try {
                var data = JSON.parse(e);
                try {
                    success(data);
                } catch (exception) {
                    console.log("failed to process api result");
                    console.log(exception);
                    console.log(e);
                }
            } catch (exception) {
                console.log("failed to parse json from api result");
                console.log(exception);
                console.log(e);
            }
        }
    }).error(failed);
}
