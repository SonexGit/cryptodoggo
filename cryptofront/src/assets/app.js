// var settings = {
// 	"url": "https://api.coincap.io/v2/assets",
// 	"method": "GET",
// 	"timeout": 0,
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

// charge le fichier json de test
var data;
$.getJSON("assets/data.json", function(json) {
	data = json.data;
	generateCryptoList(data);
});

function addCryptoline(element) {

	// crée une balise div avec la classe accordion-item
	var div = document.createElement("div")
	div.className = "accordion-item";

	// ajoute un header a la div
	var header = document.createElement("h2")
	header.className = "accordion-header";
	header.id = "panelsStayOpen-heading" + element.rank;
	div.appendChild(header);

	// ajoute un bouton au header
	var button = document.createElement("button");
	button.className = "accordion-button collapsed";
	button.type = "button";
	button.setAttribute("data-bs-toggle", "collapse");
	button.setAttribute("data-bs-target", "#panelsStayOpen-collapse" + element.rank);
	button.ariaExpanded = false;
	button.setAttribute("aria-controls", "panelsStayOpen-collapse" + element.rank);
	button.innerHTML = element.name;
	header.appendChild(button);

	// crée une balise div pour le body de l'accordion
	var divHead = document.createElement("div");
	divHead.id = "panelsStayOpen-collapse" + element.rank;
	divHead.className = "accordion-collapse collapse";
	divHead.setAttribute("aria-labelledby", header.id);

	// ajoute une div body
	var divBody = document.createElement("div");
	divBody.className = "accordion-body";

	// ajoute l'intérieur du body
	divBody.innerHTML = "<strong>GG</strong>";

	divHead.appendChild(divBody);
	header.append(divHead);

	document.getElementById("accordionPanelsStayOpenExample").appendChild(div);

}

function generateCryptoList(data) {
	data.forEach(element => addCryptoline(element))
}