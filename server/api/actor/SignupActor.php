<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class SignupActor extends Actor
{
    const _path = array("users");
//    const _path = "users";


    public $name = "Signup";
    public $params = array(
        User::_userId => "player1@gmail.com",
        User::_password => "noOneKnow"
    );
    public $output = ResultCode::_success;
    public $desc = "create user, check if userId (email) exist";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        $password = $data[User::_password];
//        log_object("data");
//        log_object($data);
        $db = new DatabaseHelper();
        $root = $db->load();
        $dict = &$db->get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            log_object("Signup : duplicated userId");
            $this->output = ResultCode::_duplicated_userId;
        } else {
            $newNode = User::create_new($userId,$password);
            $dict[$userId] = $newNode;
//            log_object("root");
//            log_object($root);
//            log_object("dict");
//            log_object($dict);
//            log_object("dict==========");
//            log_object($dict);
            $db->save_on_path($root, self::_path, $dict);
            log_object("Signup : success");
            $this->output = ResultCode::_success;
        }
        return $this->output;
    }
}

$_signupActor = new SignupActor();
addAPI($_signupActor);
