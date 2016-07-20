function Command(container) {

	var debug = false;

	if(container === undefined || !container || typeof container !== 'object' || container.nodeType !== 1){
		if(debug) console.log('Missing container');
		return false;
	}
	
	this.container = container;
	this.ui = null;
	this.value = '';
	this.disabled = false;
	this.history = [];
	this.historyCount = null;
	this.currentString = '';
	this.width = '100%';
	this.height = '300px';
	this.backgroundColor = '#222';
	this.commands = {};
	
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
				_this.ui.value = _this.value + ( !_this.disabled ? '> '+_this.currentString+'_' : '') + '\n\n\n\n';
			} else {
				_this.ui.value = _this.value + ( !_this.disabled ? '> ' + _this.currentString : '') + '\n\n\n\n';
			}
			
			_this.ui.scrollTop = 1000000;
			
		}, 500);
		
		document.addEventListener('keydown', function(event) {
		
			if(_this.disabled) return false;
						
			if(document.activeElement === _this.ui){
			
				if(event.which === 8){
					event.preventDefault();
					_this.currentString = _this.currentString.substring(0, _this.currentString.length - 1);
					_this.ui.value = _this.value + '> ' + _this.currentString + '\n\n\n\n';
				} else if (event.which === 38) {
					_this.backHistory();
				} else if (event.which === 40) {
					_this.forwardHistory();
				}
			}
			
			
		}, false);
		
		this.ui.addEventListener('keypress', function(event) {
		
			if(_this.disabled) return false;
					
			if(event.which === 8){
				event.preventDefault();
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

Command.prototype.disable = function () {

	this.disabled = true;

};

Command.prototype.enable = function () {

	this.disabled = false;

};

Command.prototype.import = function (commands) {

	if(commands !== undefined && typeof commands === 'object'){
		this.commands = commands;
	} else {
		if(debug) console.log('missing or invalid object');
		return false;
	}
	
	return true;

};

Command.prototype.add = function (path, response) {
	
	if(path !== undefined && response !== undefined && typeof path === 'string' && (typeof response === 'string' || typeof response === 'function')){
		
		var pathArray = path.split('.');
		var currentPath = this.commands;
		
		for (var i = 0; i < pathArray.length; i++) {
			
			var key = pathArray[i].toLowerCase();
			
			if(currentPath[key] === undefined){
				currentPath[key] = (i < pathArray.length-1)?{}:response;
			}
			
			currentPath = currentPath[key];
			
		}
		
	} else {
		if(debug) console.log('missing or invalid parameters');
		return false;
	}
	
	return true;
	
}

Command.prototype.backHistory = function () {

	if(this.history.length < 1) return false;
	if(this.historyCount === null) this.historyCount = this.history.length-1;

	this.historyCount = (this.historyCount < this.history.length-1)?this.historyCount+1:0;
	this.currentString = this.history[this.historyCount];
	
	return true;

};

Command.prototype.forwardHistory = function () {

	if(this.history.length < 1) return false;
	if(this.historyCount === null) this.historyCount = 0;

	this.historyCount = (this.historyCount <= 0)?this.history.length-1:this.historyCount-1;
	this.currentString = this.history[this.historyCount];
	
	return true;

};

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
	
	this.historyCount = null;
	this.ui.scrollTop = 1000000;
	
};

Command.prototype.print = function (string) {

	if(string === undefined || typeof string !== 'string'){
		return false;
	}
	
	this.historyCount = null;

	this.value = this.value + '> ' + string + '\n';
	this.ui.value = this.value + ( !this.disabled ? '> '+this.currentString : '') + '\n\n\n\n';

};