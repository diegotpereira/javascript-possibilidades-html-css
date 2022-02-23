'use strict'

function HandleClick() {
    var video = this.querySelector('video')

    video.requestFullScreen = video.requestFullScreen ||
        video.webkitRequestFullScreen || mozRequestFullScreen
    video.requestFullScreen()
}

var videoContainers = document.querySelectorAll('div.videoContainer')

for (var index = 0; index !== videoContainers.length; index++) {
    videoContainers[index].onclick = HandleClick
}