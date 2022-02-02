// var settings = {
// 	"url": "https://api.coincap.io/v2/assets",
// 	"method": "GET",
// 	"timeout": 0,
// };

// var data;
// $.ajax(settings).done(function (response) {
// 	console.log(response);
//  data = response.data;
// 	generateCryptoList(data);
// });

// charge le fichier json de test
var data;
$.getJSON("assets/data.json", function(json) {
	data = json.data;
	generateCryptoList(data);
	generateVariation(data);
});

function traiterPrix(unPrix){
	var decimal = unPrix - Math.floor(unPrix);
	if (decimal > 0.0099999999) {
		unPrix = Math.round(unPrix * 100) / 100;
	} else if (decimal > 0.0009999999) {
		unPrix = Math.round(unPrix * 1000) / 1000;
	} else if (decimal > 0.0000999999) {
		unPrix = Math.round(unPrix * 10000) / 10000;
	} else if (decimal > 0.0000099999) {
		unPrix = Math.round(unPrix * 100000) / 100000;
	} else if (decimal > 0.0000009999) {
		unPrix = Math.round(unPrix * 1000000) / 1000000;
	} else if (decimal > 0.0000000999) {
		unPrix = Math.round(unPrix * 10000000) / 10000000;
	} else if (decimal > -0.0000000999) {
		unPrix = Math.round(unPrix * 10000000) / 10000000;
	} else if (decimal > -0.0099999999) {
		unPrix = Math.round(unPrix * 100) / 100;
	} else if (decimal > -0.0009999999) {
		unPrix = Math.round(unPrix * 1000) / 1000;
	} else if (decimal > -0.0000999999) {
		unPrix = Math.round(unPrix * 10000) / 10000;
	} else if (decimal > -0.0000099999) {
		unPrix = Math.round(unPrix * 100000) / 100000;
	} else if (decimal > -0.0000009999) {
		unPrix = Math.round(unPrix * 1000000) / 1000000;
	}
	return unPrix;
}

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
	// button.innerHTML = element.name;
	header.appendChild(button);
	
	// ajoute un tableau à l'intérieur du bouton
	button.innerHTML = "<table class='header-left'><tr><td>#" + element.rank + "</td><td><img src='assets/img/logoCM/" + element.symbol + ".png' width='40px' /></td><td>" + element.name + "</td></table>";
	var colorVariation
	if (element.changePercent24Hr < 0) {
		colorVariation = "red-variation";
	}
	else if (element.changePercent24Hr > 0) {
		colorVariation = "green-variation"
	}
	
	var priceText = "<h2 class='legendHeader'>Prix</h2>";
	button.innerHTML += "<table class='header-right'><tr><td>" + priceText + traiterPrix(element.priceUsd) + "$</td><td class='" + colorVariation + "' >" + (Math.round(element.changePercent24Hr * 100) / 100) + "%</td></tr></table>";

	// crée une balise div pour le body de l'accordion
	var divHead = document.createElement("div");
	divHead.id = "panelsStayOpen-collapse" + element.rank;
	divHead.className = "accordion-collapse collapse";
	divHead.setAttribute("aria-labelledby", header.id);

	// ajoute une div body
	var divBody = document.createElement("div");
	divBody.className = "accordion-body";
	
	// ajoute l'intérieur du body
	divBody.innerHTML = '<apx-chart id="chart" [series]="series" [chart]="chart" [title]="title"></apx-chart>';

	divHead.appendChild(divBody);
	header.append(divHead);

	document.getElementById("accordionPanelsStayOpenExample").appendChild(div);

}

function generateCryptoList(data) {
	data.forEach(element => addCryptoline(element))
}

function generateVariation(data){
	var tempVarHausse = 0.0;
	var tempVarBaisse = 0.0;
	var h6hausse = document.createElement("h6");
	var h6baisse = document.createElement("h6");

	for (const element of data) {

		if(element.changePercent24Hr > tempVarHausse){
			tempVarHausse = element.changePercent24Hr;
		}
	
		if(element.changePercent24Hr < tempVarBaisse){
			tempVarBaisse = element.changePercent24Hr;
		}
	
	}

	h6hausse.innerHTML = tempVarHausse + "%";
	h6baisse.innerHTML = tempVarBaisse + "%";
	document.getElementById("hausse").appendChild(h6hausse);
	document.getElementById("baisse").appendChild(h6baisse);
}