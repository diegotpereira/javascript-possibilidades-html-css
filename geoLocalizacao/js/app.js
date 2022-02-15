'use strict'

var data = document.querySelector('#data')

function log(mensagem) {
    data.innerHTML += mensagem + '<br />' + data.innerHTML
}

navigator.geolocation.watchPosition(marcarPosicao)

function marcarPosicao(posicao) {
    console.log(posicao)
    log('latitude: ' + posicao.coords.latitude +
        ', longitude: ' + posicao.coords.longitude)

}