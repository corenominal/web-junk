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
	// Create a button for closing the code window
	var close = '<div id="code-close" class="code-close">&cross; close</div>';

	// Hide the code textarea at start
	$( '#code' ).hide();

	// Handle code events
	$( document ).on( 'click', '.junk-info ul li a', function( e )
	{
		$( '#code-close' ).remove();
		
		var source = $( this ).attr( 'href' );

		$.get( source, function( data )
		{
			$( '#code' ).val( data );
		} , 'text' );

		$( '#code' ).show();
		$( 'body' ).append( close );

		e.preventDefault();
	});

	// Close the code window
	$( document ).on( 'click', '#code-close', function()
	{
		$( this ).remove();
		$( '#code' ).hide();
	});

});