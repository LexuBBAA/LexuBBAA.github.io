/**
*   Method used to change the Event Details in the
*  right column of the screen with the selected
*  Event's Details
*/
function displayDetails(historyItem) {
    var detailsHeader = document.getElementById("event_details_header");
    var detailsDate = document.getElementById("event_details_date");
    
    detailsDate.innerHTML = historyItem.date;
    detailsHeader.innerHTML = historyItem.article_title + ' ';
    detailsHeader.appendChild(detailsDate);
    
    var detailsDescription = document.getElementById("event_details_description");
    detailsDescription.innerHTML = "<p>" + historyItem.description + "</p";
    
    var detailsContainer = document.getElementById("event_accomplishments_list");
    detailsContainer.innerHTML = "";
    
    if(historyItem.hasAcc) {        
        for(let i in historyItem.accs) {
            let achievement = historyItem.accs[i];
            
            buildSections(achievement, detailsContainer);
        }
    }
}

/**
*   Method used to create individual sections for all the
* achievements available and adding them in the main container
*/
function buildSections(achievement, container) {
    // Main container of the acievement
    var newAcc = document.createElement("div");
    newAcc.className = "row";
    container.appendChild(newAcc);

    // Title and date of section
    var accTitle = document.createElement("h5");
    accTitle.innerHTML = achievement.title + ' ';
    var accDate = document.createElement("small");
    accDate.className = "text-muted";
    accDate.innerHTML = achievement.date;
    accTitle.appendChild(accDate);
    newAcc.appendChild(accTitle);

    // Description of the achievement
    var accDesc = document.createElement("p");
    accDesc.innerHTML = achievement.description;
    newAcc.appendChild(accDesc);

    if(achievement.awards.length != 0) {
        var sectionContainer = document.createElement("div");
        sectionContainer.className = "col";
        newAcc.appendChild(sectionContainer);

        var awardsSection = document.createElement("div");
        awardsSection.className = "row";
        sectionContainer.appendChild(awardsSection);

        for(let j in achievement.awards) {
            let award = achievement.awards[j];

            var awardElement = document.createElement("div");
            awardElement.className = (achievement.awards.length >= 3)? "col-12 col-sm-4": "col";
            awardsSection.appendChild(awardElement);

            var awardTitle = document.createElement("div");
            awardTitle.className = "row";

            var newLi = document.createElement("li");
            newLi.innerHTML = "<b>" + award.title + "</b>";
            awardTitle.appendChild(newLi);
            awardElement.appendChild(awardTitle);

            var awardDesc = document.createElement("div");
            awardDesc.className = "row award-container";
            awardElement.appendChild(awardDesc);

            var newP = document.createElement("p");
            newP.innerHTML = award.description;
            awardDesc.appendChild(newP);
        }
    }
}

/**
*   Method used to dinamycally create timeline events
*/
function buildTimelineEvent(jsonElement) {
    // Create the new htmlElement representing the 
    //timeline event
    var htmlElement = document.createElement("div");
    htmlElement.className += "timeline-container";
    htmlElement.className += " right";
    
    var htmlContent = document.createElement("div");
    htmlContent.className += "timeline-content";
    
    // Set the newly created htmlElement's title to
    //the one retrieved from the local JSON
    var htmlTitle = document.createElement("h2");
    htmlTitle.innerHTML = jsonElement.title;
    
    htmlContent.appendChild(htmlTitle);
    
    htmlElement.appendChild(htmlContent);
    // Set the onClick handler for dinamycally changing the
    //Event Details area of the page
    htmlElement.onclick = function() {
        displayDetails(jsonElement);
    }
    
    // Add the new htmlElement to the timeline
    if($(".timeline")[0].childNodes.length == 0) {
        displayDetails(jsonElement);
    }
    $(".timeline")[0].appendChild(htmlElement);
}

/**
*   Method used to replace the progress bars' values on
* mouse over / out events
*/
function progressLabelChange(pb) {
    if(pb.innerHTML == ("<b>" + pb.skill.title + "</b>")) {
        pb.innerHTML = "<b>" + pb.skill.level + "</b>";
    } else {
        pb.innerHTML = "<b>" + pb.skill.title + "</b>";
    }
}

/**
*   Method used to build the html elements representing
* the skills progress bars
*/
function buildSkillBars(skillsArray, container) {
    // Create a new Progress bar element for
    //each of the skills retrieved
    for(let i in skillsArray) {
        var skill = skillsArray[i];
        
        var newPb = buildPB(skill);
        container.appendChild(newPb);
    }
}

/**
*   Method used to build a single progress bar
*/
function buildPB(skill) {
    var progressBarContainer = document.createElement("div");
        progressBarContainer.className = "progress";
        
        var progressBar = document.createElement("div");
        progressBar.className += "progress-bar";
        progressBarContainer.appendChild(progressBar);
        
        progressBar.skill = skill;
        var skillLevel = parseFloat(skill.level);
        
        if(skillLevel - 2 <= 0) {
            progressBar.style.background = "#ff0000";
        } else if(skillLevel - 3 <= 0) {
            progressBar.style.background = "#ffa02a";
        } else if(skillLevel - 4 <= 0) {
            progressBar.style.background = "#10bd00";
        } else {
            progressBar.style.background = "#002bff";
        }
        
        var val = skill.level * 10;
        progressBar.style.width = (parseFloat(val) * 2) + "%";
        progressBar.innerHTML = "<b>" + skill.title + "</b>";
        progressBar.onmouseover = function() {
            this.innerHTML = "<b>" + this.skill.level + "</b>";
        };
        progressBar.onmouseout = function() {
            this.innerHTML = "<b>" + this.skill.title + "</b>";
        };
    
    return progressBarContainer;
}