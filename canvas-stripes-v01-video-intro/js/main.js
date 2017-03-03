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
	// Audio
	var hello = new Howl(
	{
		urls: ['./sfx/hello_I_am_corenominal_56baud.mp3', './sfx/hello_I_am_corenominal_56baud.ogg']
	});

	function doTheStripyWipy()
	{
		// Cross-browser support for requestAnimationFrame
		var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
		// Setup the canvas
		var stripywipy = document.getElementById( 'container-canvas' );
		var w = stripywipy.offsetWidth;
		var h = stripywipy.offsetHeight;
		stripywipy.innerHTML = '<canvas id="stripywipycanvas" width="'+w+'" height="'+h+'"></canvas>';
		var canvas = document.getElementById( 'stripywipycanvas' );
		var c = canvas.getContext('2d');
		// Initial fill
		c.fillStyle = 'rgba( 20, 20, 20, 1 )';
		c.fillRect(0,0,w,h);
		// Vars
		var x = 0;
		var y = 0;
		var stripes = [];
		var finished = false;

		function setupStripes()
		{
			// While x is less than the width of the canvas, add an item to the stripes array
			while ( x < w )
			{
				var stripe_w = Math.floor((Math.random() * 4) + 1);
				var stripe_v = Math.floor((Math.random() * 8) + 4);
				x += Math.floor((Math.random() * 8) + 1);
				stripes[stripes.length] = { 'w': stripe_w , 'x': x, 'y': 0, 'v': stripe_v };
			}
		}

		function updateStripes()
		{
			l = stripes.length;
			for ( i = 0; i < l; i++ )
			{
				stripes[ i ].y += stripes[ i ].v;
			}
		}

		function drawStripes()
		{

			l = stripes.length;
			for ( i = 0; i < l; i++ )
			{
				c.strokeStyle = 'rgba( 255, 255, 255, 1 )';
				c.lineWidth = stripes[i].w;
				c.beginPath();
				c.moveTo(stripes[i].x, 0);
				c.lineTo(stripes[i].x, stripes[i].y);
				c.stroke();
			}
			finished = true;
			for ( i = 0; i < l; i++ )
			{
				if( stripes[ i ].y < h )
				{
					finished = false;
				}
			}
		}

		function main()
		{
			console.log( finished );
			if ( !finished )
			{
				updateStripes();
				drawStripes();
				requestAnimationFrame(main);
			}
		}

		setupStripes();
		main();

	}

	function init()
	{
		$( '#man-on-a-rock' ).fadeIn(500, function()
		{
			doTheStripyWipy();
			hello.play();
		});
	}

	// Delay the start
	setTimeout(function()
	{
		init();
	}, 3000);


});
