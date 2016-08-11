'use strict';
(function(window, document) {
  var _createElement = document.createElement.bind(document),
    className = 'className',
    gU = window.gU,
    _html = gU.html;

  function _appendChild(element, child) {
    element.appendChild(child);
  }

  function _addRating(table, id, score, url, wrapper) {
    wrapper = this; // because we did _addRating.bind(wrapper)
    url = '/a?t=' + table + '&m=ok&key=' + id + '&s=' + score;
    gU.get(url, function() {
      // briefly display "event 10" or whatever
      _html(wrapper, table + ' ' + score);
      // then after nearly a second, display the stars again
      setTimeout(function() {
        _html(wrapper, _stars(wrapper, table, id, score));
      }, 900);
    });
    return false;
  }

  // return some star ratings
  function _stars(wrapper, table, id, score, stars, index) {
    score = Math.floor(score);
    stars = _createElement('ol');
    stars[className] = 'stars';
    for (index = 1; index < 11; index++) {
      var li = _createElement('li'),
        a = _createElement('a');
      a[className] = 'star' + index;
      if (score === index) a[className] += ' lit lit' + index;
      gU.on(a, 'click', _addRating.bind(wrapper, table, id, index));
      _appendChild(li, a);
      _appendChild(stars, li);
    }
    return stars;
  }

  gU.ok(function() {
    var index,
      h6 = gU.byTag('h6'),
      regex;
    for (index in h6) {
      regex = /rate:([a-x]+):([0-9]+)(:([0-9]+))*/i.exec(h6[index][className]);
      // table = regex[1],
      // id = regex[2],
      // score = regex[4],
      // wrapper = h6[index];
      regex && _html(h6[index], _stars(h6[index], regex[1], regex[2], regex[4]));
    }
  });

})(window, document);
