// Whip through the board converting links to artists
window.$ && $(function () {
  $('a.artist').each(function () {
    var $this = $(this)
    t = $this.text()
    $this.wrap('<span class="expl"></span>')
    $s = $this.parent()
    $s.append('<span><a href="http://www.google.com/search?q=' + t + '" class="google" title="Google ' + t + '">Google</a></span>')
    $s.append('<span><a href="http://www.imdb.com/find?s=all&q=' + t + '" class="imdb" title="Look up ' + t + ' on the IMDB">IMDB</a></span>')
    // s.append( '<span><a href="http://flickr.com/search/?q=' + t + '" class="flickr" title="Look up ' + t + ' on the Flickr">Flickr</a></span>' );
    $s.append('<span><a href="/wiki/' + encodeURI(t) + '" class="wiki" title="Just look here for more mentions of ' + t + '">Blog</a></span>')
  })
  $('.expl').hover(function () {
    $(this).find('span').css({ display: 'inline' })
  }, function () {
    $(this).find('span').css({ display: 'none' })
  })
  $('.expl span').css({ display: 'none' })
})
