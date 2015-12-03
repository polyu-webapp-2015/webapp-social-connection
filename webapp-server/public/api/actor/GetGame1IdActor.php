<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 * @deprecated
 */
class GetGame1IdActor extends Actor
{

    public $name = "GetGame1Id";
    public $params = array(
//        User::_userId => "player1@gmail.com",
//        User::_password => "noOneKnow"
    );
    public $output = [Game1::_gameId => 123];
    public $desc = "get Game1Id from session";

    public function handle($data)
    {
        if (session_id() == '' || !isset($_SESSION)) {
            /* session is not set */
            throw new Exception("session has not been created");
        } else {
            /* session is set before */
            $this->output[Game1::_gameId] = $_SESSION[Game1::_gameId];
        }
        return $this->output;
    }
}

$_getGame1IdActor = new GetGame1IdActor();
addAPI($_getGame1IdActor);
