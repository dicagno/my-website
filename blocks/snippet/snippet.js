import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

const copyCode = async (code) => {
  await navigator.clipboard.writeText(code)
}

function notifyCopyCode(text) {
  const elements = document.querySelectorAll('.animate-fade-in');

  for (const element of elements) {
    // First, fade in the element.
    element.style.opacity = '1';

    // Once the element has faded out, change the text and fade it back in.
    element.addEventListener('transitionend', function onTransitionEnd() {
      element.removeEventListener('transitionend', onTransitionEnd);

      // Change the inner text.
      element.innerText = text;

      // Fade in the element.
      element.style.opacity = '0';
    });
  }
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const { language } = readBlockConfig(block);
  console.log('language', language)
  const content = block.children[0].children[0].textContent.trim();

  block.innerHTML = ``;

  const btnCopy = document.createElement('button');
  const divCopy = document.createElement('div');
  const spanCopy = document.createElement('span');
  const divCode = document.createElement('div');

  btnCopy.classList.add('btn-copy');
  divCopy.classList.add('div-copy');
  spanCopy.classList.add('span-copy', 'animate-fade-in');
  btnCopy.innerText = 'Copy code';
  divCopy.appendChild(btnCopy);
  divCopy.appendChild(spanCopy);
  block.appendChild(divCopy);

  const hl = hljs.highlight(content, { language });

  block.appendChild(divCode);
  divCode.innerHTML = hl.value

  btnCopy.addEventListener('click', async (evt) => {
    try {
      await copyCode(content);
      notifyCopyCode('✅')
    } catch (e) {
      notifyCopyCode('🛑')
    }
  });
}
