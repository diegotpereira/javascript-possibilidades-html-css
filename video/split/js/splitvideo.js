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
                'outline'
            )
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
            `video[src="${primeiroVideo}"]`)
    }
}