<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/29/15
 * Time: 11:56 PM
 *
 * @define under user profile, named mailbox
 * @define first layer key : gameId
 * @define second layer key : mailId
 */
class UserGameMailbox
{
    const _path = "mailbox";

    const _mail_array="mail_array";

    const _mailId = "mailId";
    const _source_userId = "source_userId";
    const _msg = "msg";
    const _keep = "keep";
    const _type = "type";
    const _type_action = "action";
    const _type_msg = "msg";
    const _type_chess_move_array = "chess_move_array";
    const _type_game_status = "game_status";
    const _type_current_player = "current_player";
    const _type_surround = "surround";
//    const _type_chess_move = "chess_move";
    const _type_chess_killed = "chess_killed";

    public static function create_new($source_userId, $type, $msg)
    {
        $mail_id = time();
        return [
            self::_mailId => $mail_id,
            self::_source_userId => $source_userId,
            self::_type => $type,
            self::_msg => $msg
        ];
    }

    public static function save_to_root(array &$root, $receiver_userId, $gameId, $mail)
    {
        $path=[];
        put_all_into(User::_path,$path);
        array_push($path, $receiver_userId);
        $path[] = self::_path;
        $path[] = $gameId;
        $dict = DatabaseHelper::get_or_create_path($root, $path);
        $dict[$mail[UserGameMailbox::_mailId]] = $mail;
        DatabaseHelper::update_root_on_path($root,$path,$dict);
    }

    public static function save_to_database($receiver_userId, $gameId, $mail)
    {
        $path = [];
        put_all_into(User::_path, $path);
        $path[] = $receiver_userId;
        $path[] = self::_path;
        $path[] = $gameId;
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, $path);
        $dict[$mail[UserGameMailbox::_mailId]] = $mail;
        DatabaseHelper::save_on_path($root, $path, $dict);
    }

    public static function get_last_mail_array($userId, $gameId, $last_mail_id)
    {
        $root = DatabaseHelper::load();
        $path=[];
        put_all_into(User::_path,$path);
        $path[] = $userId;
        $path[] = self::_path;
        $path[] = $gameId;
        $dict = DatabaseHelper::get_or_create_path($root, $path);
        $last_mail_array = [];
        foreach ($dict as $mailId => $mail) {
            if ($mailId > $last_mail_id)
                $last_mail_array[] = $mail;
        }
        return $last_mail_array;
    }
}