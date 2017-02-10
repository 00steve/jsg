if(typeof Jsg === 'undefined'){
	throw new Error("jsg.js must be included before jsg.draw.js");
} else if (typeof Jsg.Update === 'undefined'){
	
	Jsg.Update = function(timestep){
		for(i in this.Updatables.list){
			this.Updatables.list[i].Update(timestep);
		}
	}

	Jsg.Updatables = {};
	Jsg.Updatables.list = [];
	Jsg.Updatables.Add = function(updatable){
		this.list.push(updatable);
		console.log("added updatable on creation");
	}
	
	Jsg.Updatable = function(properties){
		properties = properties || {};		
		this.Update = properties.callback || function(timestep){}
		return this;
	}
	
}
	