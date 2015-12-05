<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class LoginActor extends Actor
{

    public $name = "Login";
    public $params = array(
//        User::_userId => "player1@gmail.com",
//        User::_password => "noOneKnow"
    );
    public $output = ResultCodeEnum::_Success;
    public $desc = "login, check if userId exist, check if password correct";

    public function handle($data)
    {
//        $userId = $data[User::_userId];
//        $password = $data[User::_password];
//        $db = new DatabaseHelper();
//        $root = $db->load();
//        $dict = $db->get_or_create_path($root, User::_path);
//        if (array_key_exists($userId, $dict)) {
//            if ($dict[$userId][User::_password] == $password) {
//                log_object("Login : success");
//                global $_heartbeatActor;
//                $_heartbeatActor->handle($data);
//                $this->output = ResultCodeEnum::_Success;
//            } else {
//                log_object("Login : password wrong");
//                $this->output = ResultCodeEnum::_password_wrong;
//            }
//        } else {
//            log_object("Login : user not exist");
//            $this->output = ResultCodeEnum::_user_not_exist;
//        }
        return $this->output;
    }
}

$_loginActor = new LoginActor();
addAPI($_loginActor);
