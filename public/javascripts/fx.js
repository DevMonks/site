
( function( jQuery, undefined ) {
    
    function init() {
        
        var $body = $( 'body' ),
            $page = $body.find( '.page' ),
            $mainContent = $body.find( '.main-content' );
        
        $( '.teasers' ).each( function() {
            
            var $teasers = $( this ),
                $links = $teasers.find( 'a' );
                
            var on = function( e ) {
                
                $teasers.find( 'active' ).removeClass( 'active' );
                $( this ).add( $( this ).next( '.title' ) ).addClass( 'active' );
                $links.not( '.active' ).addClass( 'inactive' );
            };
            
            var off = function( e ) {
                
                $links.removeClass( 'inactive' );
                $( this ).add( $( this ).next( '.title' ) ).removeClass( 'active' );
            };
                
            $links.hover( on, off );
            
            $links.next( '.title' ).hover( function( e ) {
                
                on.call( $( this ).prev( 'a' ), e )
            }, function( e ) {
                
                off.call( $( this ).prev( 'a' ), e );
            } );
        } );
        
        $( 'a' ).click( function( e ) {
            
            var $el = $( this );
            if( $el.attr( 'href' ) && $el.attr( 'href' )[ 0 ] === '/' ) {
                e.preventDefault();
                
                $mainContent.fadeOut( 'fast', function() {
                    
                    window.location.href = $el.attr( 'href' );
                } );
            }
            
        } );
        
        $body.removeClass( 'no-js' );
        $mainContent.fadeIn( 'fast' );
    }
    
    $( init );
    
} )( jQuery );