<?php

class GetGameInfoActor extends Actor
{
    public $name = "GetGameInfo";
    public $params = [
        User::_userId => "player1",
        Game1::_gameId => "game123"
    ];
    public $output = [
        Game1::_player_blue => "player1",
        Game1::_player_red => "player2",
        Game1::_status_playing => 1,
        Game1::_chess_array=>[]
    ];
    public $desc = "get basic game info when init (from game1.html)";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        User::heart_beat($userId);
        $gameId = $data[Game1::_gameId];
        $game = Game1::load_from_database($gameId);
        $this->output[Game1::_player_blue] = $game[Game1::_player_blue];
        $this->output[Game1::_player_red] = $game[Game1::_player_red];
        $this->output[Game1::_status_playing] = $game[Game1::_status_playing];
        $this->output[Game1::_chess_array] = $game[Game1::_chess_array];
        log_object_from_named("success",$this->name);
        return $this->output;
    }
}

$_getGameInfoActor = new GetGameInfoActor();
addAPI($_getGameInfoActor);
