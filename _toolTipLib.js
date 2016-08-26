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
    return element && element.nodeName == 'A';
    // I'm only allowing anchors to have tooltips on, but if we wanted more:
    //  var tippableElements = ['A'], index;
    //  if (element) {
    //    for (index = tippableElements.length; index > 0; index--) {
    //      if (tippableElements[index - 1] === element.nodeName) return true;
    //    }
    //  }
  }

  function tipShow() {    
    var scrX = parseInt(xCoord),
      scrY = parseInt(yCoord),
      top = parseInt(scrY+10),
      left = parseInt(scrX+10),
      anch = this;
    gU.html(tip, anch.getAttribute('tip'));

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

  function tipFade(opac) {
    var passed = parseInt(opac),
      newOpac = parseInt(passed + 10);
    if (newOpac < 80) {
      tip.style.opacity = '.' + newOpac;
      opacityTimeout = setTimeout(function () {
        tipFade(newOpac);
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

  gU.ok(function() { // can launch asap because of event delegation
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
  });
})(window, document, setTimeout, clearTimeout, parseInt, 'documentElement', 'body');
