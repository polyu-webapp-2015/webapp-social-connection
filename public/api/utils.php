<?php
/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/16/15
 * Time: 12:00 PM
 */

/**
 * print the object recursively to response (client)
 * @param array|string $o
 */
function print_object($o)
{
    if (empty($o)) {
        echo "empty\n";
    } elseif (is_array($o)) {
        print_r($o);
    } elseif (is_string($o)) {
        echo $o . "\n";
    } else {
        echo "cannot display\n";
    }
}

class utils
{
    const _default_ignore_patterns = array('\s', '_', '\(', '\)');
    const _default_ignore_prefix_suffix_patterns = array('\s');
}

/**
 * @param string $str1
 * @param string $str2
 * @param array [char] $ignore_patterns
 * @param array [char] $ignore_prefix_suffix_patterns
 * @param boolean $case_sensitive
 * @return boolean true if matched, false otherwise
 */
function loss_match($str1, $str2, $ignore_patterns = utils::_default_ignore_patterns, $ignore_prefix_suffix_patterns = utils::_default_ignore_prefix_suffix_patterns, $case_sensitive = false)
{
    $s1 = $str1;
    $s2 = $str2;
    foreach ($ignore_prefix_suffix_patterns as $pattern) {
        $s1 = stripPrefixSuffix($s1, $pattern);
        $s2 = stripPrefixSuffix($s2, $pattern);
    }
    foreach ($ignore_patterns as $pattern) {
        $s1 = preg_replace('/' . $pattern . '/', '', $s1);
        $s2 = preg_replace('/' . $pattern . '/', '', $s2);
    }
    if ($case_sensitive) {
        return $s1 == $s2;
    } else {
        return strcasecmp($s1, $s2) == 0;
    }
}

function stripPrefixSuffix($string, $subString)
{
    return stripSuffix(stripPrefix($string, $subString), $subString);
}

function stripPrefix($string, $subString)
{
    return preg_replace('/^' . $subString . '/', '', $string);
}

function stripSuffix($string, $subString)
{
    return preg_replace('/' . $subString . '$/', '', $string);
}