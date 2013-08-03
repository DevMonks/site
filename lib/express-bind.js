
var path = require( 'path' );

module.exports = function( entryPoint, middleware, module ) {

  if( !module ) {
    module = middleware;
    middleware = null;
  }

  var methods = { get: 'get', post: 'post', put: 'put', delete: 'del' };
  
  for( var i in module ) {

    var action = module[ i ];
    var key = i;
    var currentMethod = 'get';

    for( var j in methods ) {
      
      var method = methods[ j ];
      if( i.substring( 0, j.length ) === j ) {

        currentMethod = method;
        key = i.charAt( j.length ).toLowerCase() + i.substring( j.length + 1 )
      }
    }

    var route = path.join( entryPoint, key )
    if( path.sep !== '/' ) route = route.split( path.sep ).join( '/' ); //Windows fix
    var routeWithFormat = route + '.:format';

    console.log( 'Binding', currentMethod.toUpperCase(), '->', route, 'to', 'Module->' + key );

    if( middleware ) {

      this[ currentMethod ]( route, middleware, action );
      this[ currentMethod ]( routeWithFormat, middleware, action );

      if( key === 'index' )
        this[ currentMethod ]( entryPoint, middleware, action );

    } else {

      this[ currentMethod ]( route, action );
      this[ currentMethod ]( routeWithFormat, action );

      if( key === 'index' )
        this[ currentMethod ]( entryPoint, action );
    }
  }

  return this;
};