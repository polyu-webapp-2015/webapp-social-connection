<?php

function sql_exec($sql, $db_con, $err_msg = "\nInternal error: ") {
	// shortcut
	$result = mysql_query($sql, $db_con);
	if (!$result) {
		echo $err_msg.mysql_error($db_con);
		echo "\nYour sql: $sql\n";
	}
	return $result;
}

class Database {

	private static $db_instance = null;

	private $username;
	private $password;
	private $url;

	protected function __construct($username, $password, $url) {
		$this->username = $username;
		$this->password = $password;
		$this->url = $url;
	}  

	public static function init($username, $password, $url) {
		self::$db_instance = new Database($username, $password, $url);
	}

	public static function getInstance() {
		return self::$db_instance;
	}

	public function connect() {
		if ($db_instance === null) {
			$db_con = mysql_connect($this->url, $this->username, $this->password);
			if (!$db_con) {
				die('Could not connect: '.mysql_error());
			}
			$sql = "use $this->username;";
			$result = mysql_query($sql, $db_con);
			if (!$result) echo 'Connection Failed: '.$err_msg.mysql_error($db_con);
			return $db_con;
		}
	}
}
Database::init('14109328d', '', 'mysql.comp.polyu.edu.hk');

abstract class BaseModel {

	private static $fields; // ["username", "password"]
	private static $fields_meta;		// ["username" => "CHAR"]
	private static $primary_key;

	protected static $_db;

	public static function init() {
		self::$_db = Database::getInstance();
	}

	public function __construct($kwargs) {

		if (!is_array($kwargs)) throw new Exception('parameter 1 $kwargs excepted to be an array, '.gettype($kwargs).' passed in.');

		foreach ($kwargs as $key => $val) {
			// set each field 
			// $key is the name of a variable
			$this->$key = $val;
		}
	}

	public function setAttribute($var_name, $value) {
		$this->$var_name = $value;
	}

	public function save() {
		$db_con = self::$_db->connect();
		$cls = get_called_class();

		$vals = array();
		$updates = array();

		for ($i = 0; $i < sizeof($cls::$fields); ++$i) {
			$field = $cls::$fields[$i];
			$val = $this->$field;
			array_push($vals, $val);
			array_push($updates, "$field='$val'");
		}

		$cols_str = implode(', ', $cls::$fields);
		$vals_str = implode(', ', $vals);
		$updates_str = implode(', ', $updates);
		
		$sql = "INSERT INTO $cls ($cols_str) VALUES ('$vals_str') 
				ON DUPLICATE KEY UPDATE $updates_str";
		sql_exec($sql, $db_con); 
	}

	public static function create($kwargs, $create=true) {
		// $kwargs = array("field_name" => "field_value", ...);
		$db_con = self::$_db->connect();
		if (!is_array($kwargs)) throw new Exception('parameter 1 $kwargs excepted to be an array, '.gettype($kwargs).' passed in.');
		$cls = get_called_class();
		$instance = new $cls($kwargs); 
		if ($create) $instance.save();
	}

	public static function createTable() {
		$db_con = self::$_db->connect();
		$cls = get_called_class();
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
BaseModel::init();

class User extends BaseModel {
	public $username;

	protected static $fields = array('username');
	protected static $fields_meta = array('username' => 'CHAR(127) NOT NULL');
	protected static $primary_key = array('username');

	// fields
}
?>