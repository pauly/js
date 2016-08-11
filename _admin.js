(function (window, document, gU, sweetTitles, value, space, createElement, parentNode, appendChild, insertBefore, getAttribute, description) {
  'use strict';
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
  var inputs = gU.byTag('input'), list, input, table, i, mText, mCategory, tagDiv;
  for (i = inputs.length - 1; i >= 0; --i) {
    input = inputs[i];
    table = input[getAttribute]('rel');
    if (!table) continue;
    gU.on(input, 'keyup', function(e, v, self, parent) {
      self = this;
      v = this.value;
      if (v.length < 3) return;
      table = this[getAttribute]('rel');
      if (!list) {
        list = document[createElement]('ul');
        list.className = 'popup';
        // list.id = 'popup' + table;
        parent = self[parentNode];
        // parent[appendChild](list);
        parent[insertBefore](list, self);
        parent[insertBefore](self, list); // swap
      }
      gU.getJSON('/j/' + table + '?v=' + v, function(js, item, li, a, title) {
        // if (!js) return;
        gU.html(list, '');
        for (i = 0; i < js.length; i ++) {
          item = js[i];
          li = document[createElement]('li');
          a = document[createElement]('a');
          a.id = item.guid;
          a.title = item[description];
          // if (item.category) a.className = item.category.join(space);
          title = item.title;
          if (item[description]) title += ' <i>' + ('' + item[description]).substr(0, 100) + '</i>';
          gU.html(a, title);
          list[appendChild](li);
          li[appendChild](a);
          gU.on(a, 'click', function() {
            self.value = this.id;
            gU.html(list, '');
          });
        }
        self.focus();
        if (sweetTitles) sweetTitles.init();
      });
    });
  };
  mCategory = gU.byId('mCategory');
  if (mCategory) {
    tagDiv = document[createElement]('div');
    mCategory[parentNode][insertBefore](tagDiv, mCategory);
    mCategory[parentNode][insertBefore](mCategory, tagDiv); // swap them
    gU.on(mCategory, 'keyup', function() {
      var val = mCategory[value];
      if (!val) return;
      var tags = val.split(space);
      for (var i in tags) {
        tags[i] = '<a target="#" rel="tag" class="' + tags[i] + '" href="/' + tags[i] + '">' + tags[i].replace(/\+/g, space) + '</' + 'a>';
      }
      gU.html(tagDiv, tags.join(space));
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
  /* $('input.ajaxPopUp').each(function () {
    var name = $(this).attr('name');
    $(this).attr('name', '_' + name).after('<input type="hidden" id="_hidden_' + name + '" name="' + name + '" value="' + $(this).val() + '" />').autocomplete('/php/xml.php?mode=pipe&table=' + $(this).attr('rel')).result(function (e, item) {
      $(':input#' + name).val(item[0].replace(/\s*\(.+\)/g, '').replace(/\s*<\/?[^>]+(>|$)/g, ''));
      $(':input#_hidden_' + name).val(item[1]);
    });
  }); */
})(window, document, window.gU, window.sweetTitles, 'value', ' ', 'createElement', 'parentNode', 'appendChild', 'insertBefore', 'getAttribute', 'description');
