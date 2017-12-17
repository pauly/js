(function (gU) {
  gU && gU.ok(function (links, i, a, regex) {
    links = gU.tag('a')
    for (i = links.length - 1; i >= 0; i--) {
      a = links[i]
      regex = /^tag ([0-9]+)/.exec(a.rel)
      if (regex) {
        a.style['font-size'] = regex[1] / 1 + 'px' //  opacity: ' + ((50 + regex[1]/1) / 100);
      }
    }
  })
})(window.gU)
