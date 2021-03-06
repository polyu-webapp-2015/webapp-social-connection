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
            var qwe = typeof  e;
            if ((typeof e) == (typeof {a: 1}))
                e = dictToString(e);
            str = "" + i + "=" + e;
        }
    });
    return str;
}

// JSON.pruned : a function to stringify any object without overflow
// example : var json = JSON.pruned({a:'e', c:[1,2,{d:{e:42, f:'deep'}}]})
// two additional optional parameters :
//   - the maximal depth (default : 6)
//   - the maximal length of arrays (default : 50)
// GitHub : https://github.com/Canop/JSON.prune
// This is based on Douglas Crockford's code ( https://github.com/douglascrockford/JSON-js/blob/master/json2.js )
(function () {
    'use strict';

    var DEFAULT_MAX_DEPTH = 6;
    var DEFAULT_ARRAY_MAX_LENGTH = 50;
    var seen; // Same variable used for all stringifications

    Date.prototype.toPrunedJSON = Date.prototype.toJSON;
    String.prototype.toPrunedJSON = String.prototype.toJSON;

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder, depthDecr, arrayMaxLength) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' && typeof value.toPrunedJSON === 'function') {
            value = value.toPrunedJSON(key);
        }

        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
                if (depthDecr <= 0 || seen.indexOf(value) !== -1) {
                    return '"-pruned-"';
                }
                seen.push(value);
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = Math.min(value.length, arrayMaxLength);
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value, depthDecr - 1, arrayMaxLength) || 'null';
                    }
                    v = partial.length === 0
                        ? '[]'
                        : '[' + partial.join(',') + ']';
                    return v;
                }
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        try {
                            v = str(k, value, depthDecr - 1, arrayMaxLength);
                            if (v) partial.push(quote(k) + ':' + v);
                        } catch (e) {
                            // this try/catch due to some "Accessing selectionEnd on an input element that cannot have a selection." on Chrome
                        }
                    }
                }
                v = partial.length === 0
                    ? '{}'
                    : '{' + partial.join(',') + '}';
                return v;
        }
    }

    JSON.pruned = function (value, depthDecr, arrayMaxLength) {
        seen = [];
        depthDecr = depthDecr || DEFAULT_MAX_DEPTH;
        arrayMaxLength = arrayMaxLength || DEFAULT_ARRAY_MAX_LENGTH;
        return str('', {'': value}, depthDecr, arrayMaxLength);
    };

}());

var MODE_WEBSOCKET = "websocket";
//@Deprecated
var MODE_JSONP = "jsonp";
var MODE_AJAX = "ajax";
var MODE = MODE_WEBSOCKET;
var TYPE_GET = "get";
var TYPE_POST = "post";
var TYPE_JSON = "application/json";
var TYPE_JSONP = "application/javascript";
var TYPE_XML = "application/xml";
var ERROR_SERVER = "server side error";
var BACKEND_PHP="php";
var BACKEND_PLAY="play";
var BACKEND=BACKEND_PHP;

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
 @param {*} data : {key:value} / {requestMethod:[TYPE_GET/TYPE_POST],params:{key:value}}
 @param {function} succ : callback when request success
 @param {function} fail : callback when request failed
 @param {boolean} preferGet : by default use post, if true use get
 */
function apiCall(host, port, api, data, succ, fail, preferGet) {
    if(BACKEND==BACKEND_PHP){
        apiCallPHP(host,port,api,data,succ,fail,preferGet);
        return;
    }
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
            /*assign default requestMethod if not set*/
            if (!data.requestMethod) {
                data = {
                    requestMethod: TYPE_POST,
                    params: data
                };
                if (preferGet)
                    data.requestMethod = TYPE_GET;
            }
            if (data.requestMethod == TYPE_GET)
                data.params = dictToString(data.params);
            else
                data.params = JSON.pruned(data.params);
            return ajaxCallSimple(url, data.requestMethod, data.params, succ, fail);
            break;
        default :
            fail();
    }
}

function apiCallPHP(host, port, api, data, succ, fail, preferGet) {
    var url="http://"+host+":"+port+"/api/main.php";
    console.log("url="+url);
    var method=TYPE_POST;
    if(preferGet)method=TYPE_GET;
    //TODO convert data into post or get
    var payload={
        "action":api,
        "data":data
    };
    var dataString=JSON.pruned(payload);
    //ajaxCallSimple(url,method,dataString,succ,fail);
    ajaxCallSimple(url,method,payload,succ,fail);
}
function apiCallPHP2(host, port, api, data, succ, fail, preferGet) {
    //var url="http://localhost:9000/api/index.php";
    var url="http://58.96.176.223:9000/httpEcho";
    function succ(data){
        console.log(data);
    }
    ajaxCallSimple(url,"POST",data,succ,succ);
}
