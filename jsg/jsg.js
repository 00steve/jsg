if(typeof Jsg === 'undefined'){
	Jsg = {};

	/*builds a point object. This is a simple object that 
	stores an x and y coordinate.*/
	function Point(x,y){
		console.log("type of x " + typeof x);
		if(x === null || isNaN(x)) throw new Error("argument x must be numeric");
		if(y === null || isNaN(y)) throw new Error("argument y must be numeric");
		this.x = x;
		this.y = y;
		
		this.Print = function(){
			return x + "," + y;
		}
	}
	
	/*builds a polygon object given an array of points or 
	an array of numbers. If an odd number of numbers are 
	passed in, the last number will simply be ignored.*/
	function Polygon(points){
		if(typeof points !== 'object'){
			throw new Error("argument must be an object/array, not a " + typeof points);
		}
		for(i in points){
			
			console.log(i + " = " + typeof points[i]);
		}
		
		
	}

}


