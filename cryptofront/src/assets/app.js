// var settings = {
// 	"url": "https://api.coincap.io/v2/assets",
// 	"method": "GET",
// 	"timeout": 0,
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

// charge le fichier json de test
var data = null;
function chargerJSON() {
	$.getJSON("assets/data.json", function(json) {
		data = json;
	}, successJSON(data));
}
function successJSON(data) {
	return data;
}
data = chargerJSON();

var json = require("assets/data.json");

function addCryptoline() {

	// crée une balise div avec la classe accordion-item
	var newDiv = document.createElement("div")
	newDiv.className = "accordion-item";

	// ajoute un header a la div
	var newHeader = document.createElement("h2")
	newHeader.className = "accordion-header";
	newHeader.id = "panelsStayOpen-heading" + data[0].rank;
	console.log(newHeader.id);
	newDiv.appendChild(newHeader);

}

addCryptoline.call();