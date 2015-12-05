<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class AcceptInviteGame1Actor extends Actor
{

    public $name = "AcceptInviteGame1";
    public $params = array(
        /*guest*/
        User::_userId => "player1@gmail.com",
        /*host*/
        Game1::_creator_userId => "player2",
        User::_creator_is_blue => 1
    );
    public $output = [
        ResultCode::_ => ResultCode::_success,
        Game1::_gameId => 12
    ];
    public $desc = "accept invite to play Game1 with opposite user";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        $guest_userId = $userId;
        $opposite_userId = $data[Game1::_creator_userId];
        $creator_userId = $opposite_userId;
        $creator_is_blue = $data[User::_creator_is_blue];
        $db = new DatabaseHelper();
        $root = $db->load();
        $dict = $db->get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            /* sender exist */
            if (array_key_exists($opposite_userId, $dict)) {
                /* opposite exist */
                if ($dict[$opposite_userId][User::_status_playing] == 1) {
                    log_object_from_named("opposite is playing game", $this->name);
                    /* remove this opposite from pending list*/
                    //TODO test if this function call works
                    unset($dict[$userId][User::_pending_game1_invite_array][$opposite_userId]);
                    $this->output[ResultCode::_] = ResultCode::_opposite_busy;
                } else {
                    log_object_from_named("success", $this->name);
                    /* clean all other pending invite */
                    $dict[$userId][User::_pending_game1_invite_array] = [];
                    $game = Game1::create($opposite_userId, $userId);
                    if ($creator_is_blue) {
                        $game[Game1::_player_blue] = $creator_userId;
                        $game[Game1::_player_red] = $guest_userId;
                    } else {
                        $game[Game1::_player_blue] = $guest_userId;
                        $game[Game1::_player_red] = $creator_userId;
                    }
                    /* save user info */
                    $db->save_on_path($root, User::_path, $dict);
                    /* save game info */
                    $dict = $db->get_or_create_path($root, Game1::_path);
                    $dict[$game[Game1::_gameId]] = $game;
                    $db->save_on_path($root, Game1::_path, $dict);
                    $this->output[ResultCode::_] = ResultCode::_success;
                    $this->output[Game1::_gameId] = $game[Game1::_gameId];
                    /* session game info into session */
                    if (session_start()) {
                        $_SESSION[Game1::_gameId] = $game[Game1::_gameId];
                    } else {
                        /* failed to start session */
                        throw new Exception("Failed to start session");
                    }
                }
            } else {
                /* opposite not exist */
                log_object_from_named("opposite user not exist", $this->name);
                $this->output[ResultCode::_] = ResultCode::_user_not_exist;
            }
        } else {
            log_object_from_named("sender user not exist", $this->name);
            $this->output[ResultCode::_] = ResultCode::_user_not_exist;
        }
        return $this->output;
    }
}

$_acceptInviteGame1Actor = new AcceptInviteGame1Actor();
addAPI($_acceptInviteGame1Actor);
