# Command
Command is a javascript for creating a simple command window in your browser.

It allows for custom nested commands, responses, running functions and printing strings.
I also handles load if the user or system are loading content over ajax which will halt interaction till loading is complete.

First create you command container.

```html
<div id="command"></div>
```

Next include the det command javascript somewhere before your `</body>`.

```html
<script src="command.js" type="text/javascript"></script>
```

Then just create a new instance of Command with your container.

```javascript
var command = new Command(document.getElementById('command'));
```

You can set the size of the console using `command.setSize(width, height)`. It accept both numbers and string.

```javascript
command.setSize('100%', 300);
```

You can print to the console using `command.print(string)`.

```javascript
command.print('hello world');
```

You can toggle the history using your up and down arrow keys or manually using `command.backHistory()` and `command.forwardHistory()`.

You can set the full list of accepted commands by creating an object. Each key is a command. A key value can be a new object of keys, a string response or a function. To import the new set of commands simply use `command.import(object)`. Add a deafult if you would like a default response if the command is not found.

```javascript
var newCommands = {
	help: {
		me: "i can help you",
		you: "you can't help me",
		default: "type 'help me' or 'help you'"
	},
	default: "type 'help'"
};

command.import(newCommands);
```

If you would like to add a command to your existing set of commands you can use the `command.add(path, response)`. The path is a string where every layer is period separated. The response can be a string or a function. If the path already exists it will be overwritten.

```javascript
command.add('help.everybody', 'nobody can help everybody');
```

To disable and enable the console use `command.disable()` and `command.enable()`. This will remove the abillity to type and hide the type indicator. I can be used to prevent typing while displaying sequences of text or for ajax loading.