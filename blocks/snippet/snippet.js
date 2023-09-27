import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

const copyCode = async (code) => {
  await navigator.clipboard.writeText(code)
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  const content = block.children[0].children[0].textContent.trim();

  block.innerHTML = ``;

  const btnCopy = document.createElement('button');
  const divCopy = document.createElement('div');
  const spanCopy = document.createElement('span');
  const divCode = document.createElement('div');

  btnCopy.classList.add('btn-copy');
  divCopy.classList.add('div-copy');
  spanCopy.classList.add('span-copy');
  btnCopy.innerText = 'Copy code';
  divCopy.appendChild(btnCopy);
  divCopy.appendChild(spanCopy);
  block.appendChild(divCopy);

  const hl = hljs.highlight(content, {language: 'javascript'});

  block.appendChild(divCode);
  divCode.innerHTML = hl.value

  btnCopy.addEventListener('click', async (evt) => {
    spanCopy.style.opacity = 1;
    try {    
      await copyCode(content);
      spanCopy.innerText = '✅'
    } catch(e) {
      spanCopy.innerText = '🛑'
    }
    spanCopy.style.opacity = 0;
  });
}
