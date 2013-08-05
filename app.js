
var express = require( 'express' ), 
    http = require( 'http'), 
    path = require( 'path'),
    validator = require( 'express-validator' )
    nodemailer = require( 'nodemailer' ),
    expressBind = require( './lib/express-bind' );

var app = express(),
    contactCache = {};

app.bind = expressBind;

var transport = nodemailer.createTransport( 'sendmail', {
    path: '/usr/sbin/sendmail',
    args: [ '-t', 'f', 'no-reply@devmonks.net' ]
} );

app.configure( function() {
    
    app.set( 'port', process.env.PORT || 1338 );
    
    app.set( 'views', __dirname + '/views' );
    app.set( 'view engine', 'jade' );
    app.use( express.favicon() );
    app.use( express.logger('dev') );
    app.use( express.bodyParser() );
    app.use( validator() );
    app.use( express.methodOverride() );
    app.use( express.cookieParser( 'etis-sknomved' ) );
    app.use( express.session() );
    app.use( function( req, res, next ) {
        
        req.mailer = transport;
        req.contactCache = contactCache;
        
        next();
    } );
    app.use( app.router );
    app.use( express.static( path.join(__dirname, 'public' ) ) );
    app.use( require( 'stylus' ).middleware( path.join( __dirname,  'public' ) ) );
} );

app.configure( 'development', function() {
    
    app.use( express.errorHandler() );
} );

app.bind( '/Projekte', require( './pages/projects' ) );
app.bind( '/', require( './pages/index' ) );


http.createServer( app ).listen( app.get( 'port' ), function() {
    
    console.log( "Express server listening on port " + app.get( 'port' ) );
});
