<?php
require_once 'utils.php';
/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/19/15
 * Time: 4:32 PM
 */
$file = $_FILES["file"];
if ($file["error"] > 0) {
    echo "Error: " . $_FILES["file"]["error"] . "<br>";
} else {
    echo "Uploading...";
//    log_object_from_named($_FILES,"files");
//    log_object_from_named($_POST,"POST");
//    log_object_from_named($_REQUEST,"REQUEST");

//    log_object_from_named($_FILES["file"]["name"],"name");
//    log_object_from_named($_FILES["file"]["type"],"type");
//    log_object_from_named($_FILES["file"]["size"],"size");

    $path=".";
    move_uploaded_file($file["tmp_name"],"$path/".$file["name"]);

    echo "Uploaded";
}