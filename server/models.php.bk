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
				ie('Could not connect: '.mysql_error());
			}
			$sql = "use $this->username;";
			$result = mysql_query($sql, $db_con);
			if (!$result) echo 'Connection Failed: '.$err_msg.mysql_error($db_con);
			return $db_con;
		}
	}
}
Database::init('14109328d', 'Zy4247668', 'mysql.comp.polyu.edu.hk');

abstract class BaseModel {

	private static $fields_meta;		// ["username" => "CHAR"]
	private static $primary_key;

	protected static $_db;

	public static function init() {
		self::$_db = Database::getInstance();
	}

	public function __construct(array $kwargs) {

		foreach ($kwargs as $key => $val) {
			// set each field 
			// $key is the name of a variable
			$this->$key = $val;	// this is brilliant
			// bug may emerge here.
			// if fields number don't match, the remaining fields will be auto-filled with null
		}
	}

	public function setAttribute($var_name, $value) {
		$this->$var_name = $value;
	}

	public function save() {
		$db_con = self::$_db->connect();
		$cls = get_called_class();

		$fields = array();
		$vals = array();
		$updates = array();

		foreach ($cls::$fields_meta as $field => $meta) {
			if ($field === '_id') continue; // surrogate key, ignored, set by system. Checck implicit bugs
			$val = $this->$field;
			if ($val === null) continue;
			$raw_type = explode(' ', $meta);
			$raw_type = explode('(', $raw_type[0]);
			$type = $raw_type[0];
			echo $type;
			array_push($fields, $field);
			if (strtoupper($type) === 'INT') {
				array_push($vals, $val);
				array_push($updates, "$field=$val");
			}
			else {
				array_push($vals, "'$val'");
				array_push($updates, "$field='$val'");
			}
			
			// bug here might be time type
		}

		$cols_str = implode(', ', $fields);
		$vals_str = implode(', ', $vals);
		$updates_str = implode(', ', $updates);
		
		if ($updates_str === '') throw new Exception("Trying to save an instance of class <$cls>, with all of whose fields are null");// all vals are null
		$sql = "INSERT INTO $cls ($cols_str) VALUES ($vals_str) 
				ON DUPLICATE KEY UPDATE $updates_str";
		sql_exec($sql, $db_con); 
	}

	public static function create(array $kwargs, $create=true) {
		// $kwargs = array("field_name" => "field_value", ...);
		$db_con = self::$_db->connect();
		$cls = get_called_class();
		$instance = new $cls($kwargs); 
		if ($create) $instance->save();
		return $instance;
	}

	public static function createTable() {
		$db_con = self::$_db->connect();
		$cls = get_called_class();
		$pk = implode(', ', $cls::$primary_key);
		$sql = "CREATE TABLE IF NOT EXISTS $cls (";
		foreach ($cls::$fields_meta as $field => $meta) {
			// username CHAR(10) NOT NULL,
			$sql .= "$field $meta, \n";
		}
		$sql .= "PRIMARY KEY ($pk)";
		if ($cls::$foreign_key !== null) {
			foreach ($cls::$foreign_key as $key => $ref) {
				$sql .= ",\nFOREIGN KEY ($key) REFERENCES $ref";
			}
		}
		// foreign key here

		$sql .= ")";

		sql_exec($sql, $db_con);
	}

}
BaseModel::init();

class User extends BaseModel {

	// convention: _id Surrogate Key
	protected static $fields_meta = array(
		'_id' => 'INT NOT NULL AUTO_INCREMENT', 
		'email' => 'CHAR(127) NOT NULL UNIQUE',
		'password' => 'CHAR(31)',
		'gender' => 'CHAR(1)',
		'first_name' => 'CHAR(63)',
		'last_name' => 'CHAR(63)',
		'affiliation' => 'CHAR(255)',
		'title' => 'CHAR(7)',
		'city' => 'CHAR(63)',
		'country' => 'CHAR(63)',
	);
	protected static $primary_key = array('_id');
	protected static $foreign_key = array();
	// fields
}

class Message extends BaseModel {

	protected static $fields_meta = array(
		'_id' => 'INT NOT NULL AUTO_INCREMENT',
		'from_id' => 'INT NOT NULL',
		'to_id' => 'INT NOT NULL',
		'time' => 'DATETIME NOT NULL',
	);
	protected static $primary_key = array('_id');
	protected static $foreign_key = array('from_id' => 'User(_id)', 'to_id' => 'User(_id)');
}

class Friendship extends BaseModel{
	protected static $fields_meta = array(
		'_id' => 'INT NOT NULL AUTO_INCREMENT',
		'host_id' => 'INT NOT NULL',
		'guest_id' => 'INT NOT NULL'
	);
	protected static $primary_key = array('_id');
	protected static $foreign_key = array('host_id' => 'User(_id)', 'guest_id' => 'User(_id)');
}

class Exhibition extends BaseModel{
	protected static $fields_meta = array(
		'_id' => 'INT NOT NULL AUTO_INCREMENT',
		'subject' => 'CHAR(255) NOT NULL',
		'content' => 'TEXT NOT NULL',
		'time' => 'DATETIME',
		'venue' => 'CHAR(255)',
		'organization' => 'CHAR(255)'
	); 
	protected static $primary_key = array('_id');
	protected static $foreign_key = array();
}

class ExhibitionAttendance extends BaseModel {
	protected static $fields_meta = array(
		'_id' => 'INT NOT NULL AUTO_INCREMENT',
		'attendee_id' => 'INT NOT NULL',
		'session_id' => 'INT NOT NULL',
	); 
	protected static $primary_key = array('_id');
	protected static $foreign_key = array('attendee_id' => 'User(_id)', 'session_id' => 'Exhibition(_id)');
}
?>