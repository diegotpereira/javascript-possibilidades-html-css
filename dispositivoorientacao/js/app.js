'use strict'

var logoElemento = document.getElementById('orientando')

function  lidarDispositivoOrientacao(e) {
    var transform = 'rotate(' + e.gamma + 'deg) rotate3d(1, 0, 0, ' +
    e.beta + 'deg)'
    logoElemento.style.webkitTransform = transform
    logoElemento.style.transform = transform
}

if (window.DeviceOrientationEvent) {
    
    window.ondeviceorientation = lidarDispositivoOrientacao
} else {
    document.querySelector('p#estaDisponivel').innerHTML = 
    'A orientação do dispositivo não está disponível.'
}