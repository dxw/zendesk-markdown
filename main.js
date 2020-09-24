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

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

window.addEventListener('load', function () {
  console.log('hello')

  const editor = document.querySelector('#editor0')
  const toolbar = editor.querySelector('.zendesk-editor--custom-tools')
  const richText = editor.querySelector('.zendesk-editor--rich-text-comment')

  addButton(toolbar, 'Markdown', function () {
    console.log('world')
    removeAllChildren(richText)
    const p=document.createElement('p')
    p.innerText='hello world'
    richText.appendChild(p)
  })
})
