<?php
//inclog
$ipvera=$_GET["ipvera"];
$isRetina=$_GET["isRetina"];
$fichierjson="../conf";

$fichierjson=$fichierjson.".json";

$config=array();

$config[]= array (
	'ipvera' => $ipvera,
	'isRetina' => $isRetina
	);
$config_encode='{"config":'.json_encode($config).'}';
file_put_contents($fichierjson, $config_encode);
echo 'OK';
?>