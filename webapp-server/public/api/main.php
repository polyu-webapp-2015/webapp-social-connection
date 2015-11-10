<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
echo "begin";
foreach ($_POST as $key => $value) {
    echo "\nPOST parameter $key => $value ";
}
echo "\n '$_POST' \n ";
echo "\n '$_POST[0]' \n ";
echo "\nend";
exit
?>