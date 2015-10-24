<?php
// $usernameArr=array("user1","user3","user5");
$usernameArr[]="user1";
$usernameArr[]="user3";
$usernameArr[]="user5";
$q=$_REQUEST["name"];
if($q != ""){
  $len = strlen($q);
  $ok=true;
  foreach ($usernameArr as $name) {
    if($name==$q)
      $ok=false;
  }
  $data = $ok;
  header('Content-type: application/json');
  echo json_encode($data);
}
?>
