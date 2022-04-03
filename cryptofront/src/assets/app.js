// var settings = {
// 	"url": "https://api.coincap.io/v2/assets",
// 	"method": "GET",
// 	"timeout": 0,
// };

// var data;
// $.ajax(settings).done(function (response) {
//     console.log(response);
//     data = response.data;
//     generateCryptoList(data);
// });

function Timer(timeout) {
    this.interval = timeout ? timeout : 30000;   // Default

    this.run = function () {
        setInterval(function () {

            $.ajax({
                url: "https://api.coincap.io/v2/assets",
                async: false,
                dataType: 'json',
                success: function (json) {
                    data = json.data;
                    convertir(monnaieId, data);
                    document.getElementById("accordionPanelsStayOpenExample").innerHTML = "";
                    generateCryptoList(data);
                    generateVariation(data);
                }
            });

            $('.progress-bar').css('display', 'none');

        }, this.interval);
        setInterval(function () {
            var pourcent = 0;
            var counterBack = setInterval(function () {
                pourcent++;
                if (pourcent < 101) {
                    $('.progress-bar').css('display', 'flex');
                    $('.progress-bar').css('width', pourcent + '%');
                }
                else {
                    clearInterval(counterBack);
                }
            }, this.interval / 100);
        }, this.interval * 0.933333333333333);
    };

}

var timer = new Timer(30000);
timer.run();

var dataRates;
$.ajax({
    url: 'https://api.coincap.io/v2/rates',
    async: false,
    dataType: 'json',
    success: function (json) {
        dataRates = json.data;
    }
});

var data;
var monnaie;
var monnaieId = "euro";

$.ajax({
    url: "https://api.coincap.io/v2/assets",
    async: false,
    dataType: 'json',
    success: function (json) {
        data = json.data;
        convertir(monnaieId, data);
        generateCryptoList(data);
        generateVariation(data);
    }
});

var dataHistory;
function getDataHistory(link) {
    if (link == '') {
        $.ajax({
            url: 'assets/history.json',
            async: false,
            dataType: 'json',
            success: function (json) {
                dataHistory = json.data;
            }
        });
    }
    else {
        $.ajax({
            url: link,
            async: false,
            dataType: 'json',
            success: function (json) {
                dataHistory = json.data;
            }
        });
    }
}

function convertir(monnaie, data) {
    var taux;
    dataRates.forEach(element => {
        if (element.id == monnaie) {
            taux = element.rateUsd;
            this.monnaie = element;
        }
    });
    data.forEach(element => {
        element.priceUsd /= taux;
    });
}

/**
 * Permet de convertir un prix
 * @param unPrix 
 * @return unPrix
 */
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

    var button = document.getElementById("accordion-button" + rank);

    if (etat == "open") {

        /* Affichage du graphe */
        button.setAttribute("onclick", "loadGraph(" + rank + ", 'close')")
        const options = loadGraphData(rank);
        chart[rank] = new ApexCharts(document.querySelector("#chart" + rank), options);
        chart[rank].render();

        /* Affichage des changements de fenêtre de temps */
        var divList = document.createElement('div');
        divList.id = 'divListDate' + rank;
        divList.style = 'text-align: left !important;';
        var list = document.createElement('ul');
        list.className = 'listDate';
        list.innerHTML =
            `
            <li onclick="graphSet('${rank}', \'1h\')">1H</li>
            <li onclick="graphSet('${rank}', \'1d\')">1J</li>
            <li onclick="graphSet('${rank}', \'1w\')">1S</li>
            <li onclick="graphSet('${rank}', \'1m\')">1M</li>
            <li onclick="graphSet('${rank}', \'1y\')" class="listDateActive">1A</li>
        `
        divList.append(list);
        document.querySelector("#chart" + rank).after(divList);
    } else {

        button.setAttribute("onclick", "loadGraph(" + rank + ", 'open')")
        chart[rank].destroy();
        document.getElementById('divListDate' + rank).remove();
    }
}

