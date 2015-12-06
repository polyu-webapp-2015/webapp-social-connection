/* api action */
var _api_url = "api/main.php";
//var _api_set_action = "SetAction";
var _api_login = "Login";
var _api_signup = "Signup";
var _api_get_user_list = "GetUserList";
var _api_invite_game1 = "InviteGame1";
var _api_accept_game1 = "AcceptInviteGame1";
var _api_reject_game1 = "RejectInviteGame1";
var _api_get_game1Id = "GetGame1Id";
var _api_move_chess_to_grid_array = "MoveChessToGridArray";
var _api_move_chess_array_to_drawer = "MoveChessArrayToDrawer";
var _api_get_last_mail_array = "GetLastMailArray";
var _api_get_game_info = "GetGameInfo";
var _api_send_mail = "SendMail";
var _api_start_game = "StartGame";
var _api_set_user_location="SetUserLocation";

/* api result field */
var _data = "data";
var _userId = "userId";
var _opposite_userId = "opposite_userId";
var _location = "location";
var _last_connection_time = "last_connection_time";
var _status_online = "status_online";
var _status_playing = "status_playing";
var _last_gameId = "last_gameId";
var _pending_game1_invite_array = "pending_game1_invite_array";
var _gameId = "gameId";
var _user_list = "user_list";
var _player_red = "player_red";
var _player_blue = "player_blue";
var _guest_userId = "guest_userId";
var _creator_userId = "creator_userId";
var _creator_is_blue = "creator_is_blue";
var _chessId = "chessId";
var _chess_array = "chess_array";
var _chessId_array = "chessId_array";
var _gridId = "gridId";
var _mail_array = "mail_array";
var _mailId = "mailId";
var _source_userId = "source_userId";
var _msg = "msg";
var _keep = "keep";
var _type = "type";
var _type_action = "action";
var _type_msg = "msg";
var _type_chess_move_array = "chess_move_array";
var _type_game_status = "game_status";
/**@deprecated*/
var _type_chess_killed = "chess_killed";
/**@deprecated*/
var _type_current_player = "current_player";
var _type_surround = "surround";

/* api result code */
var _result_code = "resultCode";
var _result_code_success = 0;
var _result_code_user_not_exist = 1;
var _result_code_password_wrong = 2;
var _result_code_duplicated_userId = 3;
const _result_code_opposite_busy = 4;
const _result_code_game_not_exist = 5;

/* heart beat config */
const _min_beat_in_second = 2;
const _heart_beat_duration_in_seconds = 10;
const _heart_beat_ratio = 2;

var _default_max_retry = 3;

function getBeatInterval(lastTimeElapsedInMillisecond) {
    return Math.min(Math.max(lastTimeElapsedInMillisecond, _min_beat_in_second * 1000), _heart_beat_duration_in_seconds * 1000);
}

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
