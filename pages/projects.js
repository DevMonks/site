
module.exports = {
    
    index: function( req, res ) {

        res.render( 'projects', {
            title: 'Projekte - DevMonks Software Programmierung',
            active: 'projects'
        } );
    },
    
    'Der-Rework': function( req, res ) {
        
        res.render( 'projects/der-rework', {
            title: 'Der Rework - DevMonks Software Programmierung',
            active: 'projects'
        } );
    },
            
    'Grafix-js': function( req, res ) {

        res.render( 'projects/grafix-js', {
            title: 'Der Rework - DevMonks Software Programmierung',
            active: 'projects'
        } );
    },
            
    'Gamix-js': function( req, res ) {

        res.render( 'projects/gamix-js', {
            title: 'Der Rework - DevMonks Software Programmierung',
            active: 'projects'
        } );
    }
}