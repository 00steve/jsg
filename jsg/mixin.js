

//standard draw properties
/*
strokeStyle
strokeColor
fillColor

*/
var draw = {};




var collide = {};
collide.colliders = [];

collide.addCollider = function(collider){
	this.colliders.push(collider);
	console.log("add " + collider.type + " to collider");
	return this;
}


collide.point = function(point){
	this.type = "point";
	collide.addCollider(this);
	return this;
}

collide.line = function(pointA,pointB){
	this.type = "line";
	collide.addCollider(this);
	return this;
}

collide.circle = function(radius){
	this.type = "circle";
	collide.addCollider(this);
	return this;
}

collide.polygon = function(properties){
	this.type = "polygon";
	this.points = properties.points;
	return this;
}


var crate = function(){
	this.points = "1,2,3,4";
}
draw.polygon.call(crate.prototype);
collide.polygon.call(crate.prototype,{points:[point(-.5,-.5),point(-.5,.5),point(.5,.5),point(.5,-.5)]});

var basketball = function(radius){
	this.radius = 1.53;
	this.type = "circle";
}
draw.circle.call(basketball.prototype);
collide.circle.call(basketball.prototype,{radius:1,type:"circle"});
