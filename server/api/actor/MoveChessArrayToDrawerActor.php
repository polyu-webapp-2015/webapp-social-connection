<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class MoveChessArrayToDrawerActor extends Actor
{

    public $name = "MoveChessArrayToDrawer";
    public $params = array(
        User::_userId => "player1",
        Game1::_opposite_userId => "player2",
        Game1::_gameId => "123",
        Game1::_chessId_array => [],
    );
    public $output = [
        ResultCode::_ => ResultCode::_success
    ];
    public $desc = "reset chess to drawer, no rule checking";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        $opposite_userId = $data[Game1::_opposite_userId];
        User::heart_beat($userId);
        $gameId = $data[Game1::_gameId];
        $chessId_array = $data[Game1::_chessId_array];
        $mail = UserGameMailbox::create_new($userId, UserGameMailbox::_type_chess_move_array, []);
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, Game1::_path);
        if (array_key_exists($gameId, $dict)) {
            $game = &$dict[$gameId];
            if (!array_key_exists(Game1::_chess_array, $game))
                $game[Game1::_chess_array] = [];
            $chess_array =& $game[Game1::_chess_array];
            foreach ($chessId_array as $chessId) {
                $chess_array[$chessId] = -1;
                $mail[UserGameMailbox::_msg][] = [
                    Game1::_chessId => $chessId,
                    Game1::_gridId => -1
                ];
            }
            UserGameMailbox::save_to_root($root, $opposite_userId, $gameId, $mail);
            UserGameMailbox::save_to_root($root, $userId, $gameId, $mail);
            DatabaseHelper::save_on_path($root, Game1::_path, $dict);
            log_object_from_named("success", $this->name);
        } else {
            $this->output[ResultCode::_] = ResultCode::_game_not_exist;
            log_object_from_named("gameId $gameId not exist", $this->name);
        }
        return $this->output;
    }
}

$_moveChessArrayToDrawerActor = new MoveChessArrayToDrawerActor();
addAPI($_moveChessArrayToDrawerActor);
