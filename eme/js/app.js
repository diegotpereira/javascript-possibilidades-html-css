'use strict'

var KEY = new Uint8Array([
    0xeb, 0xdd, 0x62, 0xf1, 0x68, 0x14, 0xd2, 0x7b,
  0x68, 0xef, 0x12, 0x2a, 0xfc, 0xe4, 0xae, 0x3c
])

var config = [{
    initDataTypes: ['webm'],
    videoCapabilities: [{
        contentType: 'video/webm; codecs="vp8"'
    }]
}]

var video = document.querySelector('video')
video.addEventListener('encrypted', lidarCriptografado, false)

navigator.requestMediaKeySystemAccess('org.w3.clearkey', config).then(
    function(keySystemAccess) {
        return keySystemAccess.createdMediaKeys()
    }
).then(
    function(createdMediaKeys) {
        return video.setMediaKeys(createdMediaKeys)
    }
).catch(
    function(error) {
        console.error('Falha ao configurar o MediaKeys', error)
    }
)

function lidarCriptografado(event) {
    console.log('evento criptografado', event)
    var sessao = video.mediaKeys.createSession()
    sessao.addEventListener('mensagem', lidarMensagem, false)
    sessao.generateRequest(event.initDataType, event.initData).catch(
        function(erro) {
            console.log('Falha ao configurar o MediaKeys', erro);
        }
    )
}

function lidarMensagem(evento) {
    console.log('evento mensagem: ', evento)

    var licensa = gerarLicensa(evento.mensagem)
    console.log('Licensa: ', licensa);

    var sessao = evento.target
    sessao.update(licensa).catch(
        function(erro) {
            console.log('Falha ao atualizar a sessão: ', erro);
        }
    )
}

function toBase64(u8arr) {
    return btoa(String.fromCharCode.apply(null, u8arr))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=*$/, '');
}


function gerarLicensa(mensagem) {
    var request = JSON.parse(new TextDecoder().decode(mensagem))

    console.assert(request.kids.length === 1)

    var keyObj = {
        kty: 'oct',
        alg: 'A128KW',
        kid: request.kids[0],
        k: toBase64(KEY)
    }
    return new TextDecoder().encode(JSON.stringify({
        key: [keyObj]
    }))
}