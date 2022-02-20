'use strict'

var dadoDiv = document.querySelector('#dado')

function exibir(mensagem) {
    dadoDiv.innerHTML = mensagem + '<br />' + dadoDiv.innerHTML
}

function lidarMovimentoDispositivo(evento)  {
    var x = evento.acceleration.x
    var y = evento.acceleration.y 
    var z = evento.acceleration.z 

    exibir('Aceleração: ' + x +  ', ' + y + ', ' + z)

    var xg = evento.accelerationIncludingGravity.x
    var yg = evento.accelerationIncludingGravity.y 
    var zg = evento.accelerationIncludingGravity.z 

    exibir('Aceleração incluindo gravidade: ' + xg + ', ' + yg + ', ' + zg)

    var alpha = evento.rotationRate.alpha
    var beta = evento.rotationRate.beta 
    var gama = evento.rotationRate.gama
    exibir('Taxa de rotação: ' + alpha + ', ' + beta + ', ' + gama )

    exibir('Intervalo de atualização: ' + evento.interval)
}

if(window.DeviceMotionEvent) {
    window.ondevicemotion =  lidarMovimentoDispositivo
} else {
    exibir('Movimento do dispositivo não suportado.')
}