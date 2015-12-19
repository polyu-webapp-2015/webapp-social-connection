<?php
require_once 'utils.php';
/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/19/15
 * Time: 4:32 PM
 */
const _current_path = [
//    "stable|dev"
//    "webapp-social_connection",
    "server",
    "api",
];
const _target_path = [
    "public",
    "upload_files"
];

function get_upload_file_path()
{
    log_object_from_named($_SERVER, "my path");
    $path = str_repeat("../", count(_current_path));
    $path .= implode('/', _target_path);
    return $path;
}

function handle_upload_file()
{
    $file = $_FILES["file"];
    if ($file["error"] > 0) {
        echo "Error: " . $_FILES["file"]["error"] . "<br>";
    } else {

        $directory = get_upload_file_path();
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }

        $hash = md5_file($file["tmp_name"]);
        $ext = end(explode('.', $file["name"]));
        $filename = $ext == false ? $hash : "$hash.$ext";

        move_uploaded_file($file["tmp_name"], "$directory/$filename");

        echo "Uploaded to $directory/$filename";
    }
}

handle_upload_file();