<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class GetUserListActor extends Actor
{

//    const _is_inviting_me = "is_inviting_me";
    const _user_list = "user_list";

    public $name = "GetUserList";
    public $params = array(
        User::_userId => "player1"
    );
    public $output = array(
        self::_user_list => array(
            User::_userId => "player1",
            User::_location => "Hong Kong",
            User::_last_connection_time => 1234,
            User::_status_online => 1,
            User::_status_playing => 0,
            User::_last_game_id => 3,
        ),
        /* self only */
        User::_pending_game1_invite_array => [],
        /* matched and opposite-online only, 0 if not matched or opposite-offline */
        Game1::_gameId => 0
    );
    public $desc = "get user list, for picking opposite for chess game";

    /**
     * this method copy restricted user data from database to client
     * @param $data : request from client side
     * @return array : list of users
     */
    public function handle($data)
    {
        $userId = $data[User::_userId];
        User::heart_beat($data[User::_userId]);
        $db = new DatabaseHelper();
        $root = $db->load();
        $dict = $db->get_or_create_path($root, User::_path);
        $user_list = [];
//        log_object("-------------dist--------------");
//        log_object($dict);
        /** @var array $user */
        foreach ($dict as $user) {
            /* check to skip default element */
            if (!is_array($user))
                continue;
            $last_online = $user[User::_last_connection_time];
            if (!is_int($last_online))
                $last_online = 0;
            $user_info = [
                User::_userId => $user[User::_userId],
                User::_last_connection_time => $last_online
            ];
            /* only return the pending opposite array of the request user, not other user's */
            if ($user[User::_userId] == $userId) {
                $this->output[User::_pending_game1_invite_array] = [];
                if (!array_key_exists(User::_pending_game1_invite_array, $user)) {
                    $user[User::_pending_game1_invite_array] = [];
                }
                $pending_game1_invite_array = $user[User::_pending_game1_invite_array];
//                log_object($pending_game1_invite_array);
                foreach ($pending_game1_invite_array as $pending_game1_invite) {
                    $creator_userId = $pending_game1_invite[User::_creator_userId];
                    if (array_key_exists($creator_userId, $dict))
                        /* filter out offline player */
                        if (User::is_user_online($dict[$creator_userId]))
                            array_push($this->output[User::_pending_game1_invite_array], $pending_game1_invite);
                }
            }
            $key = User::_location;
            if (array_key_exists($key, $user))
                $user_info[$key] = $user[$key];
            else
                $user_info[$key] = "Unknown";
            $key = User::_last_game_id;
            if (array_key_exists($key, $user))
                $user_info[$key] = $user[$key];
            $is_online = User::is_user_online($user);
            $user_info[User::_status_online] = $is_online;
            $key = User::_status_playing;
            if (array_key_exists($key, $user))
                $user_info[$key] = $user[$key];
            else
                $user_info[$key] = 0;
            if (!$is_online)
                $user[User::_status_playing] = 0;
            array_push($user_list, $user_info);
            $gameId = Game1::is_matched($userId, $user[User::_userId]);
            if ($gameId != false) {
                if (User::is_user_online($user))
                    $this->output[Game1::_gameId] = $gameId;
            }
        }
        $this->output[self::_user_list] = $user_list;
        return $this->output;
    }
}

$_getUserListActor = new GetUserListActor();
addAPI($_getUserListActor);
