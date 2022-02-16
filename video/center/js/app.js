'use strict'

var container = document.querySelector('div#container')
var pequenoVideo = document.querySelector('video#small')
var grandeVídeo = document.querySelector('video#large')

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia

var restricoes = {
    video: {
        mandatory: {
            minWidth: 1280,
            minHeight: 720
        }
    }
}

function sucessoRetornoChamada(stream) {
    window.stream = stream
    grandeVídeo.srcObject = stream
    pequenoVideo.srcObject = stream
}

function erroRetornoChamada(erro) {
    console.log('navigator.getUserMedia erro: ', erro)
}

navigator.mediaDevices.getUserMedia(
    restricoes
).then(
    sucessoRetornoChamada,
    erroRetornoChamada
)

window.onresize = window.onorientationchange = function() {
    container.classList.add('hidden')
    container.style.display = 'none'

    setTimeout(function() {
        container.style.display = 'inline-block'
    }, 1)

    this.setTimeout(function() {
        container.classList.remove('hidden')
    }, 500)
}