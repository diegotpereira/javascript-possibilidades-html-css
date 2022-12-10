var constraints = {
    video: true
}

var successCallback = function(localMediaStream) {
    window.stream = localMediaStream
    window.mediaStreamTrackList = stream.getVideoTracks()
    mediaStreamTrackList.onaddtrack = function(e) {
        console.log(e)
    }
    mediaStreamTrackList.onremovetrack = function(e) {
        console.log(e)
    }
    window.mediaStreamTrack = mediaStreamTrackList[0]
    var kind = mediaStreamTrack.kind
    var label = mediaStreamTrack.label
    var video = document.querySelector('video')
    video.srcObject = localMediaStream
}

var errorCallback = function(erro) {
    console.log('navigator.getUserMedia error: ', erro);
}
navigator.mediaDevices.getUserMedia(constraints)
    .then(successCallback, errorCallback)