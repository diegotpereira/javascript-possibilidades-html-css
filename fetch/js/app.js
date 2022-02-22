'use strict'

var dado = document.getElementById('dado')

fetch('json/foo.json').then(function(response) {
    return response.json()
}).then(function(j) {
    dado.textContent = 'JSON buscado:\n\n' + JSON.stringify(j, null, 2)
})