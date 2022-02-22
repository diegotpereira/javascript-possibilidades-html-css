'use strict'

var dataDiv = document.querySelector('#dado')

function log(mensagem) {
    dataDiv.innerHTML =  mensagem + '<br />' + dataDiv.innerHTML
}

var fonte = new EventSource('https://sse.now.sh/')

fonte.onmessage = function(e) {
    log(e.dado)
}