var file = 'personal_history.json';
var myBio = {};
var mySkills = [];
var mySoftSkills = [];
var myHistoryArray = [];
var myContact = {};

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
        
        myBio = jsonData.data;
        mySkills = jsonData.skills;
        mySoftSkills = jsonData.soft_skills;
        myContact = jsonData.contact;
        
        for(let i = jsonData.events.length - 1; i >= 0; i--) {
            var j = jsonData.events[i];
            myHistoryArray.push(j);
        }
        
        var timeFrame = document.getElementsByClassName("conference-timeline-content")[0];
        
        for(let i = myHistoryArray.length - 1; i >= 0; i--) {
            var element = myHistoryArray[i];
            buildTimelineEvent(element);
        }
        
        initSkillPB();
    });
}

function initSkillPB() {
    var skillContainer = document.getElementById("skill_progress_bar_container");
    buildSkillBars(mySkills, skillContainer);
    
    var softSkillContainer = document.getElementById("soft_skill_progress_bar_container");
    buildSkillBars(mySoftSkills, softSkillContainer);
}

function scrollToPosition(htmlElement) {
    htmlElement.scrollTop = 0;
}

//  On successfull document loading, initialize the base data
//used by the page
$(document).ready(function() {
    loadData();
});