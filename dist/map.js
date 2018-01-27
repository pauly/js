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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (window, $) {
  var _myGmap;

  if (!$) return;
  /**
   * my map script
   *
   * @see    folkestonegerald.com/map
   * @author  PC <paulypopex+js+maps@gmail.com>
   * @date  Thu Dec 17 19:49:28 GMT 2009
   */
  var myGmap = (_myGmap = {
    _lat: '',
    _lon: '',
    lat: '',
    lon: '',
    msie: 0,
    maxPins: 150,
    js: [],
    mapDiv: '',
    highlight: '',
    interval: null,
    wait: 5,
    lowlights: [],
    map: '',
    panel: '',
    table: '',
    locations: [],
    moving: 0
  }, _defineProperty(_myGmap, 'panel', '#panel'), _defineProperty(_myGmap, 'init', function init(mapDiv, lat, lon) {
    this.mapDiv = document.getElementById('map');
    if (mapDiv && mapDiv.id && mapDiv.className) {
      this.mapDiv = mapDiv;
    }
    var meta = ('' + $('meta[name="geo.position"]').attr('content')).split(/, */);
    lat = $(this.lat).val() || $('#latitude').val() || meta[0] || '51.071';
    lon = $(this.lon).val() || $('#longitude').val() || meta[1] || '1.179';
    var map = new google.maps.Map(this.mapDiv, {
      center: new google.maps.LatLng(lat, lon),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: map
    });
  }), _myGmap);
  var i = setInterval(function () {
    // init when we have prerequisites
    if (!(window.$ && window.google && google.maps.Map)) return;
    clearInterval(i);
    myGmap.init();
    $(window).unload(function () {
      GUnload();
    });
  }, 100);
})(window, window.$);

/***/ })

/******/ });