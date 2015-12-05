<?php
//include_once '../config.php';

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/16/15
 * Time: 1:28 PM
 */
class DatabaseHelper
{
    const _filePath = "db.json";

    public static function save($root)
    {
//        log_object("database : save root");
//        log_object($root);
        file_put_contents(self::_filePath, json_encode($root));
    }

    public static function load()
    {
        $root = file_get_contents(self::_filePath);
        if ($root == false) {
            error_log("database : root not exist, creating empty node");
            $root = array("default_element");
        } else {
            $root = json_decode($root, true);
        }
//        log_object("database : load root");
//        log_object($root);
        return $root;
    }

    public static function get_or_create_path(&$root, array $path_array)
    {
        $current = &$root;
//        log_object("patharray");
//        log_object($path_array);
        foreach ($path_array as $path) {
//            log_object_from_named("path==========================================","databasehelper");
//            log_object_from_named("$path","databasehelper");
            if (!array_key_exists($path, $current)) {
                error_log("database get_or_create_path : $path does not exist, creating empty node");
                $newNode = array("default_element");
                $current[$path] = $newNode;
            }
            if (is_array($current)) {
                $current = &$current[$path];
            } else {
                $current =& $current->$path;
            }
        }
        return $current;
    }

    public static function save_on_path(&$root, array $path_array, $node)
    {
        $current = &$root;
        foreach ($path_array as $path) {
            if (!array_key_exists($path, $current)) {
                error_log("database save_on_path : $path does not exist, creating empty node");
                $newNode = array("default_element");
                $current[$path] = $newNode;
            }
            if (is_array($current)) {
                /* the struct is array */
                $current = &$current[$path];
            } else {
                /* the struct is object */
                $current = &$current->$path;
            }
        }
        put_all_into($node, $current);
        self::save($root);
    }
    public static function update_root_on_path(&$root, array $path_array, $node)
    {
        $current = &$root;
        foreach ($path_array as $path) {
            if (!array_key_exists($path, $current)) {
                error_log("database save_on_path : $path does not exist, creating empty node");
                $newNode = array("default_element");
                $current[$path] = $newNode;
            }
            if (is_array($current)) {
                /* the struct is array */
                $current = &$current[$path];
            } else {
                /* the struct is object */
                $current = &$current->$path;
            }
        }
        put_all_into($node, $current);
    }
}
