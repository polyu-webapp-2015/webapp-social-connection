<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class MoveChessToGridArrayActor extends Actor
{

    public $name = "MoveChessToGridArray";
    public $params = array(
        User::_userId => "player1",
        Game1::_opposite_userId => "player2",
        Game1::_gameId => "123",
        Game1::_chess_array => [
            Game1::_chessId => "12",
            Game1::_gridId => "13"
        ]
    );
    public $output = [
        ResultCode::_ => ResultCode::_success,
        /**@deprecated die chessId list */
        Game1::_chess_array => [
            /*add killer?*/
            Game1::_chessId => -1
        ],
        UserGameMailbox::_mailId => 123
    ];
    public $desc = "moveChessToGrid (array of movement), save chess new position, no moving rule checking";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        User::heart_beat($userId);
        $opposite_userId = $data[Game1::_opposite_userId];
        $gameId = $data[Game1::_gameId];
//        $chessId = $data[Game1::_chessId];
//        $gridId = $data[Game1::_gridId];
        $move_chess_array = $data[Game1::_chess_array];
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, Game1::_path);
        if (array_key_exists($gameId, $dict)) {
            $game = &$dict[$gameId];
            if (!array_key_exists(Game1::_chess_array, $game))
                $game[Game1::_chess_array] = [];
            $chess_array =& $game[Game1::_chess_array];
            $move_msg = [];
            $killed_chess = [];
//            log_object("=========  data (param) ================");
//            log_object($data);
//            log_object("------------------------------------");
//            log_object("=========  move chess array ================");
//            log_object($move_chess_array);
//            log_object("------------------------------------");
            foreach ($move_chess_array as $move_chess) {
                $chessId = $move_chess[Game1::_chessId];
                $gridId = $move_chess[Game1::_gridId];
                $die_chessId = array_search($gridId, $chess_array);
                if ($die_chessId != false) {
                    /* kill chess */
                    $chess_array[$die_chessId] = -1;
                    $killed_chess[] = [Game1::_chessId => $die_chessId];
//                    $this->output[Game1::_chessId] = $die_chessId;
//                $kill_msg = [Game1::_chessId => $die_chessId];
//                $kill_mail = UserGameMailbox::create_new($userId, UserGameMailbox::_type_chess_killed, $kill_msg);
//                $kill_msg[UserGameMailbox::_mailId] = $kill_msg[UserGameMailbox::_mailId] . '_0';
//                UserGameMailbox::save_to_root($root, $opposite_userId, $gameId, $kill_mail);
                    log_object_from_named("killed chess $die_chessId", $this->name);
                }
                /* move chess */
                $chess_array[$chessId] = $gridId;
                $move_msg [] = [
                    Game1::_chessId => $chessId,
                    Game1::_gridId => $gridId
                ];
            }
            log_object("=========  move msg ================");
            log_object($move_msg);
            log_object("------------------------------------");
            $move_mail = UserGameMailbox::create_new($userId, UserGameMailbox::_type_chess_move_array, $move_msg);
            $this->output[UserGameMailbox::_mailId] = $move_mail[UserGameMailbox::_mailId];
//            $move_msg[UserGameMailbox::_mailId] = $move_msg[UserGameMailbox::_mailId] . '_1';
            UserGameMailbox::save_to_root($root, $userId, $gameId, $move_mail);
            UserGameMailbox::save_to_root($root, $opposite_userId, $gameId, $move_mail);
            DatabaseHelper::save_on_path($root, Game1::_path, $dict);
            $this->output[Game1::_chess_array] = $killed_chess;
            $this->output[ResultCode::_] = ResultCode::_success;
            log_object_from_named("move success", $this->name);
        } else {
            $this->output[ResultCode::_] = ResultCode::_game_not_exist;
            log_object_from_named("game not exist", $this->name);
        }
        return $this->output;
    }
}

$_moveChessToGridArrayActor = new MoveChessToGridArrayActor();
addAPI($_moveChessToGridArrayActor);
