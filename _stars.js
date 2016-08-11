'use strict';
(function(window, document) {
  var _createElement = document.createElement.bind(document),
    className = 'className',
    gU = window.gU,
    _html = gU.html;

  function _appendChild(element, child) {
    element.appendChild(child);
  }

  function _addRating(table, id, score, url, caller) {
    url = '/a?t=' +
      table + '&m=ok&key=' + id +
      '&s=' + score;
    caller = gU.byId('rate-' + table + '-' + id);
    gU.get(url, function() {
      _html(caller, table + ' ' + score);
      setTimeout(function() {
        _html(caller, _stars(table, id, score));
      }, 900);
    });
    return false;
  }

  // return some star ratings
  function _stars(table, id, score, stars, index) {
    score = Math.floor(score);
    stars = _createElement('ol');
    stars[className] = 'stars';
    for (index = 1; index < 11; index++) {
      var li = _createElement('li'),
        a = _createElement('a');
      a[className] = 'star' + index;
      if (score === index) a[className] += ' lit lit' + index;
      a.score = index;
      gU.on(a, 'click', function(e) {
        e.preventDefault();
        return _addRating(table, id, this.score);
      });
      _appendChild(li, a);
      _appendChild(stars, li);
    }
    return stars;
  }

  function _initialise() {
    var index,
      h6 = gU.byTag('h6'),
      regex;
    for (index in h6) {
      regex = /rate:([a-x]+):([0-9]+)(:([0-9]+))*/i.exec(h6[index][className]);
      if (regex) {
        var table = regex[1],
          id = regex[2],
          score = regex[4];
        h6[index].id = 'rate-' + table + '-' + id;
        _html(h6[index], _stars(table, id, score));
      }
    }
  }

  gU.ok(_initialise);

})(window, document);
