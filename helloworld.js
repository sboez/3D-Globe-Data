var container = document.getElementById("globalArea");
var containerChanged = document.getElementById("changedArea");

var controller = new GIO.Controller(container, {
	color : {
		surface: 0xA8E8FF,
		selected: 0xE2E2E2,
		in: 0x7F36FF,
		out: 0x001EE2,
		halo: 0xFFFFFF,
		background: 0x000000
	}
});
controller.onCountryPicked(callback);
controller.lightenMentioned(true);

var controllerChanged = new GIO.Controller(containerChanged);
controllerChanged.showOutOnly(true);

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
    // controllerChanged.addData(response.data);
  })
  .catch(function(error) {
    console.log(error);
  })
  .then(function() {
    controller.init();
    // controllerChanged.init();
  });

$("#enable").click(function() {
    controllerChanged.showOutOnly(true);
} );
$("#disable").click(function() {
    controllerChanged.showOutOnly(false);
} );
