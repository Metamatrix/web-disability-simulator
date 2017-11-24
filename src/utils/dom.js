export function addCss(href, callback) {
  var l = document.createElement('link');
  l.setAttribute('href', href);
  l.setAttribute('rel', 'stylesheet');
  l.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(l);
  return l;
}

export function addScript(src, callback) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  s.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

export function addStyle(str) {
  var s = document.createElement('style');
  s.innerText = str;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

export function appendHTML(el, html) {
  const tmpEl = document.createElement('div');
  tmpEl.innerHTML = html;

  while(tmpEl.firstChild) {
    el.appendChild(tmpEl.firstChild);
  }
}

export function getTextNodes(node){
  let all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(getTextNodes(node));
  }
  return all;
}

export function removeElement(el) {
  el.parentNode.removeChild(el);
}

export function setStyle(element, style) {
  for (var s in style) {
    element.style[s] = style[s];
  }
}