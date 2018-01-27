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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, document) {
  'use strict';

  var _createElement = document.createElement.bind(document);
  var className = 'className';
  var gU = window.gU;
  var _html = gU.html;
  var h6 = gU.tag('h6');
  var h6Index;
  var regex;

  function _appendChild(element, child) {
    element.appendChild(child);
  }

  function _addRating(event, target, url, wrapper) {
    target = event.target || event.srcElement;
    wrapper = target.wrapper;
    if (/☆/.test(target[className])) {
      event.preventDefault();
      gU.get(target.href, function () {
        // briefly display "event 10" or whatever
        wrapper[className] = wrapper[className].replace(' ☆', '');
        _html(wrapper, target.table + ' ' + target.score);
        // then after nearly a second, display the stars again
        setTimeout(function () {
          _stars(wrapper, target.table, target.key, target.score);
        }, 900);
      });
    }
  }

  // return some ☆ ratings
  function _stars(wrapper, table, id, score, index) {
    score = Math.floor(score);
    wrapper[className] += ' ☆';
    _html(wrapper, '');
    for (index = 1; index < 11; index++) {
      var a = _createElement('a');
      a.key = id;
      a[className] = '☆' + index;
      if (score === index) a[className] += ' lit lit' + index;
      a.href = '/a?t=' + table + '&m=ok&key=' + id + '&s=' + index;
      a.score = index;
      a.wrapper = wrapper;
      a.table = table;
      _appendChild(wrapper, a);
    }
  }

  // don't need gU.ok here as we're at the bottom of the page
  for (h6Index in h6) {
    regex = /rate:([a-x]+):([0-9]+)(:([0-9]+))*/i.exec(h6[h6Index][className]);
    // table = regex[1],
    // id = regex[2],
    // score = regex[4],
    // wrapper = h6[h6Index];
    if (regex) _stars(h6[h6Index], regex[1], regex[2], regex[4]);
  }

  gU.on(document, 'click', _addRating);
})(window, document);

/***/ })

/******/ });