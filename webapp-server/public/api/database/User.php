<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/25/15
 * Time: 5:16 PM
 */
class User
{
    const _path = array("users");
    const _userId = "userId";
    const _password = "password";
    const _location = "location";
    const _last_connection_time = "last_connection_time";
    const _status_online = "status_online";
    const _status_playing = "status_playing";
    const _last_game_id = "last_game_id";
    const _pending_game1_invite_array = "pending_game1_invite_array";
    const _creator_userId = "creator_userId";
    const _creator_is_blue = "creator_is_blue";
    const _finished_game_array = "finished_game_array";

    /**
     * @param $userId
     * @param $password
     * @return array : user profile with all field filled default value
     * used to avoid key not exist in user dict
     */
    public static function create_new($userId, $password)
    {
        $newNode = array(
            User::_userId => $userId,
            User::_password => $password,
            User::_location => "Unknown",
            User::_last_connection_time => 0,
            User::_status_online => 0,
            User::_status_playing => 0,
            User::_last_game_id => 0,
            User::_pending_game1_invite_array => [],
            User::_finished_game_array => [],
            UserGameMailbox::_path => []
        );
        return $newNode;
    }

    /**
     * @define record heart beat from user, for later usage to detect if user is online
     * @param $userId
     */
    public static function heart_beat($userId)
    {
        $db = new DatabaseHelper();
        $root = $db->load();
        $dict = $db->get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            log_object("heart beat from $userId");
            $dict[$userId][User::_last_connection_time] = time();
            $db->save_on_path($root, User::_path, $dict);
        } else {
            log_object("heart beat from $userId, but user not found!");
        }
    }

    /**
     * @param $user array : user profile
     * @return bool : true if user has heart beat recently, false otherwise
     */
    public static function is_user_online(array $user)
    {
        if (array_key_exists(User::_last_connection_time, $user)) {
            /* user has heart beat, to check if too long ago */
            $last_online = $user[User::_last_connection_time];
            $max_next_beat = $last_online + Config::_heart_beat_duration_in_seconds * Config::_heart_beat_ratio;
            if (time() > $max_next_beat) {
                /* last heart beat was too long ago, count as offline */
                return false;
            } else {
                /* user has heart beat recently */
                return true;
            }
        } else {
            /* user not ever heart beat */
            return false;
        }
    }

    public static function is_userId_online($userId)
    {
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            $user = $dict[$userId];
            return self::is_user_online($user);
        } else {
            return false;
        }
    }
}

