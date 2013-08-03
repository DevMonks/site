
module.exports = {
    
    index: function( req, res ) {
        
        res.render( 'index', {
            title: 'Startseite  - DevMonks Software Programmierung',
            active: 'home'
        } );
    },
            
    Team: function( req, res ) {

        res.render( 'team', {
            title: 'Team - DevMonks Software Programmierung',
            active: 'team'
        } );
    },
            
    Kontakt: function( req, res ) {

        res.render( 'contact', {
            title: 'Kontakt - DevMonks Software Programmierung',
            active: 'contact'
        } );
    },
            
    postKontakt: function( req, res ) {

        req.checkBody( 'email', 'Keine valide E-Mail Adresse angegeben' ).notEmpty().isEmail();
        req.checkBody( 'message', 'Die Nachricht sollte mindestens 40 Zeichen haben' ).len( 40 );
        
        req.sanitize( 'email' ).escape();
        req.sanitize( 'message' ).escape();
        
        var email = req.body.email,
            message = req.body.message;
        
        var errors = req.validationErrors();
        
        if( !errors ) {
            
            req.mailer.sendMail( {
                from: 'Bitte nicht antworten <no-reply@devmonks.net>',
                to: 'DevMonks Kontaktanfragen <kontakt@devmonks.net>',
                subject: 'Eine Kontaktanfrage ist eingegangen',
                text: "Von: " + email + "\n\nNachricht:\n" + message
            }, function( e, response ) {
                
                console.log( 'Send contact mail:', e, response );
                
                res.render( 'contact', {
                    title: 'Anfrage gesendet - DevMonks Software Programmierung',
                    active: 'contact',
                    errors: e,
                    email: email,
                    message: message,
                    success: !e
                } );
            } );
            return;
        }
        
        console.log( 'Failed validating contact mail:', errors );
        res.render( 'contact', {
            title: 'Kontakt - DevMonks Software Programmierung',
            active: 'contact',
            errors: errors,
            email: email,
            message: message
        } );
    },
            
    Impressum: function( req, res ) {

        res.render( 'imprint', {
            title: 'Impressum - DevMonks Software Programmierung',
            active: 'imprint'
        } );
    }
};