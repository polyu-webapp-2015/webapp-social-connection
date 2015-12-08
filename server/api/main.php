<?php
require_once 'package.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET' :
//        log_object($_GET);
//        log_object($_SERVER);
        $url = $_SERVER["HTTP_REFERER"];
        if ((strpos($url, "db") + 2) == strlen($url)) {
            DatabaseHelper::generate_all_table_stub();
            die("<br><a href='main.php'>Back to API page</a>");
        } else {
            $_API->printAllAPI();
            echo '<pre>';
            readfile('readme.md');
            echo '</pre>';
            echo '<hr>';
            readfile('links.html');
        }
        break;
    case 'POST':
        try {
            $action = $_POST['action'];
            $data = $_POST['data'];
//            print_object($_POST);
//            print_object($action);
//            print_object($data);
            if (!is_array($data))
                $data = json_decode($data, true);
            $_API->route($action, $data);
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