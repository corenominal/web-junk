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
	var PI = Math.PI;
	var radius = 12;

	function drawArcs()
	{
		// Set-up the canvas
		var canvasContainer = document.getElementById( 'container-canvas' );
		var canvasWidth = canvasContainer.offsetWidth;
		var canvasHeight = canvasContainer.offsetHeight;
		canvasContainer.innerHTML = '<canvas id="canvas" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>';
		var canvas = document.getElementById( 'canvas' );
		var c = canvas.getContext('2d');

		var boundry = canvasWidth;
		if( canvasHeight > canvasWidth )
		{
			boundry = canvasHeight;
		}

		// Initial fill
		c.fillStyle = 'rgba( 255, 255, 255, 1 )';
		c.fillRect( 0, 0, canvasWidth, canvasHeight );

		for ( var i = 1; (radius * i) < boundry; i++ )
		{
			c.beginPath();
			// c.arc(x position, y position, radius, start angle, end angle, counterclockwise);
			c.arc( canvasWidth / 2, canvasHeight / 2, radius * i, 0, 2 * PI, false );
			c.strokeStyle="#111111";
			c.lineWidth=4;
			c.stroke();
		}
	}
	
	drawArcs();

	// Redraw on window resize
	var rtime;
	var timeout = false;
	var delta = 200;
	$(window).resize(function()
	{
		rtime = new Date();
		if ( timeout === false )
		{
			timeout = true;
			setTimeout( resizeend, delta );
		}
	});

	function resizeend()
	{
		if ( new Date() - rtime < delta )
		{
			setTimeout( resizeend, delta );
		}
		else
		{
			timeout = false;
			drawArcs();
		}               
	}

});