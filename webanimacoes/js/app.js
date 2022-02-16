'use strict'

var marquise
var marquiseEl = document.querySelector('.grid.marquee')
var children = [].slice.call(marquiseEl.querySelectorAll('.cell'))

if ('animate' in marquiseEl && typeof marquiseEl.animate === 'function') {
    marquiseEl.style.whiteSpace = 'nowrap'

    var deslocamento = children.map(function(child) {
        return child.clientWidth
    }).reduce(function(acc, next) {
        return acc + next
    }) - marquiseEl.clientWidth << 0

    marquise = marquiseEl.animate(
        [{
                transform: 'matrix(1, 0.00, 0.00, 1, 0, 0)',
                offset: 0
            },
            {
                transform: 'matrix(1, 0.00, 0.00, 1,' + -deslocamento + ', 0)',
                offset: 1
            }
        ], {
            duration: children.length * 1e3,
            easing: 'linear',
            delay: 0,
            iterations: Infinity,
            direction: 'alternate',
            fill: 'forwards'
        }
    );

    marquiseEl.addEventListener('moseenter', function() {
        if (marquise.playState === 'running') {
            marquise.pause()
        }
    }, false)

    marquiseEl.addEventListener('mouseleave', function() {
        if (marquise.playState === 'paused') {
            marquise.play()
        }
    }, false)
}