/**
 * Cycle through my pics, now on picasaweb!
 * Replaces http://clarkeology.com/js/flickr.js
 * See http://www.clarkeology.com/m/14086/Moving+all+my+online+photos+to+PicasaWeb
 * requires my gbbsUpdater library, now I've got rid of jquery
 */
!function(gU, document, getElementsByClassName, length) {
  'use strict';
  if (!gU) return; 

  function getTagsFrom(div, tags, links, i) {
    tags = [ ];
    if (div) {
      links = div[getElementsByClassName]('tag');
      if (!links) return tags;
      for (i = 0, l = links[length]; i < l; i ++) {
        tags.push(links[i].innerHTML.replace(/\W/g, ''));
      }
    }
    return tags;
  }
  function getTagsFromMetaKeywords(keywords, content) {
    keywords = document.getElementsByName('Keywords');
    if (!keywords) return [ ];
    if (!keywords[length]) return [ ];
    content = keywords[0].getAttribute('content');
    if (!content) return [ ];
    return content.replace(/\s|folkestone,/g, '').split(',');
  };
  gU.ok(function (tags, placeHolders, placeHolder, i, context, reasonsToQuit, url) {
    tags = getTagsFrom(gU.id('footerTags'));
    if (!tags[length]) tags = getTagsFrom(document.body);
    if (!tags[length]) tags = getTagsFromMetaKeywords();
    if (!tags[length]) return;
    tags = tags.slice(0, 4);
    placeHolders = document[getElementsByClassName]('photos');
    if (!placeHolders) return;
    placeHolder = placeHolders[0];
    for (i = 1, l = placeHolders[length]; i < l; i ++) {
      if (placeHolders[i]) placeHolders[i].parentNode.removeChild(placeHolders[i]);
    }
    if (!placeHolder) return;
    context = placeHolder;
    gU.html(placeHolder, '');
    while (context = context.parentNode) {
      if (context.className.indexOf('gbbs') !== -1) break;
    }
    if (!context) return;
    reasonsToQuit = ['img', 'iframe'];
    for (i = 0; i < reasonsToQuit[length]; i ++) { 
      var elements = gU.tag(reasonsToQuit[i], context);
      if (elements && elements[length]) return;
    }
    url = 'https://picasaweb.google.com/data/feed/base/user/paulypopex?kind=photo';
    /* var link = gU.tag('link');
    for (var i in link) {
      if (link[i].getAttribute('rel') === 'picasa') {
        url = link[i].getAttribute('url');
        break;
      }
    } */
    url += '&alt=json&q=' + tags.join('+OR+');
    gU.json(url, function (js) {
      if (!(js && js.feed && js.feed.entry && js.feed.entry[length])) return;
      var id = 'photoContent';
      gU.html(placeHolder, '<h2><abbr title="' + tags.join(' + ') + '">Some pictures</abbr></h2><div id="' + id + '"></div>');
      placeHolder.className += ' show';
      function callback(div, secondsToRefresh, counter, images, callback) {
        if (counter >= images[length]) counter = 0;
        var html = images[counter].summary.$t.replace(/&lt;/gi, '<')
          .replace(/&gt;/gi, '>')
          .replace(/&quot;/gi, '"')
          .replace('<td valign="top">', '<td valign="top"><i>' + images[counter].gphoto$snippet.$t + '</i><br />')
          .replace('td><td', 'td></tr><tr><td');
        gU.html(div, html);
        /* div.parents().each(function () {
          var h = div.height();
          var parent = $(this);
          if (parent.height() < h) {
            parent.animate({ height: h }, 1000);
          }
        }); */
        window.setTimeout(function () {
          callback(div, secondsToRefresh, counter + 1, images, callback);
        }, secondsToRefresh * 1000);
      };
      return callback(gU.id(id), 10, 0, js.feed.entry, callback);
    });
  });
}(window.gU, document, 'getElementsByClassName', 'length');
