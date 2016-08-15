'use strict';
(function(window, document, scriptString, readyState, onreadystatechange, gU, _createElement, raf) {
  gU = window.gU;
  _createElement = document.createElement.bind(document);

  // from http://www.html5rocks.com/en/tutorials/speed/script-loading/
  gU.load = function(scripts) {
    var src,
      script,
      pendingScripts = [],
      firstScript = document.scripts[0];

    // Watch scripts load in IE
    function stateChange() {
      // Execute as many scripts in order as we can
      var pendingScript;
      while (pendingScripts[0] && pendingScripts[0][readyState] == 'loaded') {
        pendingScript = pendingScripts.shift();
        // avoid future loading events from this script (eg, if src changes)
        pendingScript[onreadystatechange] = null;
        // can't just appendChild, old IE bug if element isn't closed
        firstScript.parentNode.insertBefore(pendingScript, firstScript);
      }
    }

    // loop through our script urls
    while (src = scripts.shift()) {
      if ('async' in firstScript) { // modern browsers
        script = _createElement(scriptString);
        script.async = false;
        script.src = src;
        gU.aC(document.head, script);
      }
      else if (firstScript[readyState]) { // IE<10
        // create a script and add it to our todo pile
        script = _createElement(scriptString);
        pendingScripts.push(script);
        // listen for state changes
        script[onreadystatechange] = stateChange;
        // must set src AFTER adding onreadystatechange listener
        // else we’ll miss the loaded event for cached scripts
        script.src = src;
      }
      else { // fall back to defer
        document.write('<' + scriptString + ' src="' + src + '" defer></' + scriptString + '>');
      }
    }
  }

  // from https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
  function loadDeferredStyles(addStylesNode, replacement) {
    addStylesNode = gU.byId('deferred');
    replacement = _createElement('div');
    gU.html(replacement, addStylesNode.textContent);
    gU.aC(document.body, replacement);
    // addStylesNode.parentElement.removeChild(addStylesNode);
  };

  raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
  raf ? raf(function() { window.setTimeout(loadDeferredStyles, 0); }) : gU.ok(loadDeferredStyles);

})(window, document, 'script', 'readyState', 'onreadystatechange');
