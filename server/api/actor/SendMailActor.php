<?php

class SendMailActor extends Actor
{
    public $name = "SendMail";
    public $params = [
        User::_userId => "player1",
        Game1::_opposite_userId => "player2",
        Game1::_gameId => "game123",
        UserGameMailbox::_type => UserGameMailbox::_type_msg,
        UserGameMailbox::_msg => "I am going to win",
        UserGameMailbox::_keep => 0
    ];
    public $output = [
        ResultCodeEnum::_ => ResultCodeEnum::_Success,
        UserGameMailbox::_mailId => "123"
    ];
    public $desc = "send mail from user to another user";

    public function handle($data)
    {
        $sender_userId = $data[User::_userId];
        User::heart_beat($sender_userId);
        $receiver_userId = $data[Game1::_opposite_userId];
        $gameId = $data[Game1::_gameId];
        $mail_type = $data[UserGameMailbox::_type];
        $msg = $data[UserGameMailbox::_msg];
        $mail = UserGameMailbox::create_new($receiver_userId, $mail_type, $msg);
        $root = DatabaseHelper::load();
        UserGameMailbox::save_to_root($root, $receiver_userId, $gameId, $mail);
        if ($data[UserGameMailbox::_keep] == 1)
            UserGameMailbox::save_to_root($root, $sender_userId, $gameId, $mail);
        DatabaseHelper::save($root);
        $this->output[UserGameMailbox::_mailId] = $mail[UserGameMailbox::_mailId];
        $this->output[ResultCodeEnum::_] = ResultCodeEnum::_Success;
        return $this->output;
    }
}

$_sendMailActor = new SendMailActor();
addAPI($_sendMailActor);

