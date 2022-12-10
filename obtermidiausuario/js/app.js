'use strict'

var constraints = {
    video: true
}

var video = document.querySelector('video')

function ManipularSucesso(stream) {
    // apenas para tornar o fluxo disponível para o console
    window.stream = stream
    video.srcObject = stream
}

function ManipularErro(erro) {
    console.log('obterMidiaUsuario erro: ', erro)
}

navigator.mediaDevices.getUserMedia(constraints)
    .then(ManipularSucesso)
    .catch(ManipularErro)