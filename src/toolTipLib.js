/*  Sweet Titles (c) Creative Commons 2005
  http://creativecommons.org/licenses/by-sa/2.5/
  Author: Dustin Diaz | http://www.dustindiaz.com
  rewritten by pauly
  requires http://www.clarkeology.com/js/gbbsUpdater.js
*/
(function (window, document, setTimeout, clearTimeout, parseInt, documentElement, body, gU, tip, tipTimeout, opacityTimeout, xCoord, yCoord) {
  gU = window.gU
  if (!gU) return

  function getAttribute (element, attribute) {
    return element.getAttribute(attribute)
  }

  function tippableElement (element) {
    // return element && includes(element.nodeName === 'A'
    return element && ['A', 'IMG'].includes(element.nodeName)
  }

  function tipShow () {
    const scrX = parseInt(xCoord, 10)
    const scrY = parseInt(yCoord, 10)
    let top = scrY + 10
    let left = scrX + 10
    gU.html(tip, getAttribute(this, 'tip')) // because we bound tipShow to the element

    if (parseInt(document[documentElement].clientWidth + document[documentElement].scrollLeft) < parseInt(tip.offsetWidth + left)) {
      left = parseInt(left - (tip.offsetWidth + 25))
    }
    tip.style.left = left + 'px'
    if (parseInt(document[documentElement].clientHeight + document[documentElement].scrollTop) < parseInt(tip.offsetHeight + top)) {
      top = parseInt(top - (tip.offsetHeight + 25))
    }
    tip.style.top = top + 'px'
    tip.style.visibility = 'visible'
    tip.style.opacity = '.1'
    tipFade(10)
  }

  function tipFade (originalOpacity, newOpacity) {
    newOpacity = originalOpacity + 10
    if (newOpacity < 80) {
      tip.style.opacity = '.' + newOpacity
      opacityTimeout = setTimeout(function () {
        tipFade(newOpacity)
      }, 20)
      return
    }
    tip.style.opacity = '.80'
  }

  function updateXY (event) {
    if (document.captureEvents) {
      xCoord = event.pageX
      yCoord = event.pageY
      return
    }
    if (window.event.clientX) {
      xCoord = event.clientX + (document[documentElement].scrollLeft || document[body].scrollLeft)
      yCoord = event.clientY + (document[documentElement].scrollTop || document[body].scrollTop)
    }
  }

  // gU.ok(function() { // can launch asap because of event delegation
  if ((window.innerWidth || document[body].clientWidth) < 800) return
  tip = gU.cE('div') // createElement
  tip.id = 'toolTip'
  gU.aC(gU.tag(body)[0], tip) // appendChild
  tip.style.position = 'absolute' // essential css to make this work
  tip.style.visibility = 'hidden' // other styling is in external css
  gU.on(document, 'mousemove', updateXY)
  gU.on(document, 'mouseover', function (event, element, title) {
    element = event.target
    // event delegation, only apply to the elements in tipElements, so <a>
    if (tippableElement(element)) {
      title = getAttribute(element, 'title') || getAttribute(element, 'alt')
      if (title) {
        element.setAttribute('tip', title)
        element.removeAttribute('title')
      }
      if (getAttribute(element, 'tip')) {
        tipTimeout = setTimeout(tipShow.bind(element), 50)
        updateXY(event)
      }
    }
  })
  gU.on(document, 'mouseout', function (event) {
    // event delegation, only apply to the elements in tipElements, so <a>
    if (tippableElement(event.target)) {
      clearTimeout(tipTimeout)
      clearTimeout(opacityTimeout)
      tip.style.visibility = 'hidden'
    }
  })
  // });
})(window, document, setTimeout, clearTimeout, parseInt, 'documentElement', 'body')
