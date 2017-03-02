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

	var stars = [];
	var noOfStars = 80;

	// Initial fill
	c.fillStyle = 'rgba( 20, 20, 20, 1 )';
	c.fillRect( 0, 0, canvasWidth, canvasHeight );

	// Images
	var manOnRock = new Image();
	manOnRock.src = './img/manOnRock.png';

	var star = new Image();
	star.src = './img/star.png';

	// Star creator
	function createStar()
	{
		var id = stars.length,
			x = Math.floor((Math.random() * canvasWidth) + 1),
			y = Math.floor((Math.random() * canvasHeight) + 1),
			size = ( Math.floor( ( Math.random() * 3 ) + 1 ) ) * 5,
			life = 0,
			death = Math.random() * 500 + 10;

		// Collision Detection - avoid start hitting the logo
		while (
				( x >= ( canvasWidth/2 ) - 150 && x <= ( canvasWidth/2 ) + 150 )
				&&
				( y >= ( canvasHeight/2 ) - 150 && y <= ( canvasHeight/2 ) + 150 )
			)
		{
			x = Math.floor((Math.random() * canvasWidth) + 1);
			y = Math.floor((Math.random() * canvasHeight) + 1);
		}

		stars[stars.length] = { 'id':id, 'x':x, 'y':y, 'size':size, 'life': life, 'death': death };

	}

	// Star emitter
	function starEmitter()
	{

		// Remove dead stars
		for (i = 0; i < stars.length; i++)
		{
			stars[i].life++;

			if( stars[i].life > stars[i].death )
			{
				stars.splice(i, 1);
			}
		}

		// Create new stars
		while ( stars.length < noOfStars )
		{
			createStar();
		}
	}

	// The renderer
	function renderer()
	{
		// Clear the canvas
		c.fillStyle = 'rgba( 20, 20, 20, 1 )';
		c.fillRect( 0, 0, canvasWidth, canvasHeight );

		// Draw stars
		for (i = 0; i < stars.length; i++)
		{
			c.drawImage(star, stars[i].x,stars[i].y,stars[i].size,stars[i].size);
		}

		// Draw Man on Rock Logo
		c.drawImage( manOnRock, ( canvasWidth/2 ) - 80,( canvasHeight/2) - 86 );
	}

	// Main loop
	function main()
	{
		starEmitter();
		renderer();
		requestAnimationFrame(main);
	}
	main();

});
