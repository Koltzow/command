<!doctype html>

<html lang="no">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="google" content="notranslate"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>CommandJS</title>

	<!-- STYLESHEETS -->
	<link rel="icon" href="favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="css/style.css" type="text/css"/>
		
</head>

<body>

	<div id="command"></div>

	<!-- JAVASCRIPT -->
	<script src="../src/command.js" type="text/javascript"></script>
	
	<script type="text/javascript">
	
		var command = new Command(document.getElementById('command'));
		command.print('hello world');
		
		var newCommands = {
			help: {
				me: "i can help you",
				you: "you can't help me",
				default: "type 'help me' or 'help you'"
			},
			default: "type 'help'"
		};
		
		command.import(newCommands);
		
		command.add('help.everybody', 'nobody can help everybody');
	
	</script>

</body>

</html>