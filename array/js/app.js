'use strict'

var dado = document.getElementById('dado')

function log(mensagem) {
    dado.innerHTML += mensagem + '<br />'
}

var Pessoa = function(nome, email) {
    this.nome = nome
    this.email = email
}

var barney = new Pessoa('Barney Rubble', 'barney@rubble.com')
var betty = new Pessoa('Betty Rubble', 'betty@rubble.com')
var fred = new Pessoa('Fred Flintstone', 'fred@flintstone')
var wilma = new Pessoa('Wilma Flintstone', 'wilma@flintstone')

var pessoa = [barney, betty, fred, wilma]

// O método replace() retorna uma nova string com algumas 
// ou todas as correspondências de um padrão substituídas 
//por um determinado caractere (ou caracteres). O padrão 
//pode ser uma string ou uma RegExp, e a substituição pode 
//ser uma string ou uma função a ser chamada para cada 
// correspondência. Se o padrão for uma string, apenas a 
// primeira ocorrência será substituída.
log('Array:<br />' + JSON.stringify(pessoa).replace(/},/g, '}, <br />') + '<br />')




// O método filter() cria um novo array com todos os elementos 
// que passaram no teste implementado pela função fornecida.
var rubbles = pessoa.filter(function(elemento, index, array) {
    return elemento.email.indexOf('rubble') !== -1
})

rubbles.forEach(function(elemento, index, array) {
    log(elemento.nome + ' ')
})

log('Use filter() e forEach() para mostrar às pessoas com e-mails rubble.com:')

// O método some() testa se ao menos um dos elementos no array 
// passa no teste implementado pela função atribuída e retorna 
// um valor true ou false.
var temFlintstones = pessoa.some(function(elemento, index, array) {
    // O método indexOf() retorna o índice da primeira ocorrência 
    // do valor fornecido em searchValue, começando a busca a partir 
    // de fromIndex. Retorna -1 se o valor não for encontrado.
    return elemento.nome.indexOf('Flintstone') !== -1
})

log('<br />Use some() para verificar se o array contém algum Flintstones:<br />' +
    'algum Flintstone?' + temFlintstones)

// O método every() testa se todos os elementos do array passam 
// pelo teste implementado pela função fornecida.
var todosFlintstones = pessoa.every(function(elemento, index, array) {
    return elemento.nome.indexOf('Flintstone') != -1
})

log('<br />Use every() para verificar se o array é com todos Flintstones:<br />' +
    'todos Flintstones? ' + todosFlintstones)

// O método map() invoca a função callback passada por argumento 
// para cada elemento do Array e devolve um novo Array como resultado.
var primeiroNomes = pessoa.map(function(elemento, index, array) {
    return elemento.nome.split(' ')[0]
})

log('<br />Use map() para construir uma matriz de nomes:<br />' +
    JSON.stringify(primeiroNomes))