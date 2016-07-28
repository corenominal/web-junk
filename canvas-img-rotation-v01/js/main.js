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

	function imgRotator()
	{
		// Set-up the canvas
		var canvasContainer = document.getElementById( 'container-canvas' );
		var canvasWidth = canvasContainer.offsetWidth;
		var canvasHeight = canvasContainer.offsetHeight;
		canvasContainer.innerHTML = '<canvas id="canvas" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>';
		var canvas = document.getElementById( 'canvas' );
		var c = canvas.getContext('2d');

		// Initial fill
		c.fillStyle = 'rgba( 33, 33, 33, 1 )';
		c.fillRect( 0, 0, canvasWidth, canvasHeight );

	}

	imgRotator();

});
