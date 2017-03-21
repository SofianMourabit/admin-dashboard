'use strict';
$('video').mediaelementplayer();
let i = 0;
const captionWrapper = document.querySelector('.container');
const span = document.querySelectorAll('main span');
const captionTime = [
  [0, 4.130],
  [4.130, 7.535],
  [7.535, 11.270],
  [11.270, 13.960],
  [13.960, 17.940],
  [17.940, 22.370],
  [22.370, 26.880],
  [26.880, 30.920],
  [30.920, 34.730],
  [34.730, 39.430],
  [39.430, 41.190],
  [41.190, 46.300],
  [46.300, 49.270],
  [49.270, 53.760],
  [53.760, 57.780],
  [57.780, 61]
];
function highlightCaption(caption, hightlight = 'yes'){
  if (hightlight === 'yes'){
    caption.classList.add("highlight");
  }else if(hightlight === 'clear') {
    caption.classList.remove("highlight");
  }
}
// Click on caption text to nagivate video
captionWrapper.addEventListener('click', (event) => {
  // Clear Highlight
  for(let j = 0; j < span.length; j+= 1){
    if(span[j].className === "highlight"){
      highlightCaption(span[j], 'clear');
    }
  }
  // Jump video to the caption's start time
  let startTime = event.target.id;
  video.setCurrentTime(captionTime[startTime][0]);
  i = startTime;
});
// Highlight captions
video.addEventListener('timeupdate', () => {
  let caption = document.getElementById(i);
  if (video.getCurrentTime() >= captionTime[i][0] &&  video.getCurrentTime() < captionTime[i][1]){
    highlightCaption(caption);
  }else{
    highlightCaption(caption, 'clear');
    i++;
  }
});
