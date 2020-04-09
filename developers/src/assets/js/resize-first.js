
window.addEventListener('resize', first_resize)

function first_resize(init) {
    let height = document.documentElement.clientHeight - 100
    if (init === true) {
        if (height < 668) height = 668
        if (height > 1300) height = 1300
    } else {
        if (height < 668 || height > 1300) return
    }
    let dom = this.document.getElementsByClassName('main-title')[0]
    dom.style = `height:${height}px;animation-name: fadeInUp; animation-duration: 2s;`
}

first_resize(true)