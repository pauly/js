/**
 * add some async google analytics tracking
 *
 * @name	t/ga.js
 * @author	PC <paulypopex+php@gmail.com>
 * @date	Thu Feb 24 12:39:54 GMT 2011
 */
(function (gU, gaq) {
  gU && gU.ok(function (links, i, len, a, href) {
    links = gU.tag('a')
    for (i = 0, len = links.length; i < len; i++) {
      a = links[i]
      href = a.getAttribute('href')
      if (/(ticketsales|ebay|amazon)/.test(href)) {
        _gaq.push(['_trackPageview'], '/_inline/' + href)
        gU.on(a, 'click', function (e) {
          _gaq.push(['_trackEvent', 'offsite link', a.innerHTML, href])
        })
      }
    };
  })
})(window.gU, window._gaq)
