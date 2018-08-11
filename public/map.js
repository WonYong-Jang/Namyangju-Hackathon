var vmap;
var zoomLevel = 14;

function init_vworld_map() {
  vw.ol3.MapOptions = {
      basemapType: vw.ol3.BasemapType.GRAPHIC
    , controlDensity: vw.ol3.DensityType.EMPTY
    , interactionDensity: vw.ol3.DensityType.BASIC
    , controlsAutoArrange: true
    , homePosition: vw.ol3.CameraPosition
    , initPosition: vw.ol3.CameraPosition
   };

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
	//if (16 > zoom) {
	//	vmap.getView().setZoom(zoomLevel);
	//}
	vmap.getView().setZoom(zoomLevel);
}

function move_to_cityhall() {
	var point = {"x" : 14161676.156572415, "y" : 4528136.68129064, "z": 20};
	move(point.x, point.y, point.z);
}

$(document).ready(function() {
  init_vworld_map();
});
