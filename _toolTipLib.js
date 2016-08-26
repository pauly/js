/*  Sweet Titles (c) Creative Commons 2005
  http://creativecommons.org/licenses/by-sa/2.5/
  Author: Dustin Diaz | http://www.dustindiaz.com
  rewritten by pauly
  requires http://www.clarkeology.com/js/gbbsUpdater.js
*/
(function (window, document, setTimeout, clearTimeout, parseInt, documentElement, body, gU, tipTimeout, opacityTimeout) { 
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
    var scrX = parseInt(sweetTitles.xCord),
      scrY = parseInt(sweetTitles.yCord),
      top = parseInt(scrY+10),
      left = parseInt(scrX+10),
      anch = this;
    sweetTitles.tip.innerHTML = anch.getAttribute('tip');

    if (parseInt(document[documentElement].clientWidth + document[documentElement].scrollLeft) < parseInt(sweetTitles.tip.offsetWidth + left)) {
      left = parseInt(left - (sweetTitles.tip.offsetWidth + 25));
    }
    sweetTitles.tip.style.left = left + 'px';
    if (parseInt(document[documentElement].clientHeight + document[documentElement].scrollTop) < parseInt(sweetTitles.tip.offsetHeight + top)) {
      top = parseInt(top - (sweetTitles.tip.offsetHeight + 25));
    }
    sweetTitles.tip.style.top = top + 'px';
    sweetTitles.tip.style.visibility = 'visible';
    sweetTitles.tip.style.opacity = '.1';
    tipFade(10);
  }

  function tipFade(opac) {
    var passed = parseInt(opac),
      newOpac = parseInt(passed + 10);
    if (newOpac < 80) {
      sweetTitles.tip.style.opacity = '.' + newOpac;
      opacityTimeout = setTimeout(function () {
        tipFade(newOpac);
      }, 20);
      return;
    }
    sweetTitles.tip.style.opacity = '.80';
  }

  function updateXY(event) {
    if (document.captureEvents) {
      sweetTitles.xCord = event.pageX;
      sweetTitles.yCord = event.pageY;
      return;
    }
    if (window.event.clientX) {
      sweetTitles.xCord = event.clientX + (document[documentElement].scrollLeft || document[body].scrollLeft);
      sweetTitles.yCord = event.clientY + (document[documentElement].scrollTop || document[body].scrollTop);
    }
  }

  var sweetTitles = {
    xCord: 0,
    yCord: 0,
    tip: Object,        // @Element: The actual toolTip itself
    init: function() {
      if ((window.innerWidth || document[body].clientWidth) < 800) return;
      sweetTitles.tip = gU.cE('div'); // createElement
      sweetTitles.tip.id = 'toolTip';
      gU.aC(gU.tag(body)[0], sweetTitles.tip); // appendChild
      // sweetTitles.tip.style.top = '0';
      sweetTitles.tip.style.position = 'absolute';
      sweetTitles.tip.style.visibility = 'hidden';
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
          sweetTitles.tip.style.visibility = 'hidden';
        }
      });
    }
  };
  gU.sT = sweetTitles.init; // attach it to gbbsUpdater as it is called again, though it does not need to be any more
  gU.ok(sweetTitles.init); // can launch asap because of event delegation
})(window, document, setTimeout, clearTimeout, parseInt, 'documentElement', 'body');
