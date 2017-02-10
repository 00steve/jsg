/*javascript draw*/
if(typeof Jsg === 'undefined'){
	throw new Error("jsg.js must be included before jsg.draw.js");
} else if (typeof Jsg.Drawable === 'undefined'){
	
	Jsg.Drawable = {};
	Jsg.Drawables = {};
	Jsg.Drawables.list = [];
	Jsg.Drawables.Add = function(drawable){
		this.list.push(drawable);
		console.log("added drawable on creation");
	}
	Jsg.Drawable.Point = function(properties){
		properties = properties || {};
		this.position = properties.position || {x:0,y:0};
		this.size = properties.size || 2;
		this.Draw = function(context){
			context.fillRect(this.position.x-this.size*.5,this.position.y-1-this.size*.5,this.size,this.size);
		}
		return this;
	}
	Jsg.Drawable.Line = function(){
		this.Draw = function(context){
			console.log("draw line");
		}
		return this;
	}
	Jsg.Drawable.Circle = function(properties){
		properties = properties || {};
		this.radius = properties.radius || 5;
		this.Draw = function(context){

			context.beginPath();
			context.arc(0,0,this.radius,0,2*Math.PI);
			context.stroke();
		}
		return this;
	}
	Jsg.Drawable.Polygon = function(properties){
		properties = properties || {};
		this.points = properties.points || [new Point(-5,-5),new Point(-5,5),new Point(5,5),new Point(5,-5)];
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
		return this;
	}
	
	
	Jsg.Canvas = {};
	Jsg.Canvas.node = null;
	Jsg.Canvas.context = null;
	Jsg.Canvas.redrawOnResize = true;
	Jsg.Canvas.clearBeforeDraw = true;
	Jsg.drawMin = new Point(0,0);
	Jsg.drawMax = new Point(0,0);

	Jsg.Canvas.Node = function(node){
		this.node = node;
		if(typeof node.getContext !== 'function') throw new Error("could not get canvas context. Please verify that node is a html <canvas> element.");
		this.context = this.node.getContext("2d");
	}
	Jsg.Canvas.RedrawOnResize = function(redrawOnResize){
		this.redrawOnResize = redrawOnResize;
	}
	Jsg.Canvas.ClearBeforeDraw = function(clear){
		this.clearBeforeDraw = clear;
	}
	
	Jsg.FitDrawAreaToCanvas = function(){
		if(!this.Canvas.node) throw new Error("No canvas set. Use Jsg.Canvas() to set a node");
		this.drawMin = new Point(0,0);
		this.drawMax = new Point(this.Canvas.node.clientWidth,this.Canvas.node.clientHeight);
		this.Canvas.context.canvas.width = this.drawMax.x - this.drawMin.x;
		this.Canvas.context.canvas.height = this.drawMax.y - this.drawMin.y;
		//console.log(this.Canvas.context.width + "," + this.Canvas.context.height);
		if(this.Canvas.redrawOnResize){
			Jsg.Draw();
		}
	}
	Jsg.Draw = function(){
		if(!this.Canvas.node) throw new Error("No canvas set. Use Jsg.Canvas() to set a node");
		if(this.Canvas.clearBeforeDraw) this.Canvas.context.clearRect(0, 0, this.Canvas.node.width, this.Canvas.node.height);
		this.Canvas.context.translate(20,20);
		for(i in this.Drawables.list){
			if(this.Drawables.list[i].position){
				this.Canvas.context.translate(this.Drawables.list[i].position.x,this.Drawables.list[i].position.y);
				this.Drawables.list[i].Draw(this.Canvas.context);
				this.Canvas.context.translate(-this.Drawables.list[i].position.x,-this.Drawables.list[i].position.y);
			} else {
				this.Drawables.list[i].Draw(this.Canvas.context);
			}
		}
		this.Canvas.context.setTransform(1, 0, 0, 1, 0, 0);	
	}

	
	
}
