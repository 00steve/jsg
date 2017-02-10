/*javascript animate*/

if(typeof Jsg === 'undefined'){
	throw new Error("jsg.js must be included before jsg.animate.js");
} else if(typeof Jsg.Animate === 'undefined'){
	
	
	Jsg.Animate = {};
	Jsg.Animate.framerate = 60;
	Jsg.Animate.timestep = Math.round(1000/60);
	
	Jsg.Animate.lastCalledTime;
	Jsg.Animate.fps;
	
	Jsg.Animate.FrameRate = function(framerate){
		this.framerate = framerate;
	}
	
	Jsg.Animate.Update = function(){
		if(!lastCalledTime) {
			lastCalledTime = Date.now();
			fps = 0;
			return;
		}
		delta = (Date.now() - lastCalledTime)/1000;
		lastCalledTime = Date.now();
		fps = 1/delta;
		
		Jsg.Update(delta);
		Jsg.Move(delta);
		Jsg.Draw();
		requestAnimationFrame(Jsg.Animate.Update);
	}
	
	Jsg.Animate.Run = function(){
		console.log(this.timestep);
		lastCalledTime = Date.now();
		//setInterval(this.Update, this.timestep);
		this.Update();
	}
	
	
	//Jsg.Animate.Add()

}
