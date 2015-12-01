<?php
require('connect.php');
require('models.php');

User::createTable($db_con);
?>