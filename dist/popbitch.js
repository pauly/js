/*! js v1.0.2 */
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


/**
 * extends gU.js with popbitch specifics
 * @author  Paul Clarke <paulypopex+js@gmail.com>
 */
/* global confirm */
(function (window, document, gU) {
  gU = window.gU;
  if (!gU) return;

  var _setInnerHTML = gU.html;
  var script = '/a';
  var className = 'className';
  var edit = 'edit';
  var message = 'message';
  var remove = 'remove';
  var replace = 'replace';
  var _warningClass = ' warning';

  function _warn(div) {
    div[className] += _warningClass;
  }

  function _unWarn(div) {
    div[className] = div[className][replace](_warningClass, '');
  }

  gU.eF = function (anchor, table, id, mode, c) {
    var parent = anchor.parentNode;
    var url = script + '?t=' + table + '&m=' + mode + '&key=' + id;
    if (c) {
      url += '&confirm = ' + c;
    }
    anchor[className] = 'loading';
    _setInnerHTML(anchor, mode + ' ' + table + ' ' + id + ', please wait...');
    gU.get(url, function (response) {
      _setInnerHTML(parent, response);
      anchor[className] = anchor[className][replace]('loading', '');
    });
  };

  gU.dR = function (callerDiv, anchor, table, id, mode, url) {
    url = script + '?t=' + table + '&m=' + mode + '&key=' + id;
    _warn(callerDiv);
    callerDiv.href = '#';
    if (confirm('Really ' + mode + ' ' + table + ' ' + id + '?')) {
      // eslint-disable-line no-alert
      _setInnerHTML(anchor, 'Deleting...');
      url = url + '&confirm=1';
      gU.get(url, function () {
        _setInnerHTML(callerDiv, '');
      });
    } else {
      _unWarn(message);
    }
  };

  gU.cM = function (m, cLink) {
    // close thread
    var url = script + '?m=' + edit + '&key=' + m + '&threadClosed=1';
    var div = gU.id(message + ' ' + m);
    _warn(div);
    if (confirm('Really close ' + message + ' ' + m + '?')) {
      // eslint-disable-line no-alert
      cLink = gU.id('close' + m);
      _setInnerHTML(cLink, 'Closing...');
      url += '&confirm=1';
      gU.get(url, function () {
        _setInnerHTML(cLink, 'Closed');
      });
      return;
    }
    _unWarn(div);
  };

  gU.rM = function (m, rLink) {
    var url = script + '?t=' + message + '&m=report&key=' + m;
    var div = gU.id(message + m);
    _warn(div);
    if (confirm('Report ' + message + ' ' + m + ' as spam?')) {
      // eslint-disable-line no-alert
      rLink = gU.id('report' + m);
      _setInnerHTML(rLink, 'Reporting and deleting...');
      url = url + '&confirm=1';
      gU.get(url, function () {
        _setInnerHTML(rLink, 'Reported and ' + remove + 'd');
        div.style.display = 'none';
      });
      return;
    }
    _unWarn(div);
  };

  gU.dM = function (m) {
    var url = script + '?m=' + remove + '&key=' + m;
    var div = gU.id(message + m);
    _warn(div);
    if (confirm('Really ' + remove + ' ' + message + ' ' + m + '?')) {
      // eslint-disable-line no-alert
      _setInnerHTML(gU.id(remove + m), 'Deleting...');
      url = url + '&confirm=1';
      gU.get(url, function () {
        _setInnerHTML(gU.id(remove + m), remove + 'd');
        _setInnerHTML(div, '');
      });
      return;
    }
    _unWarn(div);
  };
})(window, document);

/***/ })

/******/ });