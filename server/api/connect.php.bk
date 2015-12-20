<?php

$username = '14109328d';
$password = 'Zy4247668'; 			// confidential info
$db_con = mysql_connect('mysql.comp.polyu.edu.hk', $username, $password);
if (!$db_con) {
	die('Could not connect: '.mysql_error());
}
$sql = "use $username;";
$result = mysql_query($sql, $db_con);
if (!$result) echo 'Connection Failed: '.$err_msg.mysql_error($db_con);

?>