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
    //TODO: change the displayed data
    
    alert(historyItem.title);
} 

function buildTimelineEvent(jsonElement) {
    var timeline = document.getElementsByClassName("timeline")[0];
    
    var htmlElement = document.createElement("div");
    htmlElement.className += "timeline-container";
    htmlElement.className += " right";
    
    var htmlContent = document.createElement("div");
    htmlContent.className += "timeline-content";
    
    var htmlTitle = document.createElement("h2");
    htmlTitle.innerHTML = jsonElement.title;
    
    htmlContent.appendChild(htmlTitle);
    
    htmlElement.appendChild(htmlContent);
    htmlElement.onclick = function() {
        displayDetails(jsonElement);
    }
    
    timeline.appendChild(htmlElement);
}

function loadData() {
    readFile(file, function(response) {
        var jsonData = JSON.parse(response);
        for(let i = jsonData.data.length - 1; i >= 0; i--) {
            var j = jsonData.data[i];
            myHistoryArray.push(j);
        }
        console.log(myHistoryArray);
        
        var timeFrame = document.getElementsByClassName("conference-timeline-content")[0];
        
        for(let i = myHistoryArray.length - 1; i >= 0; i--) {
            var element = myHistoryArray[i];
            buildTimelineEvent(element);
        }
    });
}

$(document).ready(function() {
    loadData();
});