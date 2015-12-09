<?php
/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/18/15
 * Time: 12:11 PM
 */
//log_object("loading database package -- 1");
include_once 'table2class/output/package.php';
//log_object("loading database package -- 2");
include_once 'table_field/package.php';
//log_object("loading database package -- 3");
/* using full path under api to avoid ambiguous between enum under database and enum under api */
include_once 'database/enum/package.php';
//log_object("loading database package -- 4");
require_once 'DatabaseHelper.php';
//log_object("loading database package -- 5");
require_once 'DatabaseOperator.php';
//log_object("loading database package -- 6");
