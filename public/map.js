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

// marker click event
	vmap.on('click', function (evt) {
		var feature = vmap.forEachFeatureAtPixel(evt.pixel, function (feature) {
			return feature;
		});

		var targetObj = $("#mc_desc");
		var targetObj2 = $("#pos");
		var plates = ["43아3944", "34사5942", "32가5932", "38하3739", "20나4951"];
		var dust = 9 + (parseInt(Math.random() * 10) % 8);
		if (feature) {
			switch(feature.get("type")) {
				case "car":
					targetObj.html("<p>차량 상태: 양호</p><p>차량 번호: " + plates[ parseInt(Math.random() * 10) % plates.length ]) + "</p>";
					targetObj.append("<p>미세먼지: " + dust + " (pm1.0)</p>");
					break;
				case "sensor":
					targetObj.text("센서 상태: 양호");
					break;
				case "child":
					targetObj.text("아이 상태: 양호");
					break;
				default:
					targetObj.text("알 수 없는 존재");
			}

			targetObj2.html("위치: " + feature.get("x") + ", " + feature.get("y"));
		}
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
		"type": "car",
		"image": "/img/icon_car.png",
		"title": "차량",
		"contents": "감지된 차량입니다."
	}, {
		"type": "sensor",
		"image": "/img/icon_camera.png",
		"title": "센서",
		"contents": "센서 위치입니다.",
	}, {
		"type": "child",
		"image": "/img/icon_sister.png",
		"title": "아이",
		"contents": "아이가 안심할 수 있습니다."
	}];


	for(var i = 0; i < 1024; i++) {
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
		var newMarker = markerLayer.addMarker(vw.ol3.markerOption);
		newMarker.set("x", point.x);
		newMarker.set("y", point.y);
		newMarker.set("id", "marker-" + (i + 1));
		newMarker.set("type", selectData.type);
	}
}

// 초기화 시작
$(document).ready(function() {
  init_vworld_map();
});
