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

function getDataHistory(name) {
    $.getJSON("assets/history.json", function(json) {
        dataHistory = json.data;
        return dataHistory;
    });
}
var dataHistory = getDataHistory("BTC");

function traiterPrix(unPrix) {
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

var chart = new Array();

function loadGraph(rank, etat) {

    var divChart = document.getElementById("chart" + rank);
    var button = document.getElementById("accordion-button" + rank);

    if (etat == "open") {
        // affichage du graph
        button.setAttribute("onclick", "loadGraph(" + rank + ", 'close')")
        const options = loadGraphData(1);
        chart[rank] = new ApexCharts(document.querySelector("#chart" + rank), options);
        chart[rank].render();

        // affichage des changements de fenêtre de temps
        var list = document.createElement('ul');
        // innerhtml :
        // <ul>
        //   <li>1H</li>
        //   <li>1J</li>
        //   <li>1S</li>
        //   <li>1M</li>
        //   <li class="active">1A</li>
        // </ul>
    } 
    else {
        button.setAttribute("onclick", "loadGraph(" + rank + ", 'open')")
        chart[rank].destroy();
    }
}

function loadGraphData(rank) {

    // on initialise notre graph avec des valeurs de base
    var options = {
        chart: {
            height: 250,
            type: 'area'
        },
        series: [{
            name: '',
            data: []
        }],
        xaxis: {
            type: 'datetime',
            categories: []
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "$";
                }
            },
        },
        colors: [ '#ffc850' ],
        fill: {
            colors: [ '#ffc850' ]
        },
        tooltip: {
            x: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        }
    }

    for (var elem in dataHistory) {
        options.series[0].data.push(Number(dataHistory[elem].priceUsd).toFixed(2));
        options.xaxis.categories.push(dataHistory[elem].date);
    }

    return options;

}

function addCryptoline(element) {

    // crée une balise div avec la classe accordion-item
    var div = document.createElement("div");
    div.className = "accordion-item";

    // ajoute un header a la div
    var header = document.createElement("h2");
    header.className = "accordion-header";
    header.id = "panelsStayOpen-heading" + element.rank;
    div.appendChild(header);

    // ajoute un bouton au header
    var button = document.createElement("button");
    button.className = "accordion-button collapsed";
    button.type = "button";
    button.id = "accordion-button" + element.rank;
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#panelsStayOpen-collapse" + element.rank);
    button.ariaExpanded = false;
    button.setAttribute("aria-controls", "panelsStayOpen-collapse" + element.rank);
    // button.innerHTML = element.name;
    button.setAttribute("onclick", "loadGraph(" + element.rank + ", 'open')")
    header.appendChild(button);

    // ajoute un tableau à l'intérieur du bouton
    button.innerHTML = "<table class='header-left'><tr><td>#" + element.rank + "</td><td><img src='assets/img/logoCM/" + element.symbol + ".png' width='40px' /></td><td>" + element.name + "</td><td class='legendSymbol'>" + element.symbol + "</td></table>";
    var colorVariation
    if (element.changePercent24Hr < 0) {
        colorVariation = "red-variation";
    } else if (element.changePercent24Hr > 0) {
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

    // ajoute une div pour le graph dans l'accordion
    var divGraph = document.createElement("div");
    divGraph.id = "chart" + element.rank;
    divBody.appendChild(divGraph);

    divHead.appendChild(divBody);
    header.append(divHead);

    document.getElementById("accordionPanelsStayOpenExample").appendChild(div);
}

function generateCryptoList(data) {
    data.forEach(element => addCryptoline(element))
}

function generateVariation(data) {
    var tempVarHausse = 0.0;
    var tempVarBaisse = 0.0;
    var h3hausse = document.createElement("h4");
    var h3baisse = document.createElement("h4");

    for (const element of data) {

        if (element.changePercent24Hr > 0) {
            if ((element.changePercent24Hr - tempVarHausse) > 0) {
                tempVarHausse = element.changePercent24Hr;
            }
        } else {
            if ((element.changePercent24Hr - tempVarBaisse) < 0) {
                tempVarBaisse = element.changePercent24Hr;
            }
        }

    }

    h3hausse.innerHTML = traiterPrix(tempVarHausse) + "%";
    h3baisse.innerHTML = traiterPrix(tempVarBaisse) + "%";
    document.getElementById("hausse").appendChild(h3hausse);
    document.getElementById("baisse").appendChild(h3baisse);
}