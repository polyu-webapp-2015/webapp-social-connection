<?php
require('models.php');

User::createTable();
Message::createTable();
Friendship::createTable();
Exhibition::createTable();
ExhibitionAttendance::createTable();
$user = new User(array('email' => 'hehe@haha.hk'));
$user->save();
?>