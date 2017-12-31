var file = 'personal_history.json';
var myHistoryArray = [];

/**
*   Method used to read the JSON file in order to parse it
*  to the actual JSON array that the script will use for
*  displaying the data regarding lifetime events
*/
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

/**
*   Method used to parse the JSON file to the actual array
*  containing the lifetime events
*/
function loadData() {
    readFile(file, function(response) {
        var jsonData = JSON.parse(response);
        for(let i = jsonData.data.length - 1; i >= 0; i--) {
            var j = jsonData.data[i];
            myHistoryArray.push(j);
        }
        
        var timeFrame = document.getElementsByClassName("conference-timeline-content")[0];
        
        for(let i = myHistoryArray.length - 1; i >= 0; i--) {
            var element = myHistoryArray[i];
            buildTimelineEvent(element);
        }
    });
}

//  On successfull document loading, initialize the base data
//used by the page
$(document).ready(function() {
    loadData();
});