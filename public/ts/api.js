///<reference path="lang.ts"/>
///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="utils.ts"/>
//declare var _$global:any;
var api;
(function (api) {
    var extras = [];
    function addExtra(extra) {
        extras.push(extra);
    }
    api.addExtra = addExtra;
    function setExtra(extra) {
        removeExtra(extra[0]);
        addExtra(extra);
    }
    api.setExtra = setExtra;
    function removeExtra(key) {
        extras = extras.filter(function (extra) {
            return extra[0] != key;
        });
    }
    api.removeExtra = removeExtra;
    //var _api_url = "http://localhost:8000/api/main.php";
    var _api_url = serv_addr;
    function set_api_url(url) {
        _api_url = url;
    }
    api.set_api_url = set_api_url;
    function api_call(api_action, data, handler, failMessage) {
        if (failMessage === void 0) { failMessage = "Failed to call api " + api_action; }
        utils.log("calling api " + api_action);
        extras.forEach(function (extra) {
            data[extra[0]] = extra[1];
        });
        var payload = {
            "action": api_action,
            "data": data
        };
        function commFailed(data) {
            utils.log(failMessage);
            utils.log(data);
            //alert('internal error');
            alert(failMessage);
            alert(data);
        }
        function commSuccess(data) {
            try {
                var apiResult = [data[APIField.result_code], data];
                /* process data (transform) */
                var t = handler[0](apiResult);
            }
            catch (exception) {
                utils.log("Failed to parse result from api call");
                commFailed(data);
            }
            /* use data (consume) */
            handler[1](t);
        }
        if (api.$http == null)
            api.$http = _$http;
        if (api.$http != null) {
            api.$http.post(_api_url, {
                action: api_action,
                data: JSON.stringify(data)
            })
                .success(commSuccess)
                .error(commFailed);
        }
        else {
            $.ajax({
                type: "POST",
                url: _api_url,
                crossDomain: true,
                //dataType: 'jsonp',
                success: function (e) {
                    try {
                        var result = JSON.parse(e);
                        commSuccess(result);
                    }
                    catch (exception) {
                        //utils.log("failed to parse json from api result");
                        //commFailed(e);
                        commSuccess(e);
                    }
                }
            }).error(commFailed);
        }
    }
    api.api_call = api_call;
    function use_all_row(table_name, handler) {
        var data = {};
        data[APIField.table_name] = table_name;
        api_call(_api_GetTableRowList, data, handler);
    }
    api.use_all_row = use_all_row;
    /**
     * @type T the type of id (most likely INT (number))
     * */
    function all_all_row(table_name, row_array, handler) {
        var data = {};
        data[APIField.table_name] = table_name;
        data[APIField.element_array] = row_array;
        api_call(_api_AddTableRowList, data, handler);
    }
    api.all_all_row = all_all_row;
    function set_all_row(table_name, rows) {
    }
    api.set_all_row = set_all_row;
})(api || (api = {}));
//# sourceMappingURL=api.js.map