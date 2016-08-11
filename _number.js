$( function ( ) {
  var $d = $('span.date_for_api:first'), n = $d.text( );
  // http://numbersapi.com/3/13/date
  n && $.get('http://numbersapi.com/' + n + '/date', function(data) {
    $d.parents('.gbbs:first').append('<p><a href="http://numbersapi.com/#' + n + '">Date fact</a>: <em>' + data + '<em></p>');
  } );
} );
