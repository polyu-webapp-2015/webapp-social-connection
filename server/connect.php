<?php

function sql_exec($sql, $db_con, $err_msg = 'Internal error: ') {
	$result = mysql_query($sql, $db_con);
	if (!$result) {
		echo $err_msg.mysql_error($db_con);
		echo "\nYour sql: $sql";
	}
	return $result;
}

$username = '14109328d';
$password = ''; 			// confidential info
$db_con = mysql_connect('mysql.comp.polyu.edu.hk', $username, $password);
if (!$db_con) {
	die('Could not connect: '.mysql_error());
}
$sql = "use $username;";
sql_exec($sql, $db_con);

?>