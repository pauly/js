(function (window, document) {
  'use strict'
  var _createElement = document.createElement.bind(document)
  var className = 'className'
  var gU = window.gU
  var _html = gU.html
  var h6 = gU.tag('h6')
  var h6Index
  var regex

  function _appendChild (element, child) {
    element.appendChild(child)
  }

  function _addRating (event, target, url, wrapper) {
    target = event.target || event.srcElement
    wrapper = target.wrapper
    if (/☆/.test(target[className])) {
      event.preventDefault()
      gU.get(target.href, function () {
        // briefly display "event 10" or whatever
        wrapper[className] = wrapper[className].replace(' ☆', '')
        _html(wrapper, target.table + ' ' + target.score)
        // then after nearly a second, display the stars again
        setTimeout(function () {
          _stars(wrapper, target.table, target.key, target.score)
        }, 900)
      })
    }
  }

  // return some ☆ ratings
  function _stars (wrapper, table, id, score, index) {
    score = Math.floor(score)
    wrapper[className] += ' ☆'
    _html(wrapper, '')
    for (index = 1; index < 11; index++) {
      var a = _createElement('a')
      a.key = id
      a[className] = '☆' + index
      if (score === index) a[className] += ' lit lit' + index
      a.href = '/a?t=' + table + '&m=ok&key=' + id + '&s=' + index
      a.score = index
      a.wrapper = wrapper
      a.table = table
      _appendChild(wrapper, a)
    }
  }

  // don't need gU.ok here as we're at the bottom of the page
  for (h6Index in h6) {
    regex = /rate:([a-x]+):([0-9]+)(:([0-9]+))*/i.exec(h6[h6Index][className])
    // table = regex[1],
    // id = regex[2],
    // score = regex[4],
    // wrapper = h6[h6Index];
    if (regex) _stars(h6[h6Index], regex[1], regex[2], regex[4])
  }

  gU.on(document, 'click', _addRating)
})(window, document)
