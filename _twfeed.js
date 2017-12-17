/**
 * twitter fetching and processing js for search or regular api json
 *
 * @author js+twitter+paulypopex@gmail.com
 * @date 27/02/09
 * @requires jquery1.2
 * @usage <script type="text/javascript" src="http://www.popex.ukshells.co.uk/twfeed.js"></script>
 * @usage + <ul class="tw"></ul>
 * @usage + <link rel="tw" href="http://search.twitter.com/search.json?q=@popbitch+OR+%23popbitch" />
 * @usage + optionally <a class="twreply" href="/reply">reply</a>
 */
var tw = {
  ul: 'ul.tw:last',
  r: 30,
  // d: function ( m ) { window.console && console.log( m ) },
  q: function (u) { return u.indexOf('?') == -1 ? '?' : '&' },
  u: function (n, na) { n = n.substring(1); return '<a href="http://twitter.com/' + n + '">' + (na ? '' : '@') + n + '</a>' },
  s: function (w) { w = w.substring(1); return '<a href="http://search.twitter.com/search?q=%23' + w + '"><u>' + w + '</u></a>' },
  p: function (t) { return t.replace(/((https?)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (F) { return '<a href="' + F + '">' + F + '</a>' }).replace(/\B@\w+/g, tw.u).replace(/\B\#[\w:]+/g, tw.s) }, /* from twitter's blogger.js */
  filter: function (m) { return $(tw.ul + ' #' + m.id).length },
  li: function (m, r) { return '<li class="tw" id="' + m.id + '">' + tw.p(m.text) + ' <i>' + tw.u('@' + (m.from_user || m.user.screenname), 1) + '</i>' + (r ? (' <a href="' + r + tw.q(r) + 'tw=' + m.id + '">reply</a>') : '') + '</li>' },
  get: function (a) {
    $(tw.ul).addClass('loading')
    var u = $('[rel=tw]').attr('href') || 'http://search.twitter.com/search.json?q=%23twitter'
    // tw.d(u);
    u += tw.q(u)
    u += 'callback=?'
    $.getJSON(u, function (js) { tw.go(js, a) })
  },
  go: function (js, a) {
    var ul = $(tw.ul)
    // $(ul).length || tw.d('ul.tw missing');
    var r = $('a.twreply').attr('href')
    js = js.results || js
    for (var i = 0; i < js.length; i++) {
      if (!tw.filter(js[i])) {
        var li = tw.li(js[i], r)
        a ? ul.append(li) : $(li).hide().prependTo(ul).slideDown('slow')
      }
    }
    ul.removeClass('loading')
    setTimeout(tw.get, tw.r * 1000)
  }
}
window.$ && $(function () {
  tw.get(true)
})
