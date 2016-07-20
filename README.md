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
command.print('hello user');
```

You can toggle the history user your up and down arrow keys or manually using `command.backHistory()` and `command.forwardHistory()`.