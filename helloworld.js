var container = document.getElementById("globalArea");

var controller = new GIO.Controller(container, {
	color : {
		surface: 0xA8E8FF,
		selected: 0xE2E2E2,
		in: 0x7F36FF,
		out: 0x001EE2,
		halo: 0xFFFFFF,
		background: 0x000000
	},
  brightness: {
    related: 1
  }
});

controller.onCountryPicked(callback);
controller.setInitCountry("FR");
controller.showOutOnly(false);
controller.showInOnly(false);

function callback (selectedCountry) {
    $("#countryArea").text(selectedCountry.name + " picked!");
    // window.location.href = "https://bl.ocks.org/mbostock/7607535";
    $("#infoBoard").fadeIn(300);
    setTimeout(function() {
        $("#infoBoard").fadeOut(1000);
    }, 3000);
}

axios.get('test_data.json')
  .then(function (response) {
    controller.addData(response.data);
  })
  .catch(function(error) {
    console.log(error);
  })
  .then(function() {
    controller.init();
  });

function showOut(show) {
  controller.showOutOnly(show);
}

function showIn(show) {
  controller.showInOnly(show);
}

function showAll(show) {
  controller.showInOnly(show);
  controller.showOutOnly(show);
}

var d3Graphs = {
  tiltBtnInterval: -1
}

function showHud() {
  $("#hudButtons").show();
  $(".tiltBtn").on('mousedown touchstart', d3Graphs.tiltBtnClick);
  $(".tiltBtn").on('mouseup touchend touchcancel', d3Graphs.tiltBtnMouseup);
}

function tiltBtnClick() {
    var delta;
    if($(this).hasClass('sideViewBtn')) {
      delta = 10;
    } else {
      delta = -10;
    }
    d3Graphs.doTilt(delta);
    d3Graphs.tiltBtnInterval = setInterval(d3Graphs.doTilt, 50, delta);
}

function doTilt(delta) {
  tilt += delta * 0.01;
  tilt = constrain(tilt, 0, Math.PI / 2);
  camera.position.y = 300 * Math.sin(-tilt);
  camera.position.z = 100 + 300 * Math.cos(-tilt);
  camera.lookAt(new THREE.Vector3(0, 0, 300));
  tiltTarget = undefined;
}
