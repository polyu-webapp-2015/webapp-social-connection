<?php

abstract class BaseModel {

	private $fields; // ["username", "password"]
	private $fields_meta;		// ["username" => "CHAR"]
	private static $primary_key;

	public function setAttribute($var_name, $value) {
		$this->$var_name = $value;
	}

	/*
	abstract public function save();
	abstract public function set();
	abstract public function filter();
	abstract public function create();
	*/

	public static function createTable($db_con) {
		$cls = get_called_class();
		echo $cls::$primary_key;
		$pk = implode(', ', $cls::$primary_key);
		$sql = "CREATE TABLE IF NOT EXISTS $cls (";
		for ($i = 0; $i < sizeof($cls::$fields); ++$i) {
			// username CHAR(10) NOT NULL,
			$field_name = $cls::$fields[$i];
			$field_meta = $cls::$fields_meta[$field_name];
			$sql .= "$field_name $field_meta, \n";
		}
		$sql .= "PRIMARY KEY ($pk)";
		// foreign key here

		$sql .= ")";

		sql_exec($sql, $db_con);
	}
}

class User extends BaseModel {

	protected static $fields = array('username');
	protected static $fields_meta = array('username' => 'CHAR(127) NOT NULL');
	protected static $primary_key = array('username');

	// fields
	public $username;

	public function __construct($username) {
		$this->username = $username;
	}
}

?>