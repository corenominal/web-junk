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
	var noOfParticles = 1000;
	var particleSize = 6;
	var gravity = 0.2;
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
			vy = Math.random() * 6 - 12,
			energy = vy / 1.2,
			size = particleSize,
			colour = 'rgba( 20, 20, 20, 0.' + Math.floor((Math.random() * 5) + 3) + ' )',
			life = 0,
			death = Math.random() * 300 + 10;

		particles[particles.length] = { 'id':id, 'x':x, 'y':y, 'vx':vx, 'vy':vy, 'energy':energy, 'size':size, 'colour': colour, 'life': life, 'death': death };
	}

	function emitter()
	{
		// Update the particles
		for (i = 0; i < particles.length; i++)
		{

			particles[i].x += particles[i].vx;
			particles[i].y += particles[i].vy;

			particles[i].vy += gravity;

			// Bouncy bouncy
			if( particles[i].y  >  (canvasHeight - 20) )
			{
				particles[i].vy = particles[i].energy;
				particles[i].energy = particles[i].energy / 1.2;
			}

			if( particles[i].x < 0 ||  particles[i].x > canvasWidth )
			{
				particles[i].vx =- particles[i].vx;
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
		c.fillStyle = 'rgba( 255, 255, 255, 0.4 )';
		c.fillRect( 0, 0, canvasWidth, canvasHeight );

		for (i = 0; i < particles.length; i++)
		{
			c.fillStyle = particles[i].colour;
			if( particles[i].life < 2 )
			{
				c.fillStyle = 'rgba( 20, 20, 20, 0 )';
			}
			c.beginPath();
			c.arc( particles[i].x, particles[i].y, particles[i].size / 2, 0, 2*PI );
			c.fill();
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
