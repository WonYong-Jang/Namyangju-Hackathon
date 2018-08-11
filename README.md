# Namyangju-Hackathon

## Yolo 설치 과정 

Requires: 

- Node version ( v10.2.1 으로 진행 )  // ==> v10.2.0 에러 발생
- OpenCV (version 2, for example, 2.4.9.1) to be installed on your system.
- opencv 설치 ( 버전 3.x 이상은 에러가 발생해서 2.x으로 진행 )
```
$ brew install opencv@2
$ sudo chown -R $(whoami):admin /usr/local
$ brew link --force opencv@2
```

```
$ git clone https://github.com/OrKoN/darknet
$ cd darknet
$ vi Makefile
OPENCV , GPU 가 0으로 설정되어 있는데 이부분을 1로 설정 ! 
```
<img width="554" alt="2018-08-06 1 16 56" src="https://user-images.githubusercontent.com/26623547/43687776-824e0d10-9916-11e8-94a3-72296c5e70c8.png">

```
$ make

$ wget http://pjreddie.com/media/files/yolo.weights  # 오픈되어있는 학습데이터 

$ ./darknet detect cfg/yolo.cfg yolo.weights data/dog.jpg     # dog 그림이 있는 사진으로 detect
$ ./darknet detector demo cfg/coco.data cfg/yolo.cfg yolo.weights    # 동영상 detect
```

## moovel/node-yolo 

```
const darknet = require('@moovel/yolo');

darknet.detectImage({
  cfg: './cfg/yolo.cfg',
  weights: './yolo.weights',
  data: './cfg/coco.data',
  image: './data/dog.jpg',
  thresh: 0.24, // optional, default: 0.24
  hierThresh: 0.5, // optional, default: 0.5,
}, function(modified, original, detections, dimensions) {
```

- 참고 링크 : https://github.com/moovel/node-yolo/blob/master/README.md

## OPEN API : 2D지도 API 2.0 레퍼런스 

- http://dev.vworld.kr/dev/v4dv_opn2dmap2guide_s001.do 
- [OpenLayers3] 지도 상에 포인트 마커 표시 및 클릭
- 참고 링크 : http://www.gisdeveloper.co.kr/?p=2502

## AdminLTE 

 - Bootstrap 기반의 Admin 사이트를 쉽게 개발하게 해주는 템플릿
 - javascript 라이브러리를 사용하여 만들어져 있고, 관리자 사이트에 필요한 다양한 차트 등을 제공
 - https://github.com/almasaeed2010/AdminLTE 
 - branch  ->  v3-dev 브랜치 선택  -> $ git clone -b v3-dev https://github.com/almasaeed2010/AdminLTE.git (vendor 폴더에 설치)
