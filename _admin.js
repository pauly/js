(function (window, document, value, length, space, parentNode, insertBefore, description, gU) {
  'use strict';
  gU = window.gU;
  if (!gU) return;

  var inputs = gU.tag('input'),
    _setInnerHTML = gU.html,
    _createElement = document.createElement.bind(document),
    input,
    table,
    i,
    mText,
    mCategory,
    tagDiv,
    includes;

  function buildList(list, js, input, item, listItem, link, index) {
    input = this; // this way minifies better than binding
    _setInnerHTML(list, '');
    for (index = 0; index < js[length]; index++) {
      item = js[index];
      listItem = _createElement('li');
      link = _createElement('a');
      link.id = item.guid;
      link.title = item[description] || '';
      // if (item.category) link.className = item.category.join(space);
      _setInnerHTML(link, item.title);
      gU.aC(listItem, link); // append child, add link to listItem
      gU.aC(list, listItem); // append child, add listItem to list
      gU.on(link, 'click', function() {
        input[value] = this.id;
        _setInnerHTML(list, '');
        list = 0;
      });
    }
    input.focus();
  }

  function autocomplete(table, list, v) {
    v = this[value];
    if (v[length] > 2) {
      gU.json('/j/' + table + '?v=' + v, buildList.bind(this, list));
    }
  }

  function insertAfter(newElement, targetElement) {
    targetElement[parentNode][insertBefore](newElement, targetElement);
    targetElement[parentNode][insertBefore](targetElement, newElement); // swap them
  }

  gU.debug && gU.debug('todo delegation of autocompletes?');
  for (i = inputs[length] - 1; i >= 0; --i) {
    input = inputs[i];
    if (table = input.getAttribute('rel')) { // not good practice but better minifying
      var list = _createElement('ul');
      insertAfter(list, input);
      list.className = 'popup';
      gU.on(input, 'keyup', autocomplete.bind(input, table, list)); // todo delegation!
    }
    // @todo rewrite maxlength not using jquery?
    /* if (/length(\d+)/.test($(this).attr('class'))) {
        var len = RegExp.$1;
        var showCharCount = function() {
          var l = $(this).val()[length];
          var r = len - l;
          var c = '#' + r.toString(16) + r.toString(16) + r.toString(16);
          c = r < 1 || c[length] < 7 ? '#f00' : c;
          if (l >= len) {
            $(this).addClass('error').next('.kC').css({ color: c }).html(r + ' - max length is ' + len + '!');
          }
          else {
            $(this).removeClass('error').next('.kC').css({ color: c }).html(r + ' chars remaining');
          }
          return false;
        };
        $(this).after('<abbr title="Chars remaining" class="kC">' + len + '</abbr>')
          .bind('keyup change', showCharCount).each(showCharCount);
      } */
  }
  if (mCategory = gU.id('mCategory')) { // not good practice but better minifying
    tagDiv = _createElement('div');
    insertAfter(tagDiv, mCategory);
    gU.on(mCategory, 'keyup', function() {
      var val = mCategory[value];
      if (val) {
        var tags = val.split(space);
        for (var i in tags) {
          tags[i] = '<a href="#" rel="tag" class="' + tags[i] + '" href="/' + tags[i] + '">' + tags[i].replace(/\+/g, space) + '</' + 'a>';
        }
        _setInnerHTML(tagDiv, tags.join(space));
      }
    });
  }
  // if (gU.id('latitude') && gU.id('longitude')) {
  //  gU.id('latitude').parent().append('<div id="gmapWrapper"><div id="inlineMap" class="map">Initialising map...</div></div>');
  //  window.myGmap && myGmap.init(gU.id('inlineMap'), gU.id('latitude')[value], gU.id('longitude')[value]);
  // }
  // $('input[name=venueAddress]').change(function () {
  //  $('input[name=latitude],input[name=longitude]').val('');
  // });
  if (mText = gU.id('mText')) { // not good practice but better minifying
    mText.focus();
    // moves cursor to bottom
    var val = mText[value];
    mText[value] = '';
    mText[value] = val;
    if (includes = gU.id('includes')) { // not good practice but better minifying
      gU.on(includes, 'click', function(element, target) {
        target = element.target;
        if (target.nodeName == 'A') {
          mText[value] += '\n' + target.rel;
        }
        element.preventDefault();
      });
    }
  }
})(window, document, 'value', 'length', ' ', 'parentNode', 'insertBefore', 'description');
