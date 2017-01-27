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
	// Load content in info box
	$( "#junk-info" ).load( "../lib/html/junk-info.html" );

	// Create a button for closing the code window
	var close = '<div id="code-close" class="code-close">[X] CLOSE</div>';

	// Hide the code textarea at start
	$( '#code' ).hide();

	// Handle code events
	$( document ).on( 'click', '.junk-info ul li a', function( e )
	{
		var source = $( this ).attr( 'href' );

		$.get( source, function( data )
		{
			data = data.replace(/<!-- foo -->[\s\S]*?<!-- bar -->/, '');
			$( '#code' ).val( data );
		} , 'text' );

		$( '#code' ).fadeIn();

		if( $( '#code-close' ).length == 0 )
		{
			$( 'body' ).append( close );
			$( '#code-close' ).fadeIn();
		}

		e.preventDefault();
	});

	// Close the code window
	$( document ).on( 'click', '#code-close', function()
	{
		$( this ).fadeOut( function()
		{
			$( this ).remove();
		});
		$( '#code' ).fadeOut();
	});

	// Detect keypress to hide junkbox and cursor
	$( document ).on( 'keydown', 'body', function(e)
	{
		if( e.keyCode == 72 )
		{
			$( '#junk-info' ).toggle();
			$( '#junk-info' ).toggleClass( 'hidden' );
			$( 'body' ).toggleClass( 'no-cursor' );
		}

		if( e.keyCode == 88 )
		{
			$( '#code-close' ).fadeOut( function()
			{
				$( '#code-close' ).remove();
			});
			$( '#code' ).fadeOut();
		}

	})

});
