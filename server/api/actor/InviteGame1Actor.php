<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class InviteGame1Actor extends Actor
{

    public $name = "InviteGame1";
    public $params = array(
        User::_userId => "player1",
        Game1::_guest_userId => "player2",
        User::_creator_is_blue => 1
    );
    public $output = ResultCode::_success;
    public $desc = "invite opposite to play game 1 with myself";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        $guest_userId = $data[Game1::_guest_userId];
        $db = new DatabaseHelper();
        $root = $db->load();
        $dict = $db->get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            if (array_key_exists($guest_userId, $dict)) {
                if ($dict[$guest_userId][User::_status_playing] == 1) {
                    log_object("InviteGame1 : guest user is playing game");
                    $this->output = ResultCode::_opposite_busy;
                } else {
                    log_object("InviteGame1 : success");
                    /* add to pending_game1_invite list */
                    $new_game1_invite = [
                        User::_creator_userId => $userId,
                        User::_creator_is_blue => $data[User::_creator_is_blue]
                    ];
                    log_object("before push-------------------------");
                    log_object($dict[$guest_userId][User::_pending_game1_invite_array]);
                    if (array_key_exists(User::_pending_game1_invite_array, $dict[$guest_userId])) {
                        array_push(
                            $dict[$guest_userId][User::_pending_game1_invite_array],
                            $new_game1_invite
                        );
                    } else
                        $dict[$guest_userId][User::_pending_game1_invite_array] = [$new_game1_invite];
                    log_object("after push-------------------------");
                    log_object($dict[$guest_userId][User::_pending_game1_invite_array]);
                    $db->save_on_path($root, User::_path, $dict);
                    $this->output = ResultCode::_success;
                }
            } else {
                log_object("InviteGame1 : guest user not exist");
                $this->output = ResultCode::_user_not_exist;
            }
        } else {
            log_object("InviteGame1 : sender user not exist");
            $this->output = ResultCode::_user_not_exist;
        }
        return $this->output;
    }
}

$_inviteGame1Actor = new InviteGame1Actor();
addAPI($_inviteGame1Actor);
