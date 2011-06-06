<?php

	header('Content-type: text/html;charset=utf-8');
	header('Content-Encoding: gzip');
	if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])):
		$modified = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']);
		if(($modified > 0) && ($modified >= getlastmod())):
			header('HTTP/1.0 304 Not Modified');
			header('Expires:');
			header('Cache-Control: public, max-age=86400');
			exit;
		endif;
	endif;
	header('Cache-Control: public, max-age=86400');
	header('Pragma: ');
	header('Last-Modified: '.gmdate('D, d M Y H:i:s',strtotime('- 5 second')).' GMT');
	header('Expires: '.gmdate('D, d M Y H:i:s',strtotime('+ 1 day')).' GMT');
	ob_start();
	ob_start('ob_gzhandler');
	echo '<!DOCTYPE html>',
	'<html lang="en">',
	'<head>',
	'<title>Cove by PhyVG.</title>',
	'<meta http-equiv="content-type" content="text/html;charset=utf-8">',
	'<meta name="description" content="Get retro and quest through the world of Cove. Developed in HTML5\JS.">',
	'<meta name="keywords" content="rpg, role playing game, fantasy, javascript, html5, canvas">',
	'<meta name="author" content="John Mullanaphy">',
	'<meta name="contact" content="cove@phy.vg">',
	'<meta name="robots" content="noodp">',
	'<link href="/css/global/core.css" rel="stylesheet" type="text/css" />',
	'</head>',
	'<body>',
	'<table align="center" border="0" cellpadding="0" cellspacing="0">',
	'<tr><td align="center"><canvas id="canvas" height="448" width="512">',
	'<h1>ERROR</h1>',
	'<p>Sorry yet Cove doesn\'t support your browser.</p>',
	'<p>Please try downloading a current browser such as: <a href="http://www.opera.com/" title="Opera">Opera</a>, <a href="http://www.google.com/chrome" title="Google Chrome">Google Chrome</a>, <a href="http://www.apple.com/safari" title="Apple Safari">Apple Safari</a>, and\or <a href="http://www.firefox.com/" title="Firefox">Firefox</a>.</p>',
	'</canvas></td></tr>',
	'</table>',
	'<script src="/js/global/json2.js" type="text/javascript"></script>',
	'<script src="/js/global/phy.0.6.js" type="text/javascript"></script>',
	'<script src="/js/engine/core.js" type="text/javascript"></script>',
	'</body>',
	'</html>';
	ob_end_flush();
	header('Content-Length: '.ob_get_length());
	ob_end_flush();