/**
 * Created by beenotung on 12/8/15.
 */

var _api_url = "http://58.96.176.223:9000/api/main.php";

function is_action_support_offline(action) {

}

function api_call($http, action, data, success_callback, error_callback) {
    $http.post(_api_url, {
            "action": action,
            "data": data
        })
        .success(success_callback)
        .error(error_callback);
}

function get_city($http, city_id) {
    var city_list = localStorage.getItem('city');
    if (city_list == null)
        city_list = {};
    if (city_list[city_id] == null) {

    }
    else return city_list[city_id];


    var session_id;
    sessionStorage.setItem('session_id', session_id);


    if (sessionStorage.getItem('session_id') != null)
        session_id = sessionStorage.getItem('session_id');
}