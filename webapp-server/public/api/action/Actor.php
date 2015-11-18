<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 3:19 PM
 */
include_once '../utils.php';

class Actor
{
    public $name;
    public $params;
    public $output;
    public $desc;

    public function printAPI()
    {
        echo "<pre>";
        echo "name : $this->name\n";
        echo "params : ";
        print_object($this->params);
        echo "outputs : ";
        print_object($this->output);
        echo "desc : $this->desc";
        echo "</pre>";
    }

    public function handle($data)
    {
        throw new Exception("API $this->name not implemented");
    }
}


