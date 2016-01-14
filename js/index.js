var schema = function(){

	return {

		p5:null,

		w:window.innerWidth,
		h:window.innerHeight,

		color_accent:{
			r:0,
			g:85,
			b:255
		},

		generate:function(){
			var self = view;

			self.p5 = new p5(self.sketch);
		},
		sketch:function(p){
			var self = view;

			var yoff = 1.0;

			var nA = 0;
			var sc = 1.0;
			var h1;

			//how far apart each horizontal location on the sinewave should be spaced
			var xspacing = 1;

			//width of entire sinewave
			var w;

			//sinewave
			var theta = 0.0;	//start at 0
			var amplitude;		//height of wave
			var period;			//how many pixels before the wave repeats
			var dx;				//value for incrementing x, a function of period and xspacing
			var yvalues = [];	//using an array to store height values for the wave

			p.setup = function(){
				
				var c = p.createCanvas(self.w,self.h);
				c.parent('bknd');

				p.background(self.color_accent.r,self.color_accent.g,self.color_accent.b);

				p.noStroke();
				p.smooth();

				theta = 0.0;
				amplitude = p.width/90;
				period = p.width;

				//sinewave
				w = p.width;
				dx = (p.TWO_PI/period)*xspacing;

				d3.range(0,p.width).forEach(function(d){
					yvalues.push(d);
				});

				h1 = 15;
			}

			p.draw = function(){

				var pFactor = 40;//p.height/10;
				var opacity = 2;

				p.fill(self.color_accent.r,self.color_accent.g,self.color_accent.b,15);
				p.rect(0,0,p.width,p.height);

				//sinewave
				p.calcWave();

				var xoff = 0;

				//iterate over horizontal pixels
				for(var i=0; i<p.width; i++){
					var y = p.map(p.noise(xoff, yoff), 0, 1, p.height/2-h1*pFactor, p.height/2+h1*pFactor);

					//add sinewave
					y +=yvalues[i];

					p.fill(255,y/opacity);

					//draw rects
					p.rect(i,y,1,p.height);

					//increment x-dimension for noise
					xoff += 0.003;
				}

  				xoff = 0;

			}

			p.calcWave = function(){
				
				//increment theta
				theta += 0.06;

				//for every x-value, calculate a y-value with sine function
				var x = theta;

				for(var i=0; i<yvalues.length; i++){
					yvalues[i] = p.sin(x)*amplitude;
					x +=dx;
				}
			}
		}
	}
}

var view = schema();
view.generate();