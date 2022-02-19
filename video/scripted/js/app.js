'use strict'

var video = document.querySelector('video')

var promise = video.play()

// promessa não será definida em navegadores que não suportam reprodução prometida ()
if (promise === undefined) {
    console.log('Reprodução de vídeo promise() não suportada')
} else {
    promise.then(function() {
        console.log('Reprodução de vídeo iniciada com sucesso, retornando uma promise');
    })
}

video.onloadedmetadata = function() {
    var arquivoNome = this.currentSrc.replace(/^.*[\\/]/, '')
    document.querySelector('#videoSrc').innerHTML = 'Reproduzindo video: ' + arquivoNome
}