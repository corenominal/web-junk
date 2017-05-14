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

    // Populate the nested grid with numbered divs
    for (var i = 1; i < 101; i++)
    {
        $( '#container-grid-nested' ).append( '<div class="box"><span>' + i + '</span></div>' );
    }

    $( document ).on( 'click', '.add-text', function( e )
    {
        e.preventDefault();
        
        var el = $( this ).parent();

        el.append( '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed finibus tellus. Fusce quis est lectus. Ut egestas arcu nisi, sed porta ante lacinia eget. Donec volutpat massa vitae nisl commodo accumsan. Mauris euismod lorem egestas iaculis pellentesque. Quisque vestibulum velit nunc, tristique consequat diam interdum consequat. Duis dapibus, libero sit amet pulvinar eleifend, ante felis vestibulum mauris, fringilla varius leo nulla a metus. Nunc egestas, lectus et interdum blandit, nisl lacus interdum sem, ut ullamcorper ligula lectus eu nisl. Aliquam volutpat arcu justo. Nam mattis varius nulla a malesuada. Nunc tempor ut tortor non dignissim. Aliquam erat volutpat. Pellentesque egestas maximus facilisis. Nam molestie purus tortor, at consectetur sapien mollis quis. Vivamus odio tortor, tempor non nulla in, auctor iaculis neque.</p>' );

    });

});
