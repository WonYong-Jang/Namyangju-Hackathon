const express = require('express');
var router = express.Router();
//const darknet = require('@moovel/yolo');
const fs = require('fs');

var app = express();
var sendDetections;

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));
app.use('/public', express.static('public'));

app.get('/', function(req,res) {
  res.send('hello');
});

app.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

app.use('/roadPage', function(req, res) {
  res.render('roadPage');
});

/*
app.post('/sendDetectInfo', function(req, res) {

  res.send( sendDetections );
});

//./darknet detector demo cfg/coco.data cfg/yolo.cfg yolo.weights <video file>
darknet.detect({
  cfg: './cfg/yolo.cfg',
  weights: './yolo.weights',
  data: './cfg/coco.data',
  cameraIndex: 0, // optional, default: 0,
  video: './test2.mp4', // optional, forces to use the video file instead of a camera
  thresh: 0.24, // optional, default: 0.24
  hierThresh: 0.5, // optional, default: 0.5
}, function(modified, original, detections, dimensions) {
  //console.log(modified.length, original.length, detections, dimensions);
  console.log(detections);

  sendDetections = detections;

  //var jsonData = JSON.stringify(detections);
  //console.log(jsonData);
*/
  //fs.writeFileSync('./data.modified.raw', modified);
  // ffmpeg -f rawvideo -s 768x576 -pix_fmt bgr24 -i data.raw data.png
  //fs.writeFileSync('./data.raw', original);
  // ffmpeg -f rawvideo -s 768x576 -pix_fmt bgr24 -i data.modified.raw data.png
  /*
  modified - raw frame with detections drawn, rgb24 format
  original - raw frame, as captured by the webcam/video, rgb24 format,
  detections - array of detections
  dimenstions - image width and height
  */
//});


app.listen(3007, function() {
  console.log('Example app listening on port 3007!');
  console.log('http://localhost:3007/');
});
