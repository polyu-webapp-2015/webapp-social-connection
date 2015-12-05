<?php

class GetLastMailArrayActor extends Actor
{
    public $name = "GetLastMailArray";
    public $params = [
        User::_userId => "player1",
        Game1::_gameId => "game123",
        UserGameMailbox::_mailId => "456123"
    ];
    public $output = [
        UserGameMailbox::_mail_array => [],
        /* opposite (now) online status */
        User::_status_online => 1
    ];
    public $desc = "get last action array after the incoming last action id (mailbox)";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        User::heart_beat($userId);
        $gameId = $data[Game1::_gameId];
        $last_mailId = $data[UserGameMailbox::_mailId];
        $last_mail_array = UserGameMailbox::get_last_mail_array($userId, $gameId, $last_mailId);
        $this->output[UserGameMailbox::_mail_array] = $last_mail_array;
        if (Game1::is_opposite_online($gameId, $userId))
            $this->output[User::_status_online] = 1;
        else
            $this->output[User::_status_online] = 0;
        return $this->output;
    }
}

$_getLastMailArrayActor = new GetLastMailArrayActor();
addAPI($_getLastMailArrayActor);

