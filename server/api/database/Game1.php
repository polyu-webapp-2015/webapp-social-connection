<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/27/15
 * Time: 11:55 PM
 */
class Game1
{
    const _path = ["game1s"];
    const _creator_userId = "creator_userId";
    const _guest_userId = "guest_userId";

    const _opposite_userId = "opposite_userId";

    const _gameId = "gameId";
    const _player_red = "player_red";
    const _player_blue = "player_blue";
    /**
     * @define 0 : init-ing the chess position
     * @define 1 : started playing
     */
    const _status_playing = "status_playing";

    const _winner = "winner";
    const _is_draw = "is_draw";

    const _chessId = "chessId";
    const _chessId_array = "chessId_array";
    const _gridId = "gridId";

    /**
     * @define key : chessId
     * @define value : gridId | -1 for drawer
     * if key not exist, assume in drawer
     */
    const _chess_array = "chess_array";

//    const _grid_array = "grid_array";

    public static function create($creator_userId, $guest_userId)
    {
        $gameId = strval(time()) . '_' . $creator_userId . '_' . $guest_userId;
        return [
            self::_gameId => $gameId,
            self::_creator_userId => $creator_userId,
            self::_guest_userId => $guest_userId,
            self::_status_playing => 0,
            self::_is_draw => 0,
            self::_chess_array => [],
//            self::_grid_array => []
        ];
    }

    public static function is_opposite_online($gameId, $userId)
    {
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, Game1::_path);
        if (array_key_exists($gameId, $dict)) {
            $game = $dict[$gameId];
            if ($game[Game1::_creator_userId] == $userId)
                $opposite_userId = $game[Game1::_guest_userId];
            else
                $opposite_userId = $game[Game1::_creator_userId];
            return User::is_userId_online($opposite_userId);
        } else {
            /*game not found*/
            return false;
        }
    }

    /**
     * @param $userId
     * @param $opposite_userId
     * @return string|bool : gameId if matched, false if not matched
     */
    public static function is_matched($userId, $opposite_userId)
    {
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, Game1::_path);
        foreach ($dict as $game) {
            /* skip default element */
            if (!is_array($game))
                continue;
            if ((
                    /* users match */
                    ($game[Game1::_creator_userId] == $userId && $game[Game1::_guest_userId] == $opposite_userId)
                    ||
                    ($game[Game1::_creator_userId] == $opposite_userId && $game[Game1::_guest_userId] == $userId)
                ) && (
                    /* game not ended */
                    $game[Game1::_is_draw] == 0 && !array_key_exists(Game1::_winner, $game)
                )
            )
                return $game[Game1::_gameId];
        }
        return false;
    }

    /**
     * @param $gameId : string
     * @return array|bool : matched game if found, false if not found
     */
    public static function load_from_database($gameId)
    {
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, Game1::_path);
        if (array_key_exists($gameId, $dict))
            return $dict[$gameId];
        else
            return false;
    }
}