/* On initialise notre graphe avec des valeurs de base */
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
                if (monnaie.currencySymbol) return value.toFixed(4) + monnaie.currencySymbol;
                else return value.toFixed(4) + monnaie.symbol;
            }
        },
    },
    colors: ['#ffc850'],
    fill: {
        colors: ['#ffc850']
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

var oldActive = new Array();
var didFirstStart = new Array().fill(false);

function graphSet(rank, length) {
    var newData = new Array();
    var newCategories = new Array();
    var newDataHistory;

    var JSONargs = '';
    var JSONlink = 'https://api.coincap.io/v2/assets/' + data[rank - 1].id + '/history';
    var dateEnd = new Date(Date.now());
    var dateStart = dateEnd;

    var divList = document.querySelector("#divListDate" + rank);

    if (oldActive[rank] != undefined && didFirstStart[rank] == true) {
        divList.children[0].children[oldActive[rank]].classList.remove('listDateActive');
    }

    if (length == '1h') {
        divList.children[0].children[0].className = 'listDateActive';
        oldActive[rank] = 0;
        dateStart.setHours(dateEnd.getHours() - 1);
        dateStart = dateStart.getTime();
        dateEnd = Date.now();
        JSONargs = '?interval=m1&start=' + dateStart + '&end=' + dateEnd;
    }
    else if (length == '1d') {
        divList.children[0].children[1].className = 'listDateActive';
        oldActive[rank] = 1;
        dateStart.setDate(dateStart.getDate() - 1);
        dateStart = dateStart.getTime();
        dateEnd = Date.now();
        JSONargs = '?interval=m30&start=' + dateStart + '&end=' + dateEnd;
    }
    else if (length == '1w') {
        divList.children[0].children[2].className = 'listDateActive';
        oldActive[rank] = 2;
        dateStart.setDate(dateStart.getDate() - 7);
        dateStart = dateStart.getTime();
        dateEnd = Date.now();
        JSONargs = '?interval=h1&start=' + dateStart + '&end=' + dateEnd;
    }
    else if (length == '1m') {
        divList.children[0].children[3].className = 'listDateActive';
        oldActive[rank] = 3;
        dateStart.setMonth(dateStart.getMonth() - 1);
        dateStart = dateStart.getTime();
        dateEnd = Date.now();
        JSONargs = '?interval=d1&start=' + dateStart + '&end=' + dateEnd;
    }
    else if (length == '1y') {
        if (didFirstStart[rank] == true) divList.children[0].children[4].className = 'listDateActive';
        oldActive[rank] = 4;
        dateEnd.setHours(0, 0, 0, 0);
        dateStart.setFullYear(new Date().getFullYear() - 1);
        dateStart = dateStart.getTime();
        dateEnd = new Date(Date.now());
        dateEnd.setHours(0, 0, 0, 0);
        dateEnd = dateEnd.getTime();

        JSONargs = '?interval=d1&start=' + dateStart + '&end=' + dateEnd;
    }

    JSONlink += JSONargs;
    getDataHistory(JSONlink);
    newDataHistory = dataHistory;

    for (var elem in newDataHistory) {
        newData.push(Number(newDataHistory[elem].priceUsd / monnaie.rateUsd).toFixed(5));
        newCategories.push(newDataHistory[elem].date);
    }

    try {
        chart[rank].updateOptions({
            series: [{
                data: newData
            }],
            xaxis: {
                categories: newCategories
            }
        })
    }
    catch (e) {
        console.log(e);
    }

    didFirstStart[rank] = true;

}

/* Variable globale permettant de stocker si on charge un graphe pour la première fois */
var loadFirstTime = new Array(100).fill(0);

function loadGraphData(rank) {

    var chOptions = options;

    /* On initialise notre graph avec des valeurs de base */
    chOptions.chart.id = 'chart' + rank;

    if (loadFirstTime[rank - 1] == 0) {
        graphSet(rank, '1y');
        loadFirstTime[rank - 1] = 1;
    }

    chOptions.series[0].data = [];
    chOptions.xaxis.categories = [];

    for (var elem in dataHistory) {
        chOptions.series[0].data.push(Number(dataHistory[elem].priceUsd / monnaie.rateUsd).toFixed(5));
        chOptions.xaxis.categories.push(dataHistory[elem].date);
    }

    return chOptions;

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

    button.innerHTML =
        `
        <table class='header-left'>
            <tr>
                <td class='rankCrypto'>#${element.rank}</td>
                <td><img class='logoCrypto' draggable='false' src='assets/img/logoCM/${element.symbol}.png' width='40px' /></td>
                <td>${element.name}</td>
                <td class='legendSymbol'>${element.symbol}</td>
            </tr>
        </table>
    `
    var colorVariation;
    if (element.changePercent24Hr < 0) {
        colorVariation = "red-variation";
    } else if (element.changePercent24Hr > 0) {
        colorVariation = "green-variation"
    }

    var priceText = "<h2 class='legendHeader'>Prix</h2>";
    button.innerHTML += "<table class='header-right'><tr><td>" + priceText + traiterPrix(element.priceUsd) + (monnaie.currencySymbol || monnaie.symbol) + "</td><td class='" + colorVariation + "' >" + (Math.round(element.changePercent24Hr * 100) / 100) + "%</td></tr></table>";

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
    var arrayHausse = []
    var arrayBaisse = []

    var hausse1 = document.createElement("p");
    var hausse2 = document.createElement("p");
    var hausse3 = document.createElement("p");
    var hausse4 = document.createElement("p");

    var baisse1 = document.createElement("p");
    var baisse2 = document.createElement("p");
    var baisse3 = document.createElement("p");
    var baisse4 = document.createElement("p");

    for (const element of data) {

        if (element.changePercent24Hr > 0) {
            var arrayTemp = {
                rank: element.rank,
                logo: element.symbol,
                variation: element.changePercent24Hr
            }
            arrayHausse.push(arrayTemp)
        } else {
            var arrayTemp = {
                rank: element.rank,
                logo: element.symbol,
                variation: element.changePercent24Hr
            }
            arrayBaisse.push(arrayTemp)
        }

    }
    arrayHausse.sort(function (a, b) {
        return b.variation - a.variation;
    });

    arrayBaisse.sort(function (a, b) {
        return a.variation - b.variation;
    });

    hausse1.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayHausse[0].logo + ".png' width='40'>" + traiterPrix(arrayHausse[0].variation) + "%</div>";
    hausse2.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayHausse[1].logo + ".png' width='40'>" + traiterPrix(arrayHausse[1].variation) + "%</div>";
    hausse3.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayHausse[2].logo + ".png' width='40'>" + traiterPrix(arrayHausse[2].variation) + "%</div>";
    hausse4.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayHausse[3].logo + ".png' width='40'>" + traiterPrix(arrayHausse[3].variation) + "%</div>";

    baisse1.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayBaisse[0].logo + ".png' width='40'>" + traiterPrix(arrayBaisse[0].variation) + "%</div>";
    baisse2.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayBaisse[1].logo + ".png' width='40'>" + traiterPrix(arrayBaisse[1].variation) + "%</div>";
    baisse3.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayBaisse[2].logo + ".png' width='40'>" + traiterPrix(arrayBaisse[2].variation) + "%</div>";
    baisse4.innerHTML = "<img class='mt-2' src='assets/img/logoCM/" + arrayBaisse[3].logo + ".png' width='40'>" + traiterPrix(arrayBaisse[3].variation) + "%</div>";

    document.getElementById("lienH1").setAttribute("href", "#panelsStayOpen-heading" + arrayHausse[0].rank)
    document.getElementById("lienH2").setAttribute("href", "#panelsStayOpen-heading" + arrayHausse[1].rank)
    document.getElementById("lienH3").setAttribute("href", "#panelsStayOpen-heading" + arrayHausse[2].rank)
    document.getElementById("lienH4").setAttribute("href", "#panelsStayOpen-heading" + arrayHausse[3].rank)

    document.getElementById("lienB1").setAttribute("href", "#panelsStayOpen-heading" + arrayBaisse[0].rank)
    document.getElementById("lienB2").setAttribute("href", "#panelsStayOpen-heading" + arrayBaisse[1].rank)
    document.getElementById("lienB3").setAttribute("href", "#panelsStayOpen-heading" + arrayBaisse[2].rank)
    document.getElementById("lienB4").setAttribute("href", "#panelsStayOpen-heading" + arrayBaisse[3].rank)

    document.getElementById("hausse1").innerHTML = '';
    document.getElementById("hausse1").appendChild(hausse1);
    document.getElementById("hausse2").innerHTML = '';
    document.getElementById("hausse2").appendChild(hausse2);
    document.getElementById("hausse3").innerHTML = '';
    document.getElementById("hausse3").appendChild(hausse3);
    document.getElementById("hausse4").innerHTML = '';
    document.getElementById("hausse4").appendChild(hausse4);

    document.getElementById("baisse1").innerHTML = '';
    document.getElementById("baisse1").appendChild(baisse1);
    document.getElementById("baisse2").innerHTML = '';
    document.getElementById("baisse2").appendChild(baisse2);
    document.getElementById("baisse3").innerHTML = '';
    document.getElementById("baisse3").appendChild(baisse3);
    document.getElementById("baisse4").innerHTML = '';
    document.getElementById("baisse4").appendChild(baisse4);

}

var darkModeEnabled = false;

function darkModeSwitch() {

    if (!darkModeEnabled) {
        // $('head').append('<link rel="stylesheet" href="" ');
        darkModeEnabled = true;
    }
}