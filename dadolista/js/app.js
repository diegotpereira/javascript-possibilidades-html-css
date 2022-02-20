'use strict'

const alcance = document.querySelector('input[type=range]')
const saida = document.querySelector('output')

saida.value = alcance.value 

alcance.oninput = function() {
    saida.value = alcance.value
}