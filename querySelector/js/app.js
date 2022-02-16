'use strict'

var dado = document.querySelector('p#dado')

function exibir(mensagem) {
    dado.innerHTML += mensagem + '<br />'
}

exibir('innerHTML para p#betty usando querySelector(\'p#betty\'): ')
console.log(document.querySelector('p#betty').innerHTML)

exibir('<br /> innerHTML forEach p.rubble usando querySelectoAll(\'p.rubble\'): ')
var rubbles = document.querySelectorAll('p.rubble')

for (var index = 0; index !== rubbles.length; index++) {
    exibir(rubbles[index].innerHTML)
}

exibir('<br />innerHTML para parágrafos ímpares' +
    ' usando querySelectorAll(\'div#bedrock p:nth-child(odd)\'): ')

var paragrafosImpar = document.querySelectorAll('div#bedrock p:nth-child(odd)')

for (index = 0; index !== paragrafosImpar.length; ++index) {
    exibir(paragrafosImpar[index].innerHTML)
}