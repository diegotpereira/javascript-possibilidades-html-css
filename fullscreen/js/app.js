'use strict'

document.cancelFullScreen = document.weblitCancelFullScreen ||
    document.mozCancelFullScreen || document.cancelFullScreen;

document.body.requestFullScreen = document.body.webkitRequestFullScreen ||
    document.body.mozRequestFullScreen || document.body.requestFullScreen;

function exibirStatusTelaCheia() {
    var status = ehTelaCheia() ? 'O documento agora está em tela cheia.' :
        'No momento, o documento não está em tela cheia.';
    document.querySelector('#status').innerHTML = status
}

exibirStatusTelaCheia()

document.onfullscreenchange = document.onwebkitfullscreenchange =
    document.onmozfullscreenchange = exibirStatusTelaCheia

function ehTelaCheia() {
    return !!(document.webkitIsFullScreen || document.mozFullScreen ||
        document.isFullScreen)
}

function telaCheiaElemento() {
    return document.webkitFullScreenElement ||
        document.webkitCurrentFullScreenElement ||
        document.mozFullScreenElement || document.fullScreenElement
}

var imagem = document.querySelector('img')

imagem.requestFullScreen = imagem.webkitRequestFullScreen ||
    imagem.mozRequestFullScreen || imagem.requestFullScreen

document.body.onclick = function(e) {
    console.log(telaCheiaElemento())

    if ((ehTelaCheia() && e.target !== imagem) ||
        telaCheiaElemento() === imagem) {
        document.cancelFullScreen()
    } else if (e.target === imagem) {
        imagem.requestFullScreen()
    } else {
        document.body.requestFullScreen()
    }
}