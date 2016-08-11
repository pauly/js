(function(gU) {
  'use strict';
  gU && gU.ok(function(links, rel, i, a, size, regex) {
    links = gU.byTag('a');
    for (i = links.length - 1; i >= 0; i--) {
      a = links[i], rel = a.rel;
      if (regex = /^tag ([0-9]+)/.exec(rel)) {
        size = regex[1]/1;
        a.style['font-size'] = size + 'px'; //  opacity: ' + ((50 + size) / 100);
      }
    }
  });
})(window.gU);
