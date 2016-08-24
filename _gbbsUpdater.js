'use strict';
/**
 * Microlibrary, to do everything I was using jquery for
 * Also run through my own forum / blog, looking for things to change
 * based on cookies etc
 * gU = gbbsUpdater
 * gbbs was "grate bulletin board system" back in the day
 * 
 * @author  Paul Clarke <paulypopex+php@gmail.com>
 */
var gU = (function(window, document) {

  // shortcuts for better compression
  // this script makes a lot of use of document.foo === document['foo']
  // document.fooBar can only be compressed to a.fooBar but 
  // document['fooBar'] can be compressed to a[b] - shorter, see
  var className = 'className',
    _createElement = document.createElement.bind(document),
    addEventListener = 'addEventListener',
    attachEvent = 'attachEvent',
    removeChild = 'removeChild',
    innerHTML = 'innerHTML',
    length = 'length',
    message = 'message',
    remove = 'remove',
    edit = 'edit',
    replace = 'replace',
    value = 'value',
    adminLevel = {
      pauly: 10
    },
    security = {};
  security[edit] = 3;
  // security[remove] = 3;

  function _appendChild(element, child) {
    element.appendChild(child);
  }

  // To read a cookie, given the name. adapted from jquery.cookie
  // function _cookie(name, index, cookie, cookies) {
  //   cookies = document.cookie.split(/; */);
  //   for (index = cookies[length]; index >= 0; --index) {
  //     cookie = ('' + cookies[index])[replace](/^ /g, '');
  //     if (cookie.substr(0, name[length] + 1) == (name + '=')) {
  //       return decodeURIComponent(cookie.substr(name[length] + 1));
  //     }
  //   }
  // }

  // return a list item for the admin options
  function _adminLink(href, table, id, callback, anchor) {
    anchor = _createElement('a');
    if (id) anchor.id = table + id;
    // href will always be appended with id
    anchor.href = href + id;
    _setInnerHTML(anchor, table);
    if (callback) gU.on(anchor, 'click', callback);
    return anchor;
  }

  function _setInnerHTML(element, content) { // like $.html
    if (element) {
      if (typeof content === 'string') {
        element[innerHTML] = content;
        return;
      }
      while (element.lastChild) {
        element[removeChild](element.lastChild);
      }
      _appendChild(element, content);
    }
  }

  function _getElementsByTagName(id, context) {
    return (context || document).getElementsByTagName(id);
  };

  var gU = {
    on: function(element, event, callback) { // like $.on
      if (element[addEventListener]) return element[addEventListener](event, callback, false);
      if (element[attachEvent]) return element[attachEvent]('on' + event, callback);
      // if we have no events just do it now?
    },
    /* debug: function() {
      var console = window.console;
      console && console.log.apply(console, arguments);
    }, */
    id: document.getElementById.bind(document),
    tag: _getElementsByTagName,
    get: function(url, callback, request) { // like $.get
      // don't support ie6
      request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) callback(request.responseText);
      };
      request.send();
    },
    json: function(url, callback, tag, scriptName) { // like $.getJSON
      scriptName = '_cb' + (new Date()).getTime(),
        tag = _createElement('script');
      tag.src = url[replace](/(\?|$)/, '?callback=' + scriptName + '&');
      _appendChild(document.body, tag);
      window[scriptName] = function(data) {
        callback(data);
        delete window[scriptName];
        document.body[removeChild](tag);
      };
    },
    aC: _appendChild,
    cE: _createElement,
    html: _setInnerHTML
  };

  function _initialise() {
    // if (!document.getElementById) return; // unlikely
    var index,
      tags = _getElementsByTagName('b'),
      links = _getElementsByTagName('a'),
      anchor,
      href,
      regex,
      user;

    if (regex = /lN=(\w+)/.exec(document.cookie)) {
      user = regex[1];
    }

    for (index = tags[length] - 1; index >= 0; --index) {
      var tag = tags[index],
        tagText = tag[innerHTML],
        parent = tag.parentNode,
        a = _createElement('a');
      a.title = 'Search for ' + tagText;
      a.href = '/wiki/' + tagText.toLowerCase()[replace](/&\w+?;/, '')[replace](/\W+/g, '+');
      a[className] = tagText;
      _setInnerHTML(a, tagText);
      parent.insertBefore(a, tag);
      parent[removeChild](tag);
    }

    for (index = links[length] - 1; index >= 0; --index) {
      anchor = links[index],
        href = anchor.href;

      // external links
      if (('' + href).indexOf(location.host) === -1) {
        anchor[className] += ' external';
        anchor.rel += ' noopener';
      }

      if (regex = /\/r\/(\d+)\/(\d+)#(\w*)/.exec(href)) {
        var board = regex[1],
          id = regex[2],
          div = anchor.parentElement,
          punter = regex[3];
        _appendChild(div, _adminLink('/tweet/' + message.charAt(0), 'tweet', id));
        if (user == punter || adminLevel[user] >= security[edit]) {
          // was used on popbitch
          // _appendChild(div, _adminLink('/a?m=' + edit + '&b=' + board + '&confirm=1&key='', 'rebuild', id));
          _appendChild(div, _adminLink('/a?m=' + remove + '&b=' + board + '&key=', remove, id));
          _appendChild(div, _adminLink('/a?m=' + edit + '&b=' + board + '&key=', edit, id));
        }
        _appendChild(div, anchor);
      }
    }
  }
  gU.ok = gU.on.bind(gU, window, 'load');
  gU.ok(_initialise);
  return gU;
})(window, document);
