var file = 'personal_history.json';
var myHistoryArray = [];

function readFile(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function() {
        if(xobj.readyState == 4) {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

function displayDetails(historyItem) {
    var itemSummaryContainer = document.getElementById("evolutionStep");
    console.log(historyItem.title + " Clicked");
    //TODO: change the displayed data
} 

function buildElem(jsonElement, index) {
    var htmlElement = document.createElement("div");
    htmlElement.className = "timeline-article";
    htmlElement.className += (index % 2 == 0) ? 
        " timeline-article-top" : " timeline-article-bottom";
    
    var htmlInner = document.createElement("div");
    htmlInner.className = "content-date";
    
    var htmlSpan = document.createElement("span");
    htmlSpan.innerHTML = jsonElement.title;
    
    var htmlMeta = document.createElement("div");
    htmlMeta.className = "meta-date";
    
    htmlInner.appendChild(htmlSpan);
    htmlElement.appendChild(htmlInner);
    htmlElement.appendChild(htmlMeta);
    htmlElement.addEventListener("click", function() {
        displayDetails(jsonElement);
    });
    
    return htmlElement;
}

function loadData() {
    readFile(file, function(response) {
        var jsonData = JSON.parse(response);
        for(let i = 0; i < jsonData.data.length; i++) {
            var j = jsonData.data[i];
            myHistoryArray.push(j);
        }
        console.log(myHistoryArray);
        
        var timeFrame = document.getElementsByClassName("conference-timeline-content")[0];
        
        for(let i = myHistoryArray.length - 1; i >= 0; i--) {
            var element = myHistoryArray[i];
            console.log(element);
            var htmlElem = buildElem(element, i);
            
            timeFrame.appendChild(htmlElem);
        }
    });
}

$(document).ready(function() {
    loadData();
});