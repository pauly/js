/*! js v1.1.5 */
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.e?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=10)}({10:function(e,t,n){"use strict";!function(e,t,n,r){function o(e,t,o,i,a){if(t=[],e){if(!(o=e[n]("tag")))return t;for(i=0,a=o[r];i<a;i++)t.push(o[i].innerHTML.replace(/\W/g,""))}return t}function i(e,n){return(e=t.getElementsByName("Keywords"))&&e[r]?(n=e[0].getAttribute("content"),n?n.replace(/\s|folkestone,/g,"").split(","):[]):[]}e&&e.ok(function(a,u,f,c,l,s,p,d){if(a=o(e.id("footerTags")),a[r]||(a=o(t.body)),a[r]||(a=i()),a[r]&&(a=a.slice(0,4),u=t[n]("photos"))){for(f=u[0],c=1,l=u[r];c<l;c++)u[c]&&u[c].parentNode.removeChild(u[c]);if(f){for(s=f,e.html(f,"");(s=s.parentNode)&&-1===s.className.indexOf("🤘"););if(s){for(p=["img","iframe"],c=0;c<p[r];c++){var g=e.tag(p[c],s);if(g&&g[r])return}d="https://picasaweb.google.com/data/feed/base/user/paulypopex?kind=photo",d+="&alt=json&q="+a.join("+OR+"),e.json(d,function(t){function n(t,n,o,i,a){o>=i[r]&&(o=0);var u=i[o].summary.$t.replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace('<td valign="top">','<td valign="top"><i>'+i[o].gphoto$snippet.$t+"</i><br />").replace("td><td","td></tr><tr><td");e.html(t,u),window.setTimeout(function(){a(t,n,o+1,i,a)},1e3*n)}if(t&&t.feed&&t.feed.entry&&t.feed.entry[r]){var o="photoContent";return e.html(f,'<h2><abbr title="'+a.join(" + ")+'">Some pictures</abbr></h2><div id="'+o+'"></div>'),f.className+=" show",n(e.id(o),10,0,t.feed.entry,n)}})}}}})}(window.gU,document,"getElementsByClassName","length")}});