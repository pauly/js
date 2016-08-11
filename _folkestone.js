!function ( $ ) {
  'use strict';
  if ( ! $ ) return;
  var name = $('a[itemprop="name"]:first').text( );
  name = ( '' + name ).replace( /'/, '' );
  var $address = $('addr.address');
  var address = $address.text( ).split( ', ' )[1];
  if ( ! address ) return;
  // if ( window.console ) console.log( name, address );
  var success = function ( data ) {
    if ( ! data && data.establishments ) {
      // console.log( 'success, but got', data );
      return;
    }
    var venue = data.establishments[0];
    if ( ! venue ) return;
    // if ( window.console ) console.log( venue );
    var img = '<img src="/img/fsa/' +
      ( '' + venue.RatingKey ).toLowerCase( ) +
      '.jpg" />';
    img += '<br />' + [
      venue.AddressLine1,
      venue.AddressLine2,
      venue.AddressLine3,
      // venue.RightToReply,
      venue.RatingDate
    ].join( ', ' );
    var a = '<a href="//ratings.food.gov.uk/">' + img + '</a>';
    $address.after( '<p>' + a + '</p>' );
  };
  var fail = function ( a, b, c ) {
    // if ( window.console ) console.log( 'fail', a, b, c );
  };
  var beforeSend = function ( xhr ){
    xhr.setRequestHeader( 'accept', 'text/json' );
    xhr.setRequestHeader( 'X-Api-Version', 2 );
  };
  var options = {
    dataType: 'json',
    url: 'http://api.ratings.food.gov.uk/Establishments?name=' + name + '&address=' + address,
    // beforeSend: beforeSend,
    headers: {
      accept: 'text/json',
      'x-api-version': 2
    },
    success: success,
    fail: fail
  };
  // if ( window.console ) console.log( options );
  $.ajax( options );
}( window.$ );
