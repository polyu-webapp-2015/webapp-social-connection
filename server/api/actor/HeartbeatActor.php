<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 * @deprecated
 */
class HeartbeatActor extends Actor
{

    public $name = "Heartbeat";
    public $params = array(
        User::_userId => "player1@gmail.com"
    );
    public $output = ResultCode::_success;
    public $desc = "client active push to server to stay alive";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        $db = new DatabaseHelper();
        $root = $db->load();
        $dict = $db->get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            $dict[$userId][User::_last_connection_time] = time();
            log_object("heartbeat from $userId");
            $db->save_on_path($root, User::_path, $dict);
            $this->output = ResultCode::_success;
        } else {
            log_object("heartbeat from $userId, but user not found!");
            $this->output = ResultCode::_user_not_exist;
        }
        return $this->output;
    }
}

$_heartbeatActor = new HeartbeatActor();
addAPI($_heartbeatActor);
