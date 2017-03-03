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
	var size = 24;

	function drawRectangles()
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

		for ( var i = 1; ( size * i ) <= boundry; i++ )
		{
			x = (canvasWidth / 2) - ((size * i) / 2);
			y = (canvasHeight / 2) - ((size * i) / 2);

			c.strokeStyle="#141414";
			c.lineWidth=4;
			//c.strokeRect( x position, y position, width, height );
			c.strokeRect( x, y, size * i, size * i );

		}
	}

	drawRectangles();

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
			drawRectangles();
		}
	}

});
