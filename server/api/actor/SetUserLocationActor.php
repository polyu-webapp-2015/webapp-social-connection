<?php


class SetUserLocationActor extends Actor
{
    public $name = "SetUserLocation";
    public $params = [
        User::_userId => "player1",
        User::_location => "Hong Kong PolyU P Core"
    ];
    public $output = ResultCodeEnum::_Success;
    public $desc = "Set the user location (replace original location)";

    public function handle($data)
    {
        $userId = $data[User::_userId];
        $location = $data[User::_location];
        $root = DatabaseHelper::load();
        $dict = DatabaseHelper::get_or_create_path($root, User::_path);
        if (array_key_exists($userId, $dict)) {
            $dict[$userId][User::_location] = $location;
            DatabaseHelper::save_on_path($root, User::_path, $dict);
        } else {
            $this->output = ResultCodeEnum::_user_not_exist;
        }
        return $this->output;
    }
}
addAPI(new SetUserLocationActor());


