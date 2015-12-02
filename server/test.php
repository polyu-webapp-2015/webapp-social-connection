<?php
require('models.php');

User::createTable();
$user = new User(array('username' => 'argon'));
$user->save();
?>