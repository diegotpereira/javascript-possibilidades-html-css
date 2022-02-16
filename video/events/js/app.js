'use strict'

var video = document.querySelector('video')
var dado = document.querySelector('p#dado')
var iniciar = Date.now()

function lidarEvento(e) {
    var tempo
    if (window.performance) {
        tempo = (window.performance.now() / 1000).toFixed(6)
    } else {
        tempo = ((Date.now() - iniciar) / 1000).toFixed(3)
    }
    dado.innerHTML = '<span class="tempo">' + tempo + '</span>' + 's: ' +
        e.type + '<br>' + dado.innerHTML
}

var eventos = [
    'abort',
    'autocomplete',
    'autocompleteerror',
    'beforecopy ',
    'beforecut',
    'beforepaste',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'click',
    'close',
    'contextmenu',
    'copy',
    'cuechange',
    'cut',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadeddata',
    'loadedmetadata',
    'loadstart',
    'needkey',
    'paste',
    'pause',
    'play',
    'playing',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'search',
    'seeked',
    'seeking',
    'select',
    'selectstart',
    'show',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'toggle',
    'volumechange',
    'waiting',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
    'webkitkeyadded',
    'webkitkeyerror',
    'webkitkeymessage',
    'webkitneedkey'
]

for (var index = 0; index !== eventos.length; ++index) {
    video.addEventListener(eventos[index], lidarEvento)
}