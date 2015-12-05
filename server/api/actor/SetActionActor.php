<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 * @deprecated
 */
class SetActionActor extends Actor
{
    const _result = "ok";
    const _path = array("users");
    const _gameId = "gameId";
    const _playerId = "playerId";
    const _chessId = "chessId";
    const _gridId = "gridId";

    public $name = "SetAction";
    public $params = array(
        self::_gameId => "1",
        self::_playerId => "Player1",
        self::_chessId => "13",
        self::_gridId => "14"
    );
    public $output = array(self::_result => 1);
    public $desc = "set last action on server";

    public function handle($data)
    {
        $db = new DatabaseHelper();
        return $this->output;
    }
}

$_setActionActor = new SetActionActor();
addAPI($_setActionActor);
