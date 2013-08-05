
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
            message = req.body.message,
            ip = req.connection.remoteAddress.toString(),
            now = new Date();
        
        var errors = req.validationErrors();
        
        if( !errors && ip in req.contactCache && now - req.contactCache[ ip ] > ( 2 * 60 * 60 ) ) {
            
            errors = [ { msg: 'Du hast uns in den letzten 2 Stunden bereits kontaktiert, bitte warte noch einen Moment' } ];
        }
        
        if( !errors ) {
            
            req.mailer.sendMail( {
                from: 'Bitte nicht antworten <no-reply@devmonks.net>',
                to: 'DevMonks Kontaktanfragen <kontakt@devmonks.net>',
                subject: 'Eine Kontaktanfrage ist eingegangen',
                text: "Von: " + email + "\n\nNachricht:\n" + message
            }, function( e, response ) {
                
                req.contactCache[ ip ] = new Date();
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
    },
            
    'cache.manifest': function( req, res ) {
        
        res.header( 'Content-Type', 'text/cache-manifest' );
        
        var manifest = "CACHE MANIFEST\n"
                     + "CACHE:\n"
                     + "/stylesheets/style.css\n"
                     + "/stylesheets/bootstrap-glyphicons.css\n"
                     + "/javascripts/fx.js\n"
                     + "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0-rc1/css/bootstrap.min.css\n"
                     + "http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800\n"
                     + "/images/icon.png\n"
                     + "/images/icon.ico\n"
                     + "/images/logo.png\n"
                     + "/images/social-icons.png\n"
                     + "/images/slide-background-1.png\n"
                     + "/images/slide-background-2.png\n"
                     + "/images/projects/devmonks-rework.png\n"
                     + "/images/projects/gamix.png\n"
                     + "/images/projects/grafix.png\n"
                     + "/fonts/glyphiconshalflings-regular.eot\n"
                     + "/fonts/glyphiconshalflings-regular.otf\n"
                     + "/fonts/glyphiconshalflings-regular.svg\n"
                     + "/fonts/glyphiconshalflings-regular.ttf\n"
                     + "/fonts/glyphiconshalflings-regular.woff\n";
             
        res.end( manifest );
    }
};