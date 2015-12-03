<?php


class StartGameActor extends Actor
{
    public $name = "StartGame";
    public $params = [
        Game1::_gameId => 123,
        User::_userId => "player1"
    ];
    public $output = ResultCode::_success;
    public $desc = "set game flag to avoid re-init the game";


    public function handle($data)
    {
        $userId = $data[User::_userId];
        User::heart_beat($userId);
        $gameId = $data[Game1::_gameId];
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, Game1::_path);
        if (array_key_exists($gameId, $dict)) {
            $dict[$gameId][Game1::_status_playing] = 1;
            DatabaseHelper::save_on_path($root, Game1::_path, $dict);
        } else {
            $this->output = ResultCode::_game_not_exist;
        }
        return $this->output;
    }
}

$_startGameActor = new StartGameActor();
addAPI($_startGameActor);
