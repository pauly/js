(function (window, $) {
  if (!$) return
  /**
   * my map script
   *
   * @see    folkestonegerald.com/map
   * @author  PC <paulypopex+js+maps@gmail.com>
   * @date  Thu Dec 17 19:49:28 GMT 2009
   */
  var myGmap = {
    _lat: '',
    _lon: '',
    lat: '',
    lon: '',
    msie: 0,
    maxPins: 150,
    js: [],
    mapDiv: '',
    highlight: '',
    interval: null,
    wait: 5,
    lowlights: [],
    map: '',
    panel: '',
    table: '',
    locations: [],
    moving: 0,
    panel: '#panel',
    init: function (mapDiv, lat, lon) {
      this.mapDiv = document.getElementById('map')
      if (mapDiv && mapDiv.id && mapDiv.className) {
        this.mapDiv = mapDiv
      }
      var meta = ('' + $('meta[name="geo.position"]').attr('content')).split(/, */)
      lat = $(this.lat).val() || $('#latitude').val() || meta[0] || '51.071'
      lon = $(this.lon).val() || $('#longitude').val() || meta[1] || '1.179'
      var map = new google.maps.Map(
        this.mapDiv, {
          center: new google.maps.LatLng(lat, lon),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      )
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: map
      })
    }
  }
  var i = setInterval(function () { // init when we have prerequisites
    if (!(window.$ && window.google && google.maps.Map)) return
    clearInterval(i)
    myGmap.init()
    $(window).unload(function () {
      GUnload()
    })
  }, 100)
}(window, window.$))
