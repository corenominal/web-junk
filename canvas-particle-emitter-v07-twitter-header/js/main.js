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
	var noOfParticles = 100;
	var cycles = 0;

	// Initial fill
	c.fillStyle = 'rgba( 30, 35, 45, 1 )';
	c.fillRect( 0, 0, canvasWidth, canvasHeight );

	function particle()
	{
		particleSize = 1;
		if( Math.random() < 0.05 )
		{
			particleSize = 2;
		}

		// Create a new particle
		var id = particles.length,
			x = canvasWidth / 2,
			y = canvasHeight / 2,
			vx = Math.random() * 10 - 5,
			vy = Math.random() * 10 - 5,
			size = particleSize,
			colour = 'rgba( 255, 255, 255, 0.' + Math.floor((Math.random() * 5) + 3) + ' )',
			life = 0,
			death = Math.random() * 500 + 10;

		particles[particles.length] = { 'id':id, 'x':x, 'y':y, 'vx':vx, 'vy':vy, 'size':size, 'colour': colour, 'life': life, 'death': death };
	}

	function emitter()
	{
		// Update the particles
		for (i = 0; i < particles.length; i++)
		{

			particles[i].x += particles[i].vx;
			particles[i].y += particles[i].vy;

			// Random switch of direction
			if( particles[i].size > 1 )
			{
				if( Math.random() < 0.7 )
				{
					particles[i].vx = Math.random() * 10 - 5;
					particles[i].vy = Math.random() * 10 - 5;
				}
			}
			else
			{
				if( Math.random() < 0.08 )
				{
					particles[i].vx = Math.random() * 10 - 5;
					particles[i].vy = Math.random() * 10 - 5;
				}
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

		for (i = 0; i < particles.length; i++)
		{
			if( particles[i].life < 1 )
			{
				c.fillStyle = 'rgba( 255, 255, 255, 0 )';
			}
			else
			{
				c.fillStyle = 'rgba( 255, 255, 255, 0.' + Math.floor((Math.random() * 5) + 3) + ' )';
			}
			c.fillRect(particles[i].x,particles[i].y,particles[i].size,particles[i].size);
		}

		cycles++;
	}

	function main()
	{
		emitter();
		renderer();

		if( cycles < 1000 )
		{
			requestAnimationFrame(main);
		}
	}

	main();

});
