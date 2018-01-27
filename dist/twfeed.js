/*! js v1.1.0 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * twitter fetching and processing js for search or regular api json
 *
 * @author js+twitter+paulypopex@gmail.com
 * @date 27/02/09
 * @requires jquery1.2
 * @usage <script type="text/javascript" src="http://www.popex.ukshells.co.uk/twfeed.js"></script>
 * @usage + <ul class="tw"></ul>
 * @usage + <link rel="tw" href="http://search.twitter.com/search.json?q=@popbitch+OR+%23popbitch" />
 * @usage + optionally <a class="twreply" href="/reply">reply</a>
 */
var tw = {
  ul: 'ul.tw:last',
  r: 30,
  // d: function ( m ) { window.console && console.log( m ) },
  q: function q(u) {
    return u.indexOf('?') == -1 ? '?' : '&';
  },
  u: function u(n, na) {
    n = n.substring(1);return '<a href="http://twitter.com/' + n + '">' + (na ? '' : '@') + n + '</a>';
  },
  s: function s(w) {
    w = w.substring(1);return '<a href="http://search.twitter.com/search?q=%23' + w + '"><u>' + w + '</u></a>';
  },
  p: function p(t) {
    return t.replace(/((https?)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (F) {
      return '<a href="' + F + '">' + F + '</a>';
    }).replace(/\B@\w+/g, tw.u).replace(/\B\#[\w:]+/g, tw.s);
  }, /* from twitter's blogger.js */
  filter: function filter(m) {
    return $(tw.ul + ' #' + m.id).length;
  },
  li: function li(m, r) {
    return '<li class="tw" id="' + m.id + '">' + tw.p(m.text) + ' <i>' + tw.u('@' + (m.from_user || m.user.screenname), 1) + '</i>' + (r ? ' <a href="' + r + tw.q(r) + 'tw=' + m.id + '">reply</a>' : '') + '</li>';
  },
  get: function get(a) {
    $(tw.ul).addClass('loading');
    var u = $('[rel=tw]').attr('href') || 'http://search.twitter.com/search.json?q=%23twitter';
    // tw.d(u);
    u += tw.q(u);
    u += 'callback=?';
    $.getJSON(u, function (js) {
      tw.go(js, a);
    });
  },
  go: function go(js, a) {
    var ul = $(tw.ul);
    // $(ul).length || tw.d('ul.tw missing');
    var r = $('a.twreply').attr('href');
    js = js.results || js;
    for (var i = 0; i < js.length; i++) {
      if (!tw.filter(js[i])) {
        var li = tw.li(js[i], r);
        a ? ul.append(li) : $(li).hide().prependTo(ul).slideDown('slow');
      }
    }
    ul.removeClass('loading');
    setTimeout(tw.get, tw.r * 1000);
  }
};
window.$ && $(function () {
  tw.get(true);
});

/***/ })

/******/ });