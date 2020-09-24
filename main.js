'use strict'

const marked = require('marked')

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
  // wait until the editor is loaded (if it ever gets loaded)
  while (true) {
    await sleep(100)
    const editor = document.querySelector('#editor0')
    if (editor !== null) {
      run(editor)
      break
    }
  }
})

function run(editor) {
  const toolbar = editor.querySelector('.zendesk-editor--custom-tools')
  const richText = editor.querySelector('.zendesk-editor--rich-text-comment')

  const textarea = document.createElement('textarea')
  textarea.style.backgroundColor = '#ddd'
  editor.insertBefore(textarea, editor.firstChild)

  textarea.addEventListener('input', function () {
    const input = textarea.value
    const output = marked(input)
    richText.innerHTML = output
  })

  addButton(toolbar, 'Markdown?', function () {
    alert('This is a browser extension. https://github.com/dxw/zendesk-markdown')
  })
}
