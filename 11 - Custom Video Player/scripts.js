/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullScreen');

/* Build functions */
function togglePlay() {
  if(video.paused) {
    video.play()
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  //dataset.skip is a string, so need to parseFloat it to convert to number
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  //the video property is set as this.name and could just set that to
  //this.value, i.e. video[volume] = 1.2;
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(scrubTime);
}

function enterFullScreen() {
  video.webkitRequestFullscreen();
}

/* Hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
});

ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeUpdate);
});

let mouseDown = false;
progress.addEventListener('click', scrub);
//will first check to see if mouseDown is true, if it is, it will move on to scrub, if
//not it will just return false. Similar to an if statement seeing if mouseDown is
//true then run scrub
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', enterFullScreen);

console.dir(video);


