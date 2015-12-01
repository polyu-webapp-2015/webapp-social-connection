<?php
/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/16/15
 * Time: 12:00 PM
 */
function print_object($arr)
{
    if (empty($arr)) {
        echo "empty\n";
    } elseif (is_array($arr)) {
        print_r($arr);
    } elseif (is_string($arr)) {
        echo $arr . "\n";
    } else {
        echo "cannot display\n";
    }
}

