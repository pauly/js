/*  Sweet Titles (c) Creative Commons 2005
  http://creativecommons.org/licenses/by-sa/2.5/
  Author: Dustin Diaz | http://www.dustindiaz.com
  Update: PC, 29/08/07 to not conflict with thickbox
  PC rewritten 2016
*/
var sweetTitles = (function (window, document, parseInt, documentElement, body, gU) { 

  gU = window.gU;
  if (!gU) return;

  var tipElements = ['a'];  // @Array: Allowable elements that can have the toolTip

  function checkNode() {
    var trueObj = sweetTitles.obj;
    function inArray(arr, str) {
      for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] === str) return true;
      }
      return false;
    }
    if (inArray(tipElements, trueObj.nodeName.toLowerCase())) {
      return trueObj;
    }
    return trueObj.parentNode;
  }

  function tipOut() {
    if (window.tID) clearTimeout(tID);
    if (sweetTitles.opacityID) clearTimeout(sweetTitles.opacityID);
    sweetTitles.tip.style.visibility = 'hidden';
  }

  function tipOver(e) {
    sweetTitles.obj = this;
    tID = window.setTimeout(tipShow, 50);
    updateXY(e);
  }

  function tipShow() {    
    var scrX = Number(sweetTitles.xCord),
      scrY = Number(sweetTitles.yCord),
      tp = parseInt(scrY+10),
      lt = parseInt(scrX+10),
      anch = checkNode();
    gU.html(sweetTitles.tip, anch.getAttribute('tip'));

    if (parseInt(document[documentElement].clientWidth + document[documentElement].scrollLeft) < parseInt(sweetTitles.tip.offsetWidth + lt)) {
      lt = parseInt(lt-(sweetTitles.tip.offsetWidth+25));
    }
    sweetTitles.tip.style.left = lt+'px';
    if (parseInt(document[documentElement].clientHeight + document[documentElement].scrollTop) < parseInt(sweetTitles.tip.offsetHeight + tp)) {
      tp = parseInt(tp-(sweetTitles.tip.offsetHeight+25));
    }
    sweetTitles.tip.style.top = tp + 'px';
    sweetTitles.tip.style.visibility = 'visible';
    sweetTitles.tip.style.opacity = '.1';
    tipFade(10);
  }

  function tipFade(opac) {
    var passed = parseInt(opac),
    newOpac = parseInt(passed+10);
    if (newOpac < 80) {
      sweetTitles.tip.style.opacity = '.'+newOpac;
      sweetTitles.opacityID = window.setTimeout(function () {
        tipFade(newOpac);
      }, 20);
      return;
    }
    sweetTitles.tip.style.opacity = '.80';
  }

  function updateXY(e) {
    if (document.captureEvents) {
      sweetTitles.xCord = e.pageX;
      sweetTitles.yCord = e.pageY;
      return;
    }
    if (window.event.clientX) {
      sweetTitles.xCord = e.clientX + (document[documentElement].scrollLeft || document[body].scrollLeft);
      sweetTitles.yCord = e.clientY + (document[documentElement].scrollTop || document[body].scrollTop);
    }
  }

  var sweetTitles = {
    xCord: 0,
    yCord: 0,
    obj: Object,        // @Element: That of which you're hovering over
    tip: Object,        // @Element: The actual toolTip itself
    init: function() {
      if ((window.innerWidth || document[body].clientWidth) < 800) return;
      // var oldTip = gU.byId('toolTip'), i;
      // if (oldTip) document[body].removeChild(oldTip);
      sweetTitles.tip = document.createElement('div');
      sweetTitles.tip.id = 'toolTip';
      gU.byTag(body)[0].appendChild(sweetTitles.tip);
      sweetTitles.tip.style.top = '0';
      sweetTitles.tip.style.position = 'absolute';
      sweetTitles.tip.style.visibility = 'hidden';
      tipOut();
      for (i = 0; i < tipElements.length; i ++) {
        var c = gU.byTag(tipElements[i]),
          curLen = c.length;
        for (var j = 0; j < curLen; j ++) {
          if (!c[j].title) continue;
          gU.on(c[j], 'mouseover', tipOver);
          gU.on(c[j], 'mouseout', tipOut);
          gU.on(c[j], 'click', tipOut);
          c[j].setAttribute('tip', c[j].title);
          c[j].removeAttribute('title');
          // c[j].className = c[j].className + ' sweetTitle'; 
        }
      }
      gU.on(document, 'mousemove', updateXY);
    }
  };
  window.setTimeout(sweetTitles.init, 500);
  return sweetTitles.init; // only init is exported now so call sweetTitles()
})(window, document, parseInt, 'documentElement', 'body');
