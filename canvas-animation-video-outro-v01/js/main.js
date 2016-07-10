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

	function doTheOutro()
	{
		// Cross-browser support for requestAnimationFrame
		var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
		// Setup the canvas
		var space = document.getElementById( 'container-canvas' );
		var w = space.offsetWidth;
		var h = space.offsetHeight;
		space.innerHTML = '<canvas id="spacecanvas" width="'+w+'" height="'+h+'"></canvas>';
		var canvas = document.getElementById( 'spacecanvas' );
		var c = canvas.getContext('2d');
		// Initial fill
		c.fillStyle = 'rgba( 33, 33, 33, 1 )';
		c.fillRect(0,0,w,h);

		var fini = false;

		// Audio
		var lazerSFX = new Howl(
		{
			urls: ['./sfx/lazer.mp3', './sfx/lazer.ogg']
		});
		var explosionSFX = new Howl(
		{
			urls: ['./sfx/explosion.mp3', './sfx/explosion.ogg']
		});

		var timeline = 0;

		var blasted = false;
		var manOnRock = new Image();
		manOnRock.src = './img/manOnRock.png';

		var stars = [];
		var noOfStars = 33;
		var star = new Image();
		star.src = './img/star.png';

		var lazerDuration = 0;
		var lazerDurationStart = 0;
		var readyToFire = false;
		var deathstar = new Image();
		deathstar.src = './img/deathstar.png';
		var deathstarY = 100;
		var deathstarX = -205;

		var flashDuration = 0;
		var flashDurationStart = 0;

		var debris = [];
		var debrisCount = 200;
		var maxDebrisSize = 40;
		var debrisCreated = false;

		function createDebris()
		{
			while ( debris.length < debrisCount )
			{
				var id = debris.length,
					x = w - 410,
					y = h - 207,
					vx = Math.random() * 10 - 5,
					vy = Math.random() * 10 - 5,
					size = Math.floor( ( Math.random() * maxDebrisSize ) + 1 ),
					life = 0,
					death = Math.random() * 200 - 5;

				debris[debris.length] = { 'id':id, 'x':x, 'y':y, 'vx':vx, 'vy':vy, 'size':size, 'life': life, 'death': death };
			}

			debrisCreated = true;
			explosionSFX.play();
		}

		function debrisUpdate()
		{
			for (i = 0; i < debris.length; i++)
			{
				debris[i].x += debris[i].vx;
				debris[i].y += debris[i].vy;
				debris[i].life++;

				// Remove dead debris
				if( debris[i].life > debris[i].death )
				{
					debris.splice(i, 1);
				}
			}
		}

		// Move the deathstar
		function deathstarEngine()
		{
			if( deathstarX < 105 )
			{
				deathstarX = deathstarX + 5;
			}
			else
			{
				if( !readyToFire )
				{
					readyToFire = true;
					lazerSFX.play();
					lazerDurationStart = timeline;
					lazerDuration = lazerDurationStart;
				}
			}
		}

		// Star creator
		function createStar()
		{
			var id = stars.length,
				x = Math.floor((Math.random() * w) + 1),
				y = Math.floor((Math.random() * h) + 1),
				size = ( Math.floor( ( Math.random() * 3 ) + 1 ) ) * 5,
				life = 0,
				death = Math.random() * 500 + 10;

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
			c.fillStyle = 'rgba( 33, 33, 33, 1 )';
			c.fillRect( 0, 0, w, h );

			// Draw stars
			for (i = 0; i < stars.length; i++)
			{
				c.drawImage(star, stars[i].x,stars[i].y,stars[i].size,stars[i].size);
			}

			//Draw Man on Rock Logo 220x215
			if( !blasted )
			{
				c.drawImage( manOnRock, w - 520, h - 315 );
			}

			if( timeline > 100 )
			{
				c.drawImage( deathstar, deathstarX, deathstarY );
			}

			if( readyToFire )
			{
				if( lazerDuration < ( lazerDurationStart + 50 ) )
				{
					c.beginPath();
					c.moveTo( 240, 230 );
					c.lineTo( w - 410, h - 207 );
					c.lineWidth=4;
					c.strokeStyle="#FFFFFF";
					c.stroke();

					c.beginPath();
					c.moveTo( 230, 215 );
					c.lineTo( w - 410, h - 207 );
					c.lineWidth=4;
					c.strokeStyle="#FFFFFF";
					c.stroke();

					c.beginPath();
					c.moveTo( 240, 200 );
					c.lineTo( w - 410, h - 207 );
					c.lineWidth=4;
					c.strokeStyle="#FFFFFF";
					c.stroke();

					lazerDuration++;

					flashDurationStart = timeline;
					flashDuration = flashDurationStart;
				}
				else
				{
					if( flashDuration < ( flashDurationStart + 15 ) )
					{
						c.fillStyle = 'rgba( 255, 255, 255, 1 )';
						c.fillRect( 0, 0, w, h );
						flashDuration++;
						blasted = true;
					}
					else
					{
						if( !debrisCreated )
						{
							createDebris();
						}
					}
				}
			}

			for (i = 0; i < debris.length; i++)
			{
				c.fillStyle = 'rgba(255,255,255, 1)';
				c.fillRect(debris[i].x,debris[i].y,debris[i].size,debris[i].size);
			}

			timeline++;
			//console.clear();
			//console.log( timeline );
		}



		function main()
		{
			starEmitter();
			// Deathstar in play?
			if( timeline > 100 )
			{
				deathstarEngine();
			}
			if( debrisCreated )
			{
				if( debris.length > 0 )
				{
					debrisUpdate();
				}
				else
				{
					fini = true;
					$( '.container-content' ).fadeIn(500);
				}
			}
			renderer();

			if( !fini )
			{
				requestAnimationFrame(main);
			}
		}

		main();

	}

	function init()
	{
		doTheOutro();
	}

	// Delay the start
	setTimeout(function()
	{
		init();
	}, 3000);

	$( '.container-content' ).hide();


});
