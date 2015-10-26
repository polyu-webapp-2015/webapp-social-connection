/**
 * Created by beenotung on 9/28/15.
 */

/* compare inclusively */
function isBetweenLH(a, l, h) {
    return a >= j && a <= h;
}
/* pair : {min,max} */
function isBetweenMinMax(a, pair) {
    return a >= pair.min && a <= pair.max;
}

/* loop through the array */
/*  input :
 *    apply (func)
 *       input : index, element
 *       output : early terminate
 * */
function forEachArray(arr, apply) {
    var i, e;
    for (i in arr) {
        e = arr[i];
        if (apply(i, e))
            break;
    }
}

function dictToString(dict) {
    var str;
    forEachArray(dict, function (i, e) {
        if (str) {
            /*tail elements*/
            str += "&" + i + "=" + e;
        } else {
            /*first element*/
            str = "" + i + "=" + e;
        }
    });
    return str;
}

var MODE_WEBSOCKET = "websocket";
var MODE_JSONP = "jsonp";
var MODE_AJAX = "ajax";
var MODE = MODE_WEBSOCKET;
var TYPE_GET = "get";
var TYPE_POST = "post";
var TYPE_JSON = "application/json";
var TYPE_JSONP = "application/javascript";
var TYPE_XML = "application/xml";
var ERROR_SERVER = "server side error";

function ajaxCallJsonp(url, options, ok, fail) {
    var request = jQuery.post(url, options, null, "json");
    request.success(ok);
    request.error(fail);
    return request;
}

function ajaxCallSimple(url, method, data, ok, fail) {
    var request = jQuery.ajax({
        url: url,
        method: method,
        dataType: TYPE_JSON,
        /*username:"",password:"",*/
        data: data,
        success: ok,
        error: fail,
        crossDomain: true,
        cache: false
    });
    return request;
}

function onceWebSocketCall(host, port, api, data, succ, fail) {
    var ws;
    try {
        var url = "ws://" + host + ":" + port + "/" + api;
        ws = new WebSocket(url);
        ws.onopen = function () {
            ws.send(JSON.stringify(data));
        };
        ws.onmessage = function (event) {
            var receivedData;
            try {
                /*parse json from income message*/
                receivedData = $.parseJSON(event.data);
            } catch (e) {
                /*return raw value from income message*/
                receivedData = event.data;
            }
            ws.close();
            succ(receivedData);
        };
        ws.onerror = function (event) {
            ws.close();
            fail(event);
        };
    } catch (e) {
        fail(ERROR_SERVER);
    }
    return ws;
}

/**
 @param {string} host : ip or domain name of server
 @param {number} port : port number of server
 @param {string} api : remote function name
 @param {*} data : {key:value} / {method:[TYPE_GET/TYPE_POST],args:{key:value}}
 @param {function} succ : callback when request success
 @param {function} fail : callback when request failed
 */
function apiCall(host, port, api, data, succ, fail) {
    switch (MODE) {
        case MODE_WEBSOCKET:
            return onceWebSocketCall(host, port, api, data, succ, fail);
            break;
        case MODE_JSONP:
            var url = "http://" + host + ":" + port + "/" + api;
            return ajaxCallJsonp(url, data, succ, fail);
            break;
        case MODE_AJAX:
            var url = "http://" + host + ":" + port + "/" + api;
            /*assign default method if not set*/
            if (!data.method)
                data.method = TYPE_GET;
            if (data.method == TYPE_GET)
                data.args = dictToString(data.args);
            return ajaxCallSimple(url, data.method, data.args, succ, fail);
            break;
        default :
            fail();
    }
}