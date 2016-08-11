(function (window, document, value, length, space, parentNode, insertBefore, description, gU, sweetTitles) {
  'use strict';
  gU = window.gU;
  if (!gU) return;
  /* $(':input:enabled.[class*=maxlen]').each(function() {
    if (/length(\d+)/.test($(this).attr('class'))) {
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
      $(this).after('<abbr title="Chars remaining" class="kC">' + len + '</abbr>').bind('keyup change', showCharCount).each(showCharCount);
    }
  }); */

  function buildList(list, js, input, item, listItem, link, index) {
    input = this; // this way minifies better than binding
    gU.html(list, '');
    for (index = 0; index < js[length]; index++) {
      item = js[index];
      listItem = _createElement('li');
      link = _createElement('a');
      link.id = item.guid;
      link.title = item[description] || '';
      // if (item.category) link.className = item.category.join(space);
      gU.html(link, item.title);
      gU.aC(listItem, link); // add link to listItem
      gU.aC(list, listItem); // add listItem to list
      gU.on(link, 'click', function() {
        input.value = this.id;
        gU.html(list, '');
        list = 0;
      });
    }
    input.focus();
    sweetTitles = window.sweetTitles;
    sweetTitles && sweetTitles();
  }

  function autocomplete(table, list, v) {
    v = this.value;
    if (v[length] > 2) {
      gU.getJSON('/j/' + table + '?v=' + v, buildList.bind(this, list));
    }
  }

  var inputs = gU.byTag('input'),
    _createElement = document.createElement.bind(document),
    input, table, i, mText, mCategory, tagDiv;
  for (i = inputs[length] - 1; i >= 0; --i) {
    input = inputs[i];
    table = input.getAttribute('rel');
    if (table) {
      var list = _createElement('ul');
      list.className = 'popup';
      parent = input[parentNode];
      parent[insertBefore](list, input);
      parent[insertBefore](input, list); // swap
      gU.on(input, 'keyup', autocomplete.bind(input, table, list));
    }
  };
  mCategory = gU.byId('mCategory');
  if (mCategory) {
    tagDiv = _createElement('div');
    mCategory[parentNode][insertBefore](tagDiv, mCategory);
    mCategory[parentNode][insertBefore](mCategory, tagDiv); // swap them
    gU.on(mCategory, 'keyup', function() {
      var val = mCategory[value];
      if (val) {
        var tags = val.split(space);
        for (var i in tags) {
          tags[i] = '<a href="#" rel="tag" class="' + tags[i] + '" href="/' + tags[i] + '">' + tags[i].replace(/\+/g, space) + '</' + 'a>';
        }
        gU.html(tagDiv, tags.join(space));
      }
    });
  }
  /* 
  $('input[name=venueAddress]').change(function () {
    $('input[name=latitude],input[name=longitude]').val('');
  }); */
  mText = gU.byId('mText');
  if (mText) {
    mText.focus();
    // moves cursor to bottom
    var val = mText[value];
    mText[value] = '';
    mText[value] = val;
  }
})(window, document, 'value', 'length', ' ', 'parentNode', 'insertBefore', 'description');
