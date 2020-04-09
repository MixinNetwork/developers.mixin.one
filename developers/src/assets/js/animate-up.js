var window_height = document.documentElement.clientHeight;
window.addEventListener('resize', () => {
    window_height = document.documentElement.clientHeight;
})
var animateUp = document.getElementsByClassName('animate-up');
window.onscroll = my_animation

function getOffsetTop(ele) {
    var rtn = ele.offsetTop;
    var o = ele.offsetParent;
    while (o != null) {
        rtn += o.offsetTop;
        o = o.offsetParent;
    }
    return rtn;
}

function my_animation() {
    var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    for (var k = 0; k < animateUp.length; k++) {
        if (_scrollTop >= getOffsetTop(animateUp[k]) - window_height) {
            animateUp[k].style.animationName = animateUp[k].dataset.animate.split(',')[0];
            animateUp[k].style.animationDuration = animateUp[k].dataset.animate.split(',')[1];
            animateUp[k].style.animationTimingFunction = animateUp[k].dataset.animate.split(',')[2];
            if (animateUp[k].dataset.animate.split(',')[3] !== undefined) animateUp[k].style.animationDelay = animateUp[k].dataset.animate.split(',')[3];
        }
    }
}

my_animation()

export default my_animation