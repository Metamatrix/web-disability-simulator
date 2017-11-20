(() => {

  function getTextNodes(node){
    let all = [];
    for (node=node.firstChild;node;node=node.nextSibling){
      if (node.nodeType==3) all.push(node);
      else all = all.concat(getTextNodes(node));
    }
    return all;
  }

  function isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase();
  }

  function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function getRandomLetterIndex(txt) {
    let l = '';
    let i = null;

    while(!isLetter(l)) {
      i = randomInt(0, txt.length - 1);
      l = txt[i];
    }

    return i;
  }

  function shuffleString(txt) {
    const a = txt.split("");
    const n = a.length;

    for(let i = n - 1; i > 0; i--) {
      const tmp = a[i];

      if(isLetter(tmp)) {
        const j = getRandomLetterIndex(txt);
        a[i] = a[j];
        a[j] = tmp;
      }
    }

    return a.join("");
  }

  const textNodes = getTextNodes(document.querySelector('body'));

  textNodes.forEach((el) => {

    el._wdsOriginalText = el.textContent;

    setInterval(() => {

      const words = el.textContent.split(/\s/);

      el.textContent = words.map((word) => { 
        if(word.trim().length === 0) {
          return word;
        }

        if(word.length <= 3) {
          return shuffleString(word);
        }

        const lettersToKeep = Math.max(Math.round(word.length / 5), 1);

        return word.substring(0, 2) +
          shuffleString(word.substring(2, word.length - 2)) +
          word.substring(word.length - 2)
      }).join(' ');

    }, randomInt(750, 1500));

  });

})();