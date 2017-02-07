if(typeof jsg === 'undefined'){
	jsg = {};

	/*builds a point object. This is a simple object that 
	stores an x and y coordinate.*/
	function point(x,y){
		this.x = x;
		this.y = y;
		
		this.print = function(){
			return x + "," + y;
		}
	}
	
	/*builds a polygon object given an array of points or 
	an array of numbers. If an odd number of numbers are 
	passed in, the last number will simply be ignored.*/
	function polygon(points){
		if(typeof points !== 'object'){
			throw new Error("argument must be an object/array, not a " + typeof points);
		}
		for(i in points){
			
			console.log(i + " = " + typeof points[i]);
		}
		
		
	}

}


