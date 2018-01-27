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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (window, document, scriptString, readyState, onreadystatechange, gU, _createElement, raf) {
  gU = window.gU;
  _createElement = document.createElement.bind(document);

  // from http://www.html5rocks.com/en/tutorials/speed/script-loading/
  gU.load = function (scripts) {
    var src;
    var script;
    var pendingScripts = [];
    var firstScript = document.scripts[0];

    // Watch scripts load in IE
    function stateChange() {
      // Execute as many scripts in order as we can
      var pendingScript;
      while (pendingScripts[0] && pendingScripts[0][readyState] === 'loaded') {
        pendingScript = pendingScripts.shift();
        // avoid future loading events from this script (eg, if src changes)
        pendingScript[onreadystatechange] = null;
        // can't just appendChild, old IE bug if element isn't closed
        firstScript.parentNode.insertBefore(pendingScript, firstScript);
      }
    }

    // loop through our script urls
    while (src = scripts.shift()) {
      // eslint-disable-line no-cond-assign
      if ('async' in firstScript) {
        // modern browsers
        script = _createElement(scriptString);
        script.async = false;
        script.src = src;
        gU.aC(document.head, script);
      } else if (firstScript[readyState]) {
        // IE<10
        // create a script and add it to our todo pile
        script = _createElement(scriptString);
        pendingScripts.push(script);
        // listen for state changes
        script[onreadystatechange] = stateChange;
        // must set src AFTER adding onreadystatechange listener
        // else we’ll miss the loaded event for cached scripts
        script.src = src;
      } else {
        // fall back to defer
        document.write('<' + scriptString + ' src="' + src + '" defer></' + scriptString + '>');
      }
    }
  };

  // from https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
  function loadDeferredStyles(addStylesNode, replacement) {
    addStylesNode = gU.id('deferred');
    replacement = _createElement('div');
    gU.html(replacement, addStylesNode.textContent);
    gU.aC(document.head, replacement);
    // addStylesNode.parentElement.removeChild(addStylesNode);
  };

  /* raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
  raf ? raf(function() { window.setTimeout(loadDeferredStyles, 0); }) : gU.ok(loadDeferredStyles); */

  gU.ok(loadDeferredStyles);
})(window, document, 'script', 'readyState', 'onreadystatechange');

/***/ })

/******/ });