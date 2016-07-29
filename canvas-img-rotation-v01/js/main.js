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
		var w = canvasContainer.offsetWidth;
		var h = canvasContainer.offsetHeight;
		canvasContainer.innerHTML = '<canvas id="canvas" width="' + w + '" height="' + h + '"></canvas>';
		var canvas = document.getElementById( 'canvas' );
		var c = canvas.getContext('2d');

		// Initial fill
		c.fillStyle = 'rgba( 33, 33, 33, 1 )';
		c.fillRect( 0, 0, w, h );

		// The Image
		var manOnRock = new Image();
		manOnRock.src = './img/manOnRock.png';
		var degrees = 0;
		var timer = 0;
		var fini = false;

		// Audio
		var inSFX = new Howl(
		{
			urls: ['./sfx/in.ogg', './sfx/in.mp3']
		});
		var spinSFX = new Howl(
		{
			urls: ['./sfx/spin.ogg', './sfx/spin.mp3']
		});
		inSFX.play();

		// The renderer
		function renderer()
		{
			// Clear the canvas
			c.fillStyle = 'rgba( 33, 33, 33, 1 )';
			c.fillRect( 0, 0, w, h );

			// Finish the animation
			if( degrees >= 360 )
			{
				degrees = 0;
				fini = true;
			}

			// Wait or spin
			if( timer < 100 )
			{
				x = 10;
				if( timer < 40 )
				{
					x = Math.floor((Math.random() * 10) + 1);
				}
				if( x > 2 )
				{
					c.drawImage( manOnRock, (w/2)-200, (h/2)-200 );
				}
			}
			else
			{
				if( timer == 100 )
				{
					spinSFX.play();
				}
				c.save();
				c.translate( w/2, h/2 );
				c.rotate( degrees*Math.PI/180 );
				c.drawImage( manOnRock, -200, -200 );
				c.restore();
				degrees+=4;
			}

			timer++;
		}

		function main()
		{
			renderer();
			if( !fini )
			{
				requestAnimationFrame(main);
			}
		}

		main();

	}

	// Let's do this ...
	function init()
	{
		imgRotator();
	}

	// Delay the start
	setTimeout(function()
	{
		init();
	}, 3000);

});
