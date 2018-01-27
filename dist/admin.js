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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, document, value, length, space, parentNode, insertBefore, description, gU) {
  'use strict';

  gU = window.gU;
  if (!gU) return;

  var inputs = gU.tag('input');
  var _setInnerHTML = gU.html;
  var _createElement = document.createElement.bind(document);
  var input;
  var table;
  var i;
  var mText;
  var mCategory;
  var tagDiv;
  var includes;

  function buildList(list, js, self, item, listItem, link, index) {
    self = this; // this way minifies better than binding
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
    }
    gU.on(list, 'click', function (event, element) {
      element = event.target;
      if (element.nodeName === 'A') {
        self[value] = element.id;
        _setInnerHTML(list, '');
        list = 0;
      }
    });
    self.focus();
  }

  function autocomplete(dbTable, list, v) {
    v = this[value];
    if (v[length] > 2) {
      gU.json('/j/' + dbTable + '?v=' + v, buildList.bind(this, list));
    }
  }

  function insertAfter(newElement, targetElement) {
    targetElement[parentNode][insertBefore](newElement, targetElement);
    targetElement[parentNode][insertBefore](targetElement, newElement); // swap them
  }

  for (i = inputs[length] - 1; i >= 0; --i) {
    input = inputs[i];
    table = input.getAttribute('rel');
    if (table) {
      var list = _createElement('ul');
      insertAfter(list, input);
      list.className = 'popup';
      gU.on(input, 'keyup', autocomplete.bind(input, table, list)); // todo delegation!
    }
  }

  // no need for this at the moment, maybe add it as an extra lib if I do need it
  /* gU.on(document, 'keyup', function(event, element, regex, remaining, colour) {
    element = event.target;
    if (element.nodeName == 'INPUT') {
      if (!element._counter) {
        element._counter = _createElement('a');
        element._counter.title = 'Chars remaining';
        insertAfter(element, element._counter);
      }
      if (regex = /length(\d+)/.exec(element.className)) {
        remaining = regex[1] - element.value[length];
        gU.html(element._counter, remaining);
        colour = '#' + r.toString(16) + r.toString(16) + r.toString(16);
        if (remaining < 1 || colour[length] < 7) colour = '#f00';
        element._counter.style.color = colour;
      }
    }
  }); */
  mCategory = gU.id('mCategory');
  if (mCategory) {
    tagDiv = _createElement('div');
    insertAfter(tagDiv, mCategory);
    gU.on(mCategory, 'keyup', function () {
      var val = mCategory[value];
      if (val) {
        var tags = val.split(space);
        for (var tagIndex in tags) {
          tags[tagIndex] = '<a href="#" rel="tag" class="' + tags[tagIndex] + '" href="/' + tags[tagIndex] + '">' + tags[tagIndex].replace(/\+/g, space) + '</' + 'a>';
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
  mText = gU.id('mText');
  if (mText) {
    mText.focus();
    // moves cursor to bottom
    var val = mText[value];
    mText[value] = '';
    mText[value] = val;
    includes = gU.id('includes');
    if (includes) {
      gU.on(includes, 'click', function (element, target) {
        target = element.target;
        if (target.nodeName === 'A') {
          mText[value] += '\n' + target.rel;
        }
        element.preventDefault();
      });
    }
  }
})(window, document, 'value', 'length', ' ', 'parentNode', 'insertBefore', 'description');

/***/ })
/******/ ]);