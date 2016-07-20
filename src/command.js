function Command(container) {

	if(container === undefined || !container || typeof container !== 'object' || container.nodeType !== 1){
		console.log('Missing container');
		return false;
	}
	
	this.container = container;
	this.ui = null;
	this.value = '';
	this.history = [];
	this.currentString = '';
	this.width = '100%';
	this.height = '300px';
	this.backgroundColor = '#222';
	this.commands = {
		help: {
			me: "I will help you",
			you: "Sorry, you can't help me",
			default: "Type 'help me' or 'help you'"
		},
		goto: {
			google: function () {
				window.open("http://www.google.com");
			}
		},
		default: "type 'help' for help"
	};
	
	this.setup = function () {
	
		this.ui = document.createElement('textarea');
		this.ui.className = 'command-interface';
		
		this.container.style.width = this.width;
		this.container.style.height = this.height;
		this.container.style.position = 'relative';
		
		this.ui.style.backgroundColor = this.backgroundColor;
		this.ui.style.position = 'absolute';
		this.ui.style.left = '0px';
		this.ui.style.top = '0px';
		this.ui.style.bottom = '0px';
		this.ui.style.width = this.width;
		this.ui.style.overflow = 'hidden';
		this.ui.setAttribute('type', 'hidden');
		this.ui.readOnly = true;
		
		this.container.appendChild(this.ui);
		this.value = '';
		this.ui.value = this.value + '> ' + this.currentString + '\n\n\n\n';
		
		_this = this;
				
		setInterval(function () {
				
			if(_this.ui.value === _this.value + '> ' + _this.currentString + '\n\n\n\n' && document.activeElement === _this.ui){
				_this.ui.value = _this.value + '> ' + _this.currentString + '_' + '\n\n\n\n';
			} else {
				_this.ui.value = _this.value + '> ' + _this.currentString + '\n\n\n\n';
			}
			
			_this.ui.scrollTop = 1000000;
			
		}, 500);
		
		document.addEventListener('keydown', function(event) {


			if(document.activeElement === _this.ui && event.which === 8){
				event.preventDefault();
				_this.currentString = _this.currentString.substring(0, _this.currentString.length - 1);
				_this.ui.value = _this.value + '> ' + _this.currentString + '\n\n\n\n';
			}
			
			
			
		}, false);
		
		this.ui.addEventListener('keypress', function(event) {
					
			if(event.which === 8){
				event.preventDefault();
				console.log('prevent backspace');
			}
		
			if(
				(event.which > 47 && event.which < 58) ||
				(event.which > 64 && event.which < 91) ||
				(event.which === 32) ||
				(event.which > 96 && event.which < 123) ||
				(event.which === 230 || event.which === 248 || event.which === 229) ||
				(event.which === 198 || event.which === 216 || event.which === 197)
			){
			
				_this.currentString += event.key;
				_this.ui.value = _this.value + '> ' + _this.currentString + '\n\n\n\n';
			
			}
			
			if(event.which === 13){
			
				_this.history.unshift(_this.currentString);
				
				var newValue = _this.value + '> ' + _this.currentString + '\n';
				_this.value = newValue;
				_this.ui.value = _this.value + '\n\n\n\n';
				
				_this.run(_this.currentString);
				
			}
		
		}, true);
		
		
	};
	
	this.setup();

}

Command.prototype.setSize = function (width, height) {
	
	if(width !== undefined){
		if(typeof width === 'number'){
			this.width = width+'px';
		} else if (typeof width === 'string') {
			this.width = width;
		}
	}
	
	if(height !== undefined){
		if(typeof height === 'number'){
			this.height = height+'px';
		} else if (typeof height === 'string') {
			this.width = height;
		}
	}
	
	this.container.style.width = this.width;
	this.container.style.height = this.height;
	this.ui.style.width = this.width;
	
}

Command.prototype.run = function (string) {

	_this.currentString = '';
	
	if(string === undefined || typeof string !== 'string'){
		this.print('[error] command not found');
	}
	
	if(string !== ''){
	
		var commandArray = string.split(' ');
		var finalCommand = this.commands;
		
		for (var i = 0; i < commandArray.length; i++) {
			if(finalCommand[commandArray[i].toLowerCase()] !== undefined){
				finalCommand = finalCommand[commandArray[i].toLowerCase()];
			} else {
				break;
			}
		}
		
		if(typeof finalCommand === 'string'){
			this.print(finalCommand);
		} else if (typeof finalCommand === 'function') {
			finalCommand();
		} else if (typeof finalCommand === 'object') {
		
			if(finalCommand['default'] !== undefined){
				this.print(finalCommand['default']);
			} else {
				this.print('[error] command not found');
			}
			
		} else {
			this.print('[error] command not found');
		}
		
	}
		
	this.ui.scrollTop = 1000000;
	
};

Command.prototype.print = function (string) {

	if(string === undefined || typeof string !== 'string'){
		return false;
	}
	
	//this.history.unshift(string);

	this.value = this.value + '> ' + string + '\n';
	this.ui.value = this.value + '> ' + this.currentString + '\n\n\n\n';

};