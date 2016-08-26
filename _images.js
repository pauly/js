'use strict';
(function(document, gU, round, appendChild, coords) {
  if (!gU) return;
  var images,
    script = '/php/images.php',
    box = null;

  function getOffset(element, offset) {
    offset = { x: 0, y: 0 };
    do {
      offset.x += element.offsetLeft - element.scrollLeft;
      offset.y += element.offsetTop - element.scrollTop;
    } while (element = element.offsetParent);
    return offset;
  }

  function findImage(images, src, index) {
    for (index in images) {
      if (images[index].src.substr(0, 255) === src.substr(0,255)) return images[index];
    }
  }

  function mousedown(e, image, src, offset, x, y, text, url) {
    if (!e.altKey) return;
    src = e.currentTarget.currentSrc;
    image = findImage(images, src);
    offset = getOffset(e.currentTarget);
    x = e.pageX - offset.x - document.body.scrollLeft;
    y = e.pageY - offset.y - document.body.scrollTop;
    if (box === null) {
      box = {
        offset: offset,
        left: x,
        top: y
      };
      return;
    }
    box.right = x;
    box.bottom = y;
    box.src = src;
    box[coords] = [
      round((box.left / image.width) * 100), // left as %
      round((box.top / image.height) * 100), // top as %
      round((box.right / image.width) * 100), // right as %
      round((box.bottom / image.height) * 100) // bottom as %
    ];
    drawNote(box);
    box.text = prompt('Enter a note for this area');
    if (box.text) {
      url = script + '?_method=post&src=' + image.src +
        '&text=' + box.text + '&' + coords + '[0]=' + box[coords][0] + '&' + coords + '[1]=' + box[coords][1] +
        '&' + coords + '[2]=' + box[coords][2] + '&' + coords + '[3]=' + box[coords][3];
      gU.get(url, success);
    }
    box = null;
  }

  function drawNote(note, offset, image, overlay, src, left, top, width, height) {
    src = note.src;
    image = findImage(images, src);
    offset = getOffset(image);
    if (!offset) return;
    left = offset.x + ((image.width * note[coords][0]) / 100) + document.body.scrollLeft;
    top = offset.y + ((image.height * note[coords][1]) / 100) + document.body.scrollTop;
    width = image.width * ((note[coords][2] - note[coords][0]) / 100);
    height = image.height * ((note[coords][3] - note[coords][1]) / 100);
    overlay = document.createElement('a');
    overlay.className = 'overlay';
    overlay.style.color = '#' + (note.color || 'ff0');
    overlay.style.border = '1px solid ' + overlay.style.color;
    overlay.style.top = top + 'px';
    overlay.style.left = left + 'px';
    overlay.style.width = width + 'px';
    overlay.style.height = height + 'px';
    overlay.title = note.text;
    document.body[appendChild](overlay);
    return overlay;
  }

  function success(data) {
    if (JSON.parse) {
      data = JSON.parse(data);
      if (data.notes) {
        data.notes.forEach(drawNote, data);
      }
    }
  }

  function init(index, image, lazy) {
    images = gU.tag('img');
    for (index = images.length - 1; index >= 0; --index) {
      image = images[index];
      lazy = image.getAttribute('data-lazy');
      if (lazy) image.src = lazy;
      if (image.src.match(/maps.google|icons|ebaystatic|amazon|lst.fm/)) continue;
      gU.on(image, 'mousedown', mousedown);
      setTimeout(function() {
        gU.get(script + '?src=' + image.src, success);
      }, 999);
    }
  }

  gU.ok(init);
})(document, window.gU, Math.round, 'appendChild', 'coords');
