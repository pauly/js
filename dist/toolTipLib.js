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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*  Sweet Titles (c) Creative Commons 2005
  http://creativecommons.org/licenses/by-sa/2.5/
  Author: Dustin Diaz | http://www.dustindiaz.com
  rewritten by pauly
  requires http://www.clarkeology.com/js/gbbsUpdater.js
*/
(function (window, document, setTimeout, clearTimeout, parseInt, documentElement, body, gU, tip, tipTimeout, opacityTimeout, xCoord, yCoord) {
  gU = window.gU;
  if (!gU) return;

  function tippableElement(element) {
    return element && element.nodeName === 'A';
    // I'm only allowing anchors to have tooltips on, but if we wanted more:
    //  var tippableElements = ['A'], index;
    //  if (element) {
    //    for (index = tippableElements.length; index > 0; index--) {
    //      if (tippableElements[index - 1] === element.nodeName) return true;
    //    }
    //  }
  }

  function tipShow() {
    var scrX = parseInt(xCoord, 10);
    var scrY = parseInt(yCoord, 10);
    var top = scrY + 10;
    var left = scrX + 10;
    gU.html(tip, this.getAttribute('tip')); // because we bound tipShow to the element

    if (parseInt(document[documentElement].clientWidth + document[documentElement].scrollLeft) < parseInt(tip.offsetWidth + left)) {
      left = parseInt(left - (tip.offsetWidth + 25));
    }
    tip.style.left = left + 'px';
    if (parseInt(document[documentElement].clientHeight + document[documentElement].scrollTop) < parseInt(tip.offsetHeight + top)) {
      top = parseInt(top - (tip.offsetHeight + 25));
    }
    tip.style.top = top + 'px';
    tip.style.visibility = 'visible';
    tip.style.opacity = '.1';
    tipFade(10);
  }

  function tipFade(originalOpacity, newOpacity) {
    newOpacity = originalOpacity + 10;
    if (newOpacity < 80) {
      tip.style.opacity = '.' + newOpacity;
      opacityTimeout = setTimeout(function () {
        tipFade(newOpacity);
      }, 20);
      return;
    }
    tip.style.opacity = '.80';
  }

  function updateXY(event) {
    if (document.captureEvents) {
      xCoord = event.pageX;
      yCoord = event.pageY;
      return;
    }
    if (window.event.clientX) {
      xCoord = event.clientX + (document[documentElement].scrollLeft || document[body].scrollLeft);
      yCoord = event.clientY + (document[documentElement].scrollTop || document[body].scrollTop);
    }
  }

  // gU.ok(function() { // can launch asap because of event delegation
  if ((window.innerWidth || document[body].clientWidth) < 800) return;
  tip = gU.cE('div'); // createElement
  tip.id = 'toolTip';
  gU.aC(gU.tag(body)[0], tip); // appendChild
  tip.style.position = 'absolute'; // essential css to make this work
  tip.style.visibility = 'hidden'; // other styling is in external css
  gU.on(document, 'mousemove', updateXY);
  gU.on(document, 'mouseover', function (event, element, title) {
    element = event.target;
    // event delegation, only apply to the elements in tipElements, so <a>
    if (tippableElement(element)) {
      title = element.getAttribute('title');
      if (title) {
        element.setAttribute('tip', title);
        element.removeAttribute('title');
      }
      if (element.getAttribute('tip')) {
        tipTimeout = setTimeout(tipShow.bind(element), 50);
        updateXY(event);
      }
    }
  });
  gU.on(document, 'mouseout', function (event) {
    // event delegation, only apply to the elements in tipElements, so <a>
    if (tippableElement(event.target)) {
      clearTimeout(tipTimeout);
      clearTimeout(opacityTimeout);
      tip.style.visibility = 'hidden';
    }
  });
  // });
})(window, document, setTimeout, clearTimeout, parseInt, 'documentElement', 'body');

/***/ })

/******/ });