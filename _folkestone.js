(function (window, document, gU) {
  'use strict';
  gU = window.gU;
  if (!gU) return;
  var index,
    links = gU.tag('a'),
    addressNode = gU.tag('addr')[0],
    address = addressNode.innerHTML.split(',')[0],
    link,
    name,
    domain = 'ratings.food.gov.uk',
    insertBefore = 'insertBefore',
    parentNode = 'parentNode';

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
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) callback(request.responseText);
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
    var img = '<img src="/img/fsa/' +
      ('' + venue.RatingKey).toLowerCase() +
      '.jpg" />';
    img += '<br />' + [
      venue.AddressLine1,
      venue.AddressLine2,
      venue.AddressLine3,
      // venue.RightToReply,
      venue.RatingDate
    ].join( ', ' );
    var anchor = gU.cE('a'); // createElement
    anchor.href = domain;
    gU.html(anchor, img);
    var wrapper = gU.cE('p'); // createElement
    gU.html(wrapper, anchor);
    insertAfter(wrapper, addressNode);
  }

  get('http://api.' + domain + '/Establishments?name=' + name + '&address=' + address, success);
})(window, document);
