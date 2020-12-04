var request = new XMLHttpRequest();
request.open("GET", "dic3.json", false);
request.send(null)
var JSONdata = JSON.parse(request.responseText);

request.open("GET", "usTotal.json", false);
request.send(null)
var usTotal = JSON.parse(request.responseText);

stateCount = ObjectLength(JSONdata);
dropdownFill();
document.getElementById('dropdownState').style.zIndex = 100000;
var selectedState = 'Todos los estados';
var sortedData = Object.entries(JSONdata);

function compare(a, b) {
    if (a[1].cases > b[1].cases) return 1;
    if (b[1].cases > a[1].cases) return -1;

    return 0;
}

sortedData.sort(compare)
addElement('filter', 'span', 'currentState', ' - Todos los estados ');
topThree();
totalCases();

function topThree() {

    addElement('top1', 'p', 'top1Name', JSONdata.Texas.state);
    addElement('top1', 'p', 'top1Cases', JSONdata.Texas.cases + ' Confirmados');
    addElement('top1', 'p', 'top1Deaths', JSONdata.Texas.deaths + ' Defunciones');

    document.getElementById('top1Name').style = "text-align: center;";
    document.getElementById('top1Cases').style = "font-size: small; color: #9b850d; text-align: center;";
    document.getElementById('top1Deaths').style = "font-size: small; color: #be0707; text-align: center;";

    addElement('top2', 'p', 'top2Name', JSONdata.California.state);
    addElement('top2', 'p', 'top2Cases', JSONdata.California.cases + ' Confirmados');
    addElement('top2', 'p', 'top2Deaths', JSONdata.California.deaths + ' Defunciones');

    document.getElementById('top2Name').style = "text-align: center;";
    document.getElementById('top2Cases').style = "font-size: small; color: #9b850d; text-align: center;";
    document.getElementById('top2Deaths').style = "font-size: small; color: #be0707; text-align: center;";

    addElement('top3', 'p', 'top3Name', JSONdata.Florida.state);
    addElement('top3', 'p', 'top3Cases', JSONdata.Florida.cases + ' Confirmados');
    addElement('top3', 'p', 'top3Deaths', JSONdata.Florida.deaths + ' Defunciones');

    document.getElementById('top3Name').style = "text-align: center;";
    document.getElementById('top3Cases').style = "font-size: small; color: #9b850d; text-align: center;";
    document.getElementById('top3Deaths').style = "font-size: small; color: #be0707; text-align: center;";
}

function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][0] == nameKey) {
            return myArray[i];
        }
    }
}

function totalCases() {

    //console.log(selectedState)

    if (selectedState == "Todos los estados") {

        document.getElementById('totalCases').innerHTML = Object.entries(usTotal)[316][1].cases;
        document.getElementById('totalDeaths').innerHTML = Object.entries(usTotal)[316][1].deaths;

    } else {

        var stateTemp = search(selectedState, Object.entries(JSONdata));
        console.log(stateTemp);
        document.getElementById('totalCases').innerHTML = stateTemp[1].cases;
        document.getElementById('totalDeaths').innerHTML = stateTemp[1].deaths;

    }

}



function stateFilter(name) {

    selectedState = name;
    stateD = selectedState;
    console.log(name)
        //console.log(selectedState)
    removeElement('currentState');
    addElement('filter', 'span', 'currentState', ' - ' + name);
    totalCases();
    if (selectedState != 'Total de estados')
        updateDogChart();
}

function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
};

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    if (p == null) {

    } else {

        p.appendChild(newElement);
    }
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    if (element == null) {

    } else {

        element.parentNode.removeChild(element);
    }
}

function dropdownFill() {

    addElement('dropdownState', 'a', 'allStates', 'Todos los estados')
    var temp = document.getElementById('allStates')
    temp.setAttribute("onClick", "stateFilter('Todos los estados')");
    temp.href = "#"
    addElement("dropdownState", "BR", "", "");

    for (i = 0; i < stateCount; i++) {

        addElement('dropdownState', 'a', Object.entries(JSONdata)[i][1].state, Object.entries(JSONdata)[i][1].state);
        temp = document.getElementById(Object.entries(JSONdata)[i][1].state);
        temp.href = "#"
        temp.setAttribute("onClick", "stateFilter(this.id)");
        addElement("dropdownState", "BR", "", "");
    }
}