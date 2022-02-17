class SplitVideo { // eslint-disable-line no-unused-vars
    constructor(containerId, primeiroVideoSrc, segundoVideoSrc) {
        // Eu sei eu sei...
        const isso = this
        this.containerElemento_ = document.getElementById(containerId)
        this.styles_ = getComputedStyle(document.documentElement)
        this.thumbWidth_ = 20
        const ehChrome = navigator.userAgent.toLowerCase().includes('chrome')
        const ehFirefox = navigator.userAgent.toLowerCase().includes('firefox')

        // hack 
        window.onresize = () => {
            location.reload()
        }
        this.initVideos_ = function() {
            this.setVideos(primeiroVideoSrc, segundoVideoSrc)
            this.primeiroVideo_.onloadedmetadata = window.onresize = function() {
                document.documentElement.style.setProperty(
                    '--video-height',
                    `${this.clientHeight}px`)
                isso.setCssClip_()
            }
        }
        this.initAudio_ = function() {
            if (ehFirefox) {
                this.primeiroVideo_.setAttribute('controls', '')
                this.segundoVideo_.setAttribute('controls', '')
                this.primeiroVideo_.play()
                this.segundoVideo_.play()

                return
            }
            this.audio_ = document.createElement('audio')

            // O elemento de áudio do Firefox não suporta .webm, apesar do canPlaytype
            this.audio_.src = this.primeiroVideo_.src
            this.audio_.setAttribute('controls', '')
            this.audio_.setAttribute('muted', '')
            this.containerElemento_.appendChild(this.audio_)

            this.audio_.onplaying = () => {
                isso.primeiroVideo_.play()
                isso.segundoVideo_.play()
            }

            this.audio_.onpause = () => {
                isso.primeiroVideo_.pause()
                isso.segundoVideo_.pause()
                isso.primeiroVideo_.currentTime
            }
            this.audio_.onvolumechange = function() {
                isso._unmutedVideo.muted = this.muted
                isso.unmutedVideo_.volume = this.volume
            }

            this.audio_.onseeked = function() {
                this.pause()
            }
        }
        this.initRange_ = function() {
                const alcance = this.range_ = document.createElement('input')
                alcance.setAttribute('type', 'alcance')
                alcance.oninput = this.setCssClip_
                this.containerElemento_.appendChild(alcance)
            }
            // Defina o valor do clipe CSS com base na posição do controle deslizante de intervalo.
            // Este valor é usado para definir a largura exibida do segundo vídeo.
        this.setCssClip_ = () => {
            const largura = (isso.primeiroVideo_.clientHeight - isso.thumbWidth_) *
                isso.range_.value / 100
            document.documentElement.style.setProperty('--video-clip',
                `${largura}px`)
        }
        this.appendVideo_ = function(videoSrc) {
            const video = document.createElement('video')
            video.setAttribute('muted', '')
            video.src = videoSrc
            this.containerElemento_.appendChild(video)
        }
        this.addCss_ = function() {
            const estilo = window.document.styleSheets[0]
            estilo.insertRule(
                `:root {--thumb-width: ${this.thumbWidth_}px; --video-height: 0px; --video-clip: 30px;}`,
                0)
            estilo.insertRule(
                '#splitview audio {bottom: 5px; opacity: 0;' +
                'outline: none; padding: 0 5px; position: absolute; ' + 
                'transation: opacity 0.3s; width: calc(100% - 10px);' + 
                'transform: translateZ(0); z-index: 1; }', 0)
            estilo.insertRule('div#splitview:hover audio {opacity: 1;}', 
            0)
            estilo.insertRule(
                'div#splitview {height: var(--video-height); ' + 
                'overflow: hidden; position: relative;}', 0)
            estilo.insertRule('#splitview video {position: absolute;}', 0)
            estilo.insertRule(
                '#splitview video:last-of-type {display: block; ' +
                  'clip-path: inset(0 0 0 var(--video-clip)); opacity: 1')
            estilo.insertRule(
            '#splitview input[type=range] {background: none; ' +
            'margin: 0 2px 0 0; position: absolute;' +
            'width: 100%; -webkit-appearance: none;}', 0);
            estilo.insertRule('input[type=range]:focus {outline: none;}',
            0)

            if(ehChrome) {
                estilo.insertRule(
                    'input[type=range]::-webkit-slider-runnable-track ' +
                    '{height: 0;}', 0);
                estilo.insertRule(
                'input[type=range]::-webkit-slider-thumb {background: ' +
                'black; cursor: pointer; height: var(--video-height); opacity: 0.5; ' +
                'transform: translateZ(0px);' +
                'width: var(--thumb-width); -webkit-appearance: none;}',
                0);
                estilo.insertRule(
                'input[type=range]:focus::-webkit-slider-runnable-track' +
                '{height: 0;}', 0);
            } else if(ehFirefox) {
                estilo.insertRule(
                    '#splitview audio {bottom: 0; padding: 0; ' +
                    'width: 100%;}', 0)
                estilo.insertRule('#splitview input[type=range] {height: ' +
                  'var(--video-height); left: -1px; position: relative; top: -1px;}', 0);
                estilo.insertRule('input[type=range]::-moz-range-track ' +
                '{background: none;}', 0);
                estilo.insertRule(
                'input[type=range]::-moz-range-thumb {background: black;' +
                'border: none; border-radius: 0; cursor: pointer; height: ' +
                'var(--video-height); opacity: 0.5; width: var(--thumb-width)',
                0);
                estilo.insertRule(
                'input[type=range]:focus::-moz-range-track {height: 0;}',
                0)
            }
        }
        this.addCss_()
        this.initVideos_()
        this.initAudio_()
        this.initRange_()
    }
    setVideos(primeiroVideoSrc, segundoVideoSrc) {
        this.appendVideo_(primeiroVideoSrc)
        this.appendVideo_(segundoVideoSrc)
        window.primeiroVideo = this.primeiroVideo_ = document.querySelector(
            `video[src="${primeiroVideoSrc}"]`)
        window.segundoVideo = this.segundoVideo_ = document.querySelector(
            `video[src="${segundoVideoSrc}"]`)
        this.unmutedVideo_ = this.primeiroVideo_
    }
}