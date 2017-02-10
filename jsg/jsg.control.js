if(typeof Jsg === 'undefined'){
	throw new Error("jsg.js must be included before jsg.control.js");
} else if (typeof Jsg.Control === 'undefined'){
	
	Jsg.Control = {};
	Jsg.Control.Keyboard = {};
	Jsg.Control.Keyboard.Keys = [];
	document.onkeydown = function(e){
		var key = e.keyCode || e.which;
		/*if(window.event) {                  
			key = e.keyCode;
		} else if(e.which){                 
			key = e.which;
		}*/
		Jsg.Control.Keyboard.Keys[String.fromCharCode(key)] = true;
	}
	document.onkeyup = function(e){
		var key;
		if(window.event) {                   
			key = e.keyCode;
		} else if(e.which){                  
			key = e.which;
		}
		Jsg.Control.Keyboard.Keys[String.fromCharCode(key)] = false;
	}
	
	
	Jsg.Controllable = {};
	Jsg.Controllables = {};
	Jsg.Controllables.list = [];
	Jsg.Controllables.Add = function(controllable){
		this.list.push(controllable);
		console.log("added controllable on creation");
	}
	
	Jsg.Controllable = function(properties){
		properties = properties || {};
		
		this.Control = function(){
		}
		
		this.Keyboard = {};
		this.Keyboard.IsPressed = function(e){
			return Jsg.Control.Keyboard.Keys[e] === true;
		}
		
		return this;
	}
	
}
	