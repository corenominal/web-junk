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
	$( "#junk-info" ).load( "../lib/html/junk-info.html",function(){
		if( $( '#code' ).hasClass( 'code-inverted' ) )
		{
			$( '.invertThisFill' ).attr( 'fill', '#111111' );
			$( '.invertThisStroke' ).attr( 'stroke', '#111111' );
		}
	} );

	// Create a button for closing the code window
	var close = '<div id="code-close" class="code-close code-close-default">[X] CLOSE</div>';
	if( $( '#code' ).hasClass( 'code-inverted' ) )
	{
		var close = '<div id="code-close" class="code-close code-close-inverted">[X] CLOSE</div>';
	}

	// Hide the code textarea at start
	$( '#code' ).hide();

	// Handle code events
	$( document ).on( 'click', '.junk-info ul li a', function( e )
	{	
		var source = $( this ).attr( 'href' );

		$.get( source, function( data )
		{
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

});