<?php
include_once 'API.php';
include_once 'EchoAPI.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET' :
        $API->printAllAPI();
        break;
    case 'POST':
        echo "begin";
        foreach ($_POST as $key => $value) {
            echo "\nPOST parameter $key => $value ";
        }
        echo "\n '$_POST' \n ";
        echo "\n '$_POST[0]' \n ";
        echo "\nend";
        break;
    default:
        header('HTTP/1.0 400 Bad Request', true, 400);
        break;
}
?>