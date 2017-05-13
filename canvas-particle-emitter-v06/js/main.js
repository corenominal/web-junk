/**
 *               _           _             _
 * __      _____| |__       (_)_   _ _ __ | | __
 * \ \ /\ / / _ \ '_ \ _____| | | | | '_ \| |/ /
 *  \ V  V /  __/ |_) |_____| | |_| | | | |   <
 *   \_/\_/ \___|_.__/     _/ |\__,_|_| |_|_|\_\
 *                        |__/
 * by @corenominal
 * More info: https://github.com/corenominal/web-junk 
 */

$(document).ready(function()
{
	// Cross-browser support for requestAnimationFrame
	var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

	// Set-up the canvas
	var canvasContainer = document.getElementById( 'container-canvas' );
	var canvasWidth = canvasContainer.offsetWidth;
	var canvasHeight = canvasContainer.offsetHeight;
	canvasContainer.innerHTML = '<canvas id="canvas" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>';
	var canvas = document.getElementById( 'canvas' );
	var c = canvas.getContext('2d');
	var particles = [];
	var noOfParticles = 10;
	var PI = Math.PI;

	// Initial fill
	c.fillStyle = 'rgba( 255, 255, 255, 1 )';
	c.fillRect( 0, 0, canvasWidth, canvasHeight );

	function particle()
	{
		// Create a new particle
		var id = particles.length,
			x = canvasWidth / 2,
			y = canvasHeight / 2,
			vx = Math.random() * 10 - 5,
			vy = Math.random() * 10 - 5,
			size = Math.random() * 300 + 100,
			life = 0,
			death = Math.random() * 500 + 10;

		particles[particles.length] = { 'id':id, 'x':x, 'y':y, 'vx':vx, 'vy':vy, 'size':size, 'life': life, 'death': death };
	}

	function emitter()
	{
		// Update the particles
		for (i = 0; i < particles.length; i++)
		{

			particles[i].x += particles[i].vx;
			particles[i].y += particles[i].vy;

			// Random switch of direction
			if( Math.random() < 0.1 )
			{
				particles[i].vx = Math.random() * 10 - 5;
				particles[i].vy = Math.random() * 10 - 5;
			}

			particles[i].life++;

			// Remove dead particles
			if( particles[i].life > particles[i].death )
			{
				particles.splice(i, 1);
			}
		}

		// Create new particles
		while ( particles.length < noOfParticles )
		{
			particle();
		}
	}

	function renderer()
	{
		c.fillStyle = 'rgba( 255, 255, 255, 0.1 )';
		c.fillRect( 0, 0, canvasWidth, canvasHeight );

		for (i = 0; i < particles.length; i++)
		{
			c.beginPath();

			c.shadowBlur = 150;
			c.shadowColor = 'rgba( 0, 0, 0, 0.8 )';

			var grd=c.createRadialGradient( particles[i].x, particles[i].y, 1, particles[i].x, particles[i].y, particles[i].size / 2.2);
			grd.addColorStop( 0, 'rgba( 0, 0, 0, 1 )' );
			grd.addColorStop( 1, 'rgba( 0, 0, 0, 0 )' );			

			c.fillStyle = grd;
			c.arc( particles[i].x, particles[i].y, particles[i].size / 2, 0, 2*PI );
			c.fill();

			c.shadowBlur = 0;
		}

	}

	function main()
	{
		emitter();
		renderer();
		requestAnimationFrame(main);
	}
	main();

});
