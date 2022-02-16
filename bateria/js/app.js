'use strict'

function exibir(mensagem) {
    document.querySelector('#dado').innerHTML += mensagem + '<br />'
}

function logBateria(battery) {
    window.battery = battery
    console.log('Bateria: ', battery)
    exibir('Bateria nível: ' + battery.level)
    exibir('Bateria carregando: ' + battery.charging)

    if (battery.dischargingTime) {
        exibir('Bateria tempo de descarga: ' + battery.dischargingTime)
    }

    battery.addEventListener('mudancaCarregamento', function() {
        exibir('Bateria evento mudança carregamento: ' + battery.charging)
    }, false)
}

if (navigator.getBattery) {
    navigator.getBattery().then(logBateria, function() {
        exibir('Ocorreu um erro ao obter o estado da bateria.')

    })
} else if (navigator.battery) {
    logBateria(navigator.battery)
} else {
    exibir('Vergonha! API Bateria não é compatível com esta plataforma.')
}