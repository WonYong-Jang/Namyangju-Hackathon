const darknet = require('@moovel/yolo');
const fs = require('fs');

darknet.detect({
  cfg: './cfg/yolo.cfg',
  weights: './yolo.weights',
  data: './cfg/coco.data',
  cameraIndex: 0, // optional, default: 0,
  video: './test.mp4', // optional, forces to use the video file instead of a camera
  thresh: 0.24, // optional, default: 0.24
  hierThresh: 0.5, // optional, default: 0.5
}, function(modified, original, detections, dimensions) {
  //console.log(modified.length, original.length, detections, dimensions);
  var len = detections.length, cnt =0;
  for(var i = 0; i< len; i++)
  {
    if(detections[i].name == 'car' || detections[i].name == 'truck') cnt++;
  }
  console.log("탐지된 차량 수 : "+ cnt);
  console.log(detections);
  //var jsonData = JSON.stringify(detections);
  //console.log(jsonData);

  //fs.writeFileSync('./data.modified.raw', modified);
  // ffmpeg -f rawvideo -s 768x576 -pix_fmt bgr24 -i data.raw data.png
  //fs.writeFileSync('./data.raw', original);
  // ffmpeg -f rawvideo -s 768x576 -pix_fmt bgr24 -i data.modified.raw data.png
});
/*
modified - raw frame with detections drawn, rgb24 format
original - raw frame, as captured by the webcam/video, rgb24 format,
detections - array of detections
dimenstions - image width and height
*/