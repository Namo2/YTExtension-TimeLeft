main();

function main() {
    const timeLeftSpan = createSpan();
    addNodeToVideoBar(timeLeftSpan);
    setUpVideo(timeLeftSpan);
}

function createSpan() {
    const timeLeftNode = document.createElement('span');
    timeLeftNode.className = "ytp-time-left";

    return timeLeftNode;
}

function addNodeToVideoBar(timeLeftSpan) {
    // get the video time spans
    let videoTimeDisplayElements = document.getElementsByClassName("ytp-time-display");
    if (videoTimeDisplayElements === undefined || videoTimeDisplayElements.length === 0)
        return;

    let videoTimeDisplayElement = videoTimeDisplayElements[0];
    if (videoTimeDisplayElement.childNodes.length < 2)
        return;

    let videoTimeSpans = videoTimeDisplayElement.childNodes[1];

    // add timeLeft span
    videoTimeSpans.appendChild(timeLeftSpan);
}

function setUpVideo(timeLeftSpan) {
    // find Video
    const videoElements = document.getElementsByClassName("video-stream");
    if (videoElements === undefined || videoElements.length === 0)
        return;

    const video = videoElements[0];

    // add update calls on time or speed changes
    video.ontimeupdate = () => updateTimeLeft(video, timeLeftSpan);
    video.onratechange = () => updateTimeLeft(video, timeLeftSpan);

    // set initial value
    updateTimeLeft(video, timeLeftSpan);
}

function updateTimeLeft(video, timeLeftSpan) {
    let timeLeft = 0;
    if (video.playbackRate !== 0)
        timeLeft = (video.duration - video.currentTime) / video.playbackRate;

    if (timeLeftSpan !== undefined)
        timeLeftSpan.innerText = " (-" + toTimeString(timeLeft) + ")";
}

/**
 * Formats the given seconds into a string in the format HH:MM:SS
 * @param secs
 * @returns {string}
 */
function toTimeString(secs) {
    let sec_num = parseInt(secs, 10) + 1;
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
}