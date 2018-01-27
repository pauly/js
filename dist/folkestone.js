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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global XMLHttpRequest */
(function (window, document, gU) {
  'use strict';

  gU = window.gU;
  if (!gU) return;
  var index;
  var links = gU.tag('a');
  var addressNode = gU.tag('addr')[0];
  var address = addressNode.innerHTML.split(',')[0];
  var link;
  var name;
  var domain = 'ratings.food.gov.uk';
  var insertBefore = 'insertBefore';
  var parentNode = 'parentNode';

  for (index = links.length - 1; index >= 0; --index) {
    link = links[index];
    if (link.getAttribute('itemprop')) name = link.innerHTML;
  }
  name = ('' + name).replace(/'/, '');
  if (!address) return;

  function get(url, callback, request) {
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader('accept', 'text/json');
    request.setRequestHeader('x-api-version', 2);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status == 200) callback(request.responseText); // eslint-disable-line eqeqeq
    };
    request.send();
  }

  function insertAfter(newElement, targetElement) {
    targetElement[parentNode][insertBefore](newElement, targetElement);
    targetElement[parentNode][insertBefore](targetElement, newElement); // swap them
  }

  function success(data) {
    data = JSON.parse(data);
    if (!data || !data.establishments) {
      // gU.debug('success, but got', data);
      return;
    }
    var venue = data.establishments[0];
    if (!venue) return;
    var img = '<img src="/img/fsa/' + ('' + venue.RatingKey).toLowerCase() + '.jpg" />';
    img += '<br />' + [venue.AddressLine1, venue.AddressLine2, venue.AddressLine3,
    // venue.RightToReply,
    venue.RatingDate].join(', ');
    var anchor = gU.cE('a'); // createElement
    anchor.href = domain;
    gU.html(anchor, img);
    var wrapper = gU.cE('p'); // createElement
    gU.html(wrapper, anchor);
    insertAfter(wrapper, addressNode);
  }

  get('http://api.' + domain + '/Establishments?name=' + name + '&address=' + address, success);
})(window, document);

/***/ })

/******/ });