let window_height = document.documentElement.clientHeight
window.addEventListener('resize', () => {
  window_height = document.documentElement.clientHeight
})
const animateUp = document.getElementsByClassName('animate-up')
window.onscroll = my_animation

function getOffsetTop(ele) {
  let rtn = ele.offsetTop
  let o = ele.offsetParent
  while (o != null) {
    rtn += o.offsetTop
    o = o.offsetParent
  }
  return rtn
}

function my_animation() {
  const _scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  for (let k = 0; k < animateUp.length; k++) {
    if (_scrollTop >= getOffsetTop(animateUp[k]) - window_height) {
      animateUp[k].style.animationName = animateUp[k].dataset.animate.split(',')[0]
      animateUp[k].style.animationDuration = animateUp[k].dataset.animate.split(',')[1]
      animateUp[k].style.animationTimingFunction = animateUp[k].dataset.animate.split(',')[2]
      if (animateUp[k].dataset.animate.split(',')[3] !== undefined) animateUp[k].style.animationDelay = animateUp[k].dataset.animate.split(',')[3]
    }
  }
}

my_animation()

export default my_animation
