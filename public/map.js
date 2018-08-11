var vmap;
var zoomLevel = 14;
var markerLayer;

function init_vworld_map() {
	vw.ol3.MapOptions = {
		basemapType: vw.ol3.BasemapType.GRAPHIC
		, controlDensity: vw.ol3.DensityType.EMPTY
		, interactionDensity: vw.ol3.DensityType.BASIC
		, controlsAutoArrange: true
		, homePosition: vw.ol3.CameraPosition
		, initPosition: vw.ol3.CameraPosition
	};

	setTimeout(function() {
		addMarkerLayer();
	}, 1000);

	init_change_map();
}

function init_change_map() {
  vmap = new vw.ol3.Map("vmap",  vw.ol3.MapOptions); 
  
  init_map_event();
}

function init_map_event() {
  vmap.on("moveend", function(evt) {
    var center = vmap.getView().getCenter();
    $("#pos").html(center[0] + ", " + center[1]);
  });
}

function move(x,y,z){
	var _center = [ x, y ];

	var z = z;
	var pan = ol.animation.pan({
		duration : 300,
		source : (vmap.getView().getCenter())
	});
	vmap.beforeRender(pan);
	vmap.getView().setCenter(_center);
	
	zoomLevel = z;

	setTimeout("fnMoveZoom()", 300);
}

function fnMoveZoom() {
	zoom = vmap.getView().getZoom();
	vmap.getView().setZoom(zoomLevel);
}

function move_to_cityhall() {
	var point = {"x" : 14161676.156572415, "y" : 4528136.68129064, "z": 20};
	move(point.x, point.y, point.z);
}

// 마커 입력
function addMarkerLayer() {
	if (markerLayer != null) {
		vmap.removeLayer(markerLayer);
		markerLayer = null;
		vmap.getView().setCenter([ 14129709.590359, 4512313.7639686 ]);
		vmap.getView().setZoom(15);
	} else {
		markerLayer = new vw.ol3.layer.Marker(vmap);
		vmap.addLayer(markerLayer);
		addMarker();
		vmap.getView().setCenter([ 14115633.03459599, 4492228.092116951 ]);
		vmap.getView().setZoom(9);
	}
}

// 마커 추가
function addMarker() {
	var data = [{
		"image": "/img/icon_car.png",
		"title": "차량",
		"contents": "감지된 차량입니다."
	}, {
		"image": "/img/icon_camera.png",
		"title": "센서",
		"contents": "센서 위치입니다.",
	}, {
		"image": "/img/icon_sister.png",
		"title": "아이",
		"contents": "아이가 안심할 수 있습니다."
	}];

	for(var i = 0; i < 100; i++) {
		var point = {
			"x": 14161000.0 + (Math.random() * 1000),
			"y": 4528000.0 + (Math.random() * 1000),
			"z": 14
		};
		
		var selectData =  data[parseInt(Math.random() * 10) % data.length ];

		vw.ol3.markerOption = {
			x : point.x,
			y : point.y,
			epsg : "EPSG:900913",
			title : selectData.title,
			contents : selectData.contents,
			iconUrl : selectData.image
		};
		markerLayer.addMarker(vw.ol3.markerOption);
	}
}

// 초기화 시작
$(document).ready(function() {
  init_vworld_map();
});
