<?php
$file=$_GET["art"];
$extension=pathinfo($file,PATHINFO_EXTENSION);
if($extension=="png") {
	$im = imagecreatefrompng($file);
	header('Content-Type: image/png');
	imagepng($im);
} else {
	$im = imagecreatefromjpeg($file);
	header('Content-Type: image/jpeg');
	imagejpeg($im);
}
imagedestroy($im);
?>
