'use strict'

var video = window.video = document.querySelector('video')

var url = '../videos/small.webm'

var comprimentoIntervalo = 50000
var totalBytes = 0

getCabecalhosVideo()

function getCabecalhosVideo() {
    var opcao = {
        Headers: {
            'method': 'HEAD'
        }
    }
    fetch(url, opcao).then(function(response) {
        totalBytes = response.headers.get('content-length')
        console.log("Total de bytes: ", totalBytes)

        getIntervalos()
    })
}

function getIntervalos() {
    for (var index = 1; index !== 2; ++index) {
        var intervaloFinal = index * comprimentoIntervalo
            // Se todos os bytes já foram recuperados
        if (intervaloFinal - comprimentoIntervalo > totalBytes) {
            console.log('Tenho todos os bytes', intervaloFinal, comprimentoIntervalo, index)
            break
        }
        getIntervalo(intervaloFinal)
    }
}

function getIntervalo(finalizar) {
    var intervalo = 'bytes = ' + 0 + '-' + finalizar
    console.log('intervalo:', intervalo)

    var opcoes = {
        headers: {
            'Intervalo': intervalo
        }
    }
    fetch(url, opcoes).then(function(response) {
        if (totalBytes === 0) {
            totalBytes = response.headers.get('content-range').split('/' [1])
            console.log('Obtendo totalBytes', totalBytes);
        }
        return response.blob()
    }).then(function(blob) {
        video.src = window.URL.createObjectURL(blob)
    })
}