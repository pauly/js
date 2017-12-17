!(function ($) {
  var submit = function (e) {
    var form = $('#pebbleForm').serializeArray()
    var settings = { }
    for (var i in form) {
      settings[ form[ i ].name ] = form[ i ].value
    }
    var location = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(settings))
    document.location = location
    // e.preventDefault( );
    // return false;
  }
  var cancel = function (e) {
    document.location = 'pebblejs://close'
    // e.preventDefault( );
    // return false;
  }
  var init = function () {
    $('#submitButton').click(submit)
    $('#cancelButton').click(cancel)
  }
  var i = setInterval(function () {
    if (!(window.$)) return
    clearInterval(i)
    init()
  }, 50)
}(window.$))
