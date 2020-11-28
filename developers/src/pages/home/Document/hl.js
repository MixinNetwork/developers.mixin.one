import katex from "katex"
import hljs from "highlight.js"
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.min.css'
import 'katex/dist/fonts/KaTeX_Main-Regular.ttf'
import 'katex/dist/fonts/KaTeX_Main-Bold.ttf'
import partial from './hl-partial'

export function handleCodeHighLight() {
  let preEl = document.querySelectorAll('code')
  preEl.forEach(el => {
    let { innerText } = el
    const isBlock = el.parentNode.tagName === 'PRE'
    if (innerText.startsWith('$$') && innerText.endsWith('$$')) {
      handleKatex(el, innerText, isBlock)
      if (isBlock) {
        el.parentNode.style.background = "transparent"
      }
    } else {
      isBlock && handlePartial(el) && hljs.highlightBlock(el)
    }
  })
}

function handleKatex(el, innerText, isBlock) {
  innerText = innerText.slice(2, -2)
  katex.render(String.raw`${innerText}`, el, {
    "displayMode": isBlock,
    "leqno": false,
    "fleqn": !isBlock,
    "throwOnError": true,
    "errorColor": "#cc0000",
    "strict": "warn",
    "output": "html",
    "trust": false,
    "macros": { "\\f": "#1f(#2)" }
  })
}

function handlePartial(el) {
  let target = el.innerText
  let testText = target.match(/\$\$XIN:(.*)?\$\$/g) || []
  if (testText.length > 0) {
    testText.forEach(text => {
      let exp = text.slice(6, -2)
      const start = target.indexOf(text)
      let [_, space] = target.slice(0, start + 6).match(/( *)?\$\$XIN:/)
      if (exp === 'curl') {
        target = target.replace(text, partial[exp])
      } else if (exp.startsWith('...')) {
        exp = exp.slice(3)
        target = target.replace(space + text, JSON.stringify(partial[exp], null, space).slice(2, -2) + ',')
      } else {
        target = target.replace(space + text, `${space}${JSON.stringify(partial[exp], null, space + '   ').slice(0, -2)}\n${space}}`)
      }
    })
    el.innerHTML = target
  }
  return !!el.className
}
