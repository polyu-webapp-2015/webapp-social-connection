<?php
include_once 'debug.php';
include_once 'API.php';
include_once 'EchoAPI.php';
include_once 'IsEmailOrPhoneNumUniqueAPI.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET' :
        $API->printAllAPI();
        echo('<pre>');
        readfile('readme.md');
        echo('</pre>');
        break;
    case 'POST':
        try {
            $action = $_POST['action'];
            $data = $_POST['data'];
            $API->route($action, $data);
        } catch (Exception $e) {
//            header('HTTP/1.0 400 Bad Request', true, 400);
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            echo "\nError!\n";
            foreach ($_POST as $key => $value) {
                echo "\nPOST parameter $key => $value ";
            }
            echo "\n\n" . $e;
        }
        break;
    default:
        header('HTTP/1.0 400 Bad Request', true, 400);
        break;
}
?>