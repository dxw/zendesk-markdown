'use strict'

const marked = require('marked')

// https://stephanwagner.me/auto-resizing-textarea-with-vanilla-javascript
function addAutoResize(element) {
  element.style.boxSizing = 'border-box';
  var offset = element.offsetHeight - element.clientHeight;
  element.addEventListener('input', function (event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + offset + 'px';
  });
  element.removeAttribute('data-autoresize');
}

function addButton(element, label, callback) {
  const button = document.createElement('button')
  button.innerText = label
  button.addEventListener('click', callback)
  const li = document.createElement('li')
  li.appendChild(button)
  element.appendChild(li)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', async function () {
  // Keep searching for editors forever
  while (true) {
    const editor = document.querySelector('.ember-view > .editor:not(.zendesk-markdown-loaded)')
    if (editor !== null) {
      editor.classList.add('zendesk-markdown-loaded')
      run(editor)
    } else {
      await sleep(100)
    }
  }
})

function run(editor) {
  const toolbar = editor.querySelector('.zendesk-editor--custom-tools')
  const richText = editor.querySelector('.zendesk-editor--rich-text-comment')

  // Self-documentation
  if (toolbar !== null) {
    addButton(toolbar, 'Markdown?', function () {
      alert('This is a browser extension. https://github.com/dxw/zendesk-markdown')
    })
  }

  // Add the textarea
  const textarea = document.createElement('textarea')
  textarea.style.backgroundColor = '#ddd'
  addAutoResize(textarea)
  editor.insertBefore(textarea, editor.firstChild)

  // Hook the textarea up to the rich text field
  textarea.addEventListener('input', function () {
    const input = textarea.value
    const output = marked(input)
    richText.innerHTML = output
  })
}
