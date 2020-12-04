var request = new XMLHttpRequest();
request.open("GET", "dic3.json", false);
request.send(null)
var JSONdata = JSON.parse(request.responseText);
stateCount = ObjectLength(JSONdata);
dropdownFill();
var selectedState = undefined;
addElement('filter', 'span', 'currentState', ' - Todos los estados ');

function stateFilter(name){

    selectedState = name;
    //console.log("STATE FILTER")
    removeElement('currentState');
    addElement('filter', 'span', 'currentState', ' - ' + name);
}

function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
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
    if(p == null){

    }else{

        p.appendChild(newElement);
    }
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    if(element == null){

    }else{

        element.parentNode.removeChild(element);
    }
}
function dropdownFill(){

    for(i = 0; i < stateCount; i++){

        addElement('dropdownState', 'a', Object.entries(JSONdata)[i][1].state, Object.entries(JSONdata)[i][1].state);
        var temp = document.getElementById(Object.entries(JSONdata)[i][1].state);
        temp.href = "#"
        temp.setAttribute("onClick", "stateFilter(this.id)");
        addElement("dropdownState","BR","","");
    }
}

