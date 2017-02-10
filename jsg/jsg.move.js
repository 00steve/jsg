if(typeof Jsg === 'undefined'){
	throw new Error("jsg.js must be included before jsg.draw.js");
} else if (typeof Jsg.Move === 'undefined'){
	
	Jsg.Move = function(timestep){
		for(i in this.Movables.list){
			this.Movables.list[i].Move(timestep);
		}
	}
	
	Jsg.Movables = {};
	Jsg.Movables.list = [];
	Jsg.Movables.Add = function(movable){
		this.list.push(movable);
		console.log("added movable on creation");
	}
	
	
	Jsg.Movable = function(properties){
		properties = properties || {};
		this.position = properties.position || new Point(0,0);	
		this.velocity = properties.velocity || new Point(0,0);
		
		this.Move = function(timestep){
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		}
		
		this.ShiftVelocity = function(x,y){
			this.velocity.x += x;
			this.velocity.y += y;
		}
		
		this.Shift = function(x,y){
			this.position.x += x;
			this.position.y += y;
		}
		
		return this;
	}
	
}
	