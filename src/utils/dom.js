export function appendHTML(el, html) {
  const tmpEl = document.createElement('div');
  tmpEl.innerHTML = html;

  while(tmpEl.firstChild) {
    el.appendChild(tmpEl.firstChild);
  }
}