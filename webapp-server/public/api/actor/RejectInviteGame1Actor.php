<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class RejectInviteGame1Actor extends Actor
{
    const _opposite_userId_array = "opposite_userId_array";

    public $name = "RejectInviteGame1";
    public $params = array(
        User::_userId => "player1@gmail.com",
        Game1::_creator_userId => "player2"
    );
    public $output = ResultCode::_success;
    public $desc = "reject invite to play Game1 with opposite user";

    public function handle($data)
    {
        log_object($data);
        $userId = $data[User::_userId];
        $opposite_userId_array = $data[self::_opposite_userId_array];
        $db = new DatabaseHelper();
        $root = $db->load();
        $dict = $db->get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            /* sender exist */
            if (true) {
                $new_list = [];
                foreach ($dict[$userId][User::_pending_game1_invite_array] as $opposite_userId) {
                    if (!in_array($opposite_userId, $opposite_userId_array))
                        array_push($new_list, $opposite_userId);
                }
                $dict[$userId][User::_pending_game1_invite_array]=$new_list;
            } else {
                foreach ($opposite_userId_array as $opposite_userId) {
                    if ((in_array($opposite_userId, $dict[$userId][User::_pending_game1_invite_array]))) {
//                if (array_key_exists($opposite_userId, $dict[$userId][User::_pending_opposite_array])) {
                        /* opposite exist */
                        error_log("unset on $opposite_userId");
                        log_object(($dict[$userId][User::_pending_game1_invite_array][$opposite_userId]));
//                    unset($dict[$userId][User::_pending_opposite_array][$opposite_userId]);
                        remove_from_array($opposite_userId, $dict[$userId][User::_pending_game1_invite_array]);
                        log_object(($dict[$userId][User::_pending_game1_invite_array][$opposite_userId]));
                    } else {
                        error_log("failed to find $opposite_userId");
                        log_object($dict[$userId][User::_pending_game1_invite_array]);
                    }
                }
            }
            $db->save_on_path($root, User::_path, $dict);
        } else {
            log_object_from_named("sender user not exist", $this->name);
            $this->output = ResultCode::_user_not_exist;
        }
        return $this->output;
    }
}

$_rejectInviteGame1Actor = new RejectInviteGame1Actor();
addAPI($_rejectInviteGame1Actor);
