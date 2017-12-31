/**
*   Method used to change the Event Details in the
*  right column of the screen with the selected
*  Event's Details
*/
function displayDetails(historyItem) {
    //TODO: change the displayed data
    
    alert(historyItem.title);
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
    $(".timeline")[0].appendChild(htmlElement);
}