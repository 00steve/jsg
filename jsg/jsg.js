/*javascript graph*/




if(typeof Jsg === 'undefined'){


	Jsg = {};
	
	
	Jsg.Add = function(shape){
		if(typeof shape !== 'object') throw new Error("Shape must be a valid object type (for example a Point() or Polygon().");
		
		if(typeof shape.Move === 'function'){
			Jsg.Movables.Add(shape);
		}
		
		if(typeof shape.Draw === 'function'){
			Jsg.Drawables.Add(shape);
		}
		if(typeof shape.Update === 'function'){
			Jsg.Updatables.Add(shape);
		}
		
		
	}
	
	Jsg.Points = function(){
		return this.points;
	}
	

	/*builds a point object. This is a simple object that 
	stores an x and y coordinate.*/
	function Point(x,y){
		if(x === null || isNaN(x)) throw new Error("argument x must be numeric");
		if(y === null || isNaN(y)) throw new Error("argument y must be numeric");
		this.x = x;
		this.y = y;
		this.type = "point";
		this.size = 1;
		
		this.Size = function(size){
			this.size = size;
			return this;
		}
		
		this.Length = function(){
			return Math.sqrt(x*x+y*y);
		}
		
		this.Magnitude = function(){
			return x*x+y*y;
		}
		
		this.Normal = function(){
			var l = Length();
			return new Point2(x/l,y/l);
		}
		
		this.Normalize = function(){
			var n = Normal();
			this.x = n.x;
			this.y = n.y;
			return this;
		}
		
		this.Perpendicular = function(){
			new Point(y,-x).Normalize();
		}
		
		this.Draw = function(context){
			context.fillRect(this.x-this.size*.5,this.y-1-this.size*.5,this.size,this.size);
		}
		
		this.Print = function(){
			return x + "," + y;
		}
	}
	
	function Line(a,b){
		this.a = a;
		this.b = b;
		this.type = "line";
		this.Draw = function(context){
			context.beginPath();
			context.moveTo(a.x,a.y);
			context.lineTo(b.x,b.y);
			context.stroke();
		}
	}
	
	/*builds a polygon object given an array of points or 
	an array of numbers. If an odd number of numbers are 
	passed in, the last number will simply be ignored.*/
	function Polygon(points){
		if(typeof points !== 'object'){
			throw new Error("argument must be an object/array, not a " + typeof points);
		}
		this.type = "polygon";
		if(typeof points[0] === 'object'){
			this.points = points;
		}
		this.Draw = function(context){
			context.beginPath();
			var i = l = this.points.length-1;
			console.log(i);
			context.moveTo(this.points[i].x,this.points[i].y);
			while(i-->0){
				context.lineTo(this.points[i].x,this.points[i].y);
			}
			context.lineTo(this.points[l].x,this.points[l].y);
			context.stroke();
		}
		
		
	}
	
	function MergeSortPoints(points,axis){
		if(points.length < 2) return points;
		var middle = parseInt(points.length / 2);
		var left = points.slice(0,middle);
		var right = points.slice(middle,points.length);
		return MergePoints(MergeSortPoints(left,axis),MergeSortPoints(right,axis),axis);
	}
	function MergePoints(left,right,axis){
		var points = [];
		while(left.length && right.length){
			if(left[0][axis] <= right[0][axis]){
				points.push(left.shift());
			} else {
				points.push(right.shift());
			}
		}
		while(left.length){
			points.push(left.shift());
		}
		while(right.length){
			points.push(right.shift());
		}
		return points;
	}
	
	/*set an axis to sort by "x" or "y", and the direction 
	"asc" or "desc". If neither are set, it will default to 
	"y" "asc".*/
	function SortPoints(points,axis,direction){
		axis = axis ? axis.toLowerCase() : "x";
		direction = direction ? direction.toLowerCase() : "asc";
		if(axis != "y" && axis != "x") throw new Error("OrderPoints :: Axis argument must be 'x' or 'y'");
		if(direction != "asc" && direction != "desc") throw new Error("OrderPoints :: Direction argument must be 'asc' or 'desc'");
		return MergeSortPoints(points,axis);
	}
	
	
	function Voronoi(points){
		if(typeof points !== 'object'){
			throw new Error("argument must be an object/array, not a " + typeof points);
		}
		var npoints = SortPoints(points);
		var opoints = [];
		var cpoint;
		while(npoints.length){
			cpoint = npoints.shift();
			
			
			opoints.push(cpoint);
		}
		
		return this;
		
	}

}


