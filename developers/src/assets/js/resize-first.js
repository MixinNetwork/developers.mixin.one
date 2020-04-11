
window.addEventListener('resize', first_resize)

function first_resize(init) {
    let height = document.documentElement.clientHeight - 100
    if (height < 668) height = 668
    if (height > 980) height = 980
    let dom = this.document.getElementsByClassName('main-title')[0]
    dom.style = `height:${height}px;animation-name: fadeInUp; animation-duration: 2s;`
}

first_resize(true)