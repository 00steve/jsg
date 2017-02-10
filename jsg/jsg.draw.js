if(typeof Jsg === 'undefined'){
	throw new Error("jsg.js must be included before jsg.draw.js");
} else {
	
	
	Jsg.Canvas = {};
	Jsg.Canvas.node = null;
	Jsg.Canvas.context = null;
	Jsg.Canvas.redrawOnResize = true;
	Jsg.drawMin = new Point(0,0);
	Jsg.drawMax = new Point(0,0);
	
	
	if(typeof Jsg.Canvas.Node === 'undefined'){
		Jsg.Canvas.Node = function(node){
			this.node = node;
			console.log(typeof node.getContext);
			if(typeof node.getContext !== 'function') throw new Error("could not get canvas context. Please verify that node is a html <canvas> element.");
			this.context = this.node.getContext("2d");
		}
	}
	
	if(typeof Jsg.Canvas.RedrawOnResize === 'undefined'){
		Jsg.Canvas.RedrawOnResize = function(redrawOnResize){
			this.redrawOnResize = redrawOnResize;
		}
	}
	
	if(typeof Jsg.FitDrawAreaToCanvas === 'undefined'){
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
	}


	if(typeof Jsg.Draw === 'undefined'){
		Jsg.Draw = function(){
			if(!this.Canvas.node) throw new Error("No canvas set. Use Jsg.Canvas() to set a node");
			console.log("Draw!");
			//for(i in this.points){
				//this.points[i].Draw(this.Canvas.context);
			//}
			for(i in this.drawables){
				this.drawables[i].Draw(this.Canvas.context);
			}
			
		}
	}

	
	
}
