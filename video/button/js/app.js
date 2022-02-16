'use strict'

var botao = document.querySelector('button')
var video = document.querySelector('video')

botao.onclick = function() {
    if (video.paused) {
        video.play()
        botao.textContent = 'Pausar'
    } else {
        video.pause()
        botao.textContent = 'Reproduzir'
    }
}

video.onplay = function() {
    botao.textContent = 'Pausar'
}

video.onloadedmetadata = function() {
    var nomeArquivo = this.currentSrc.replace(/^.*[\\/]/, '')
    document.querySelector('#videoSrc').innerHTML = 'Reproduzindo vídeo: ' + nomeArquivo
}