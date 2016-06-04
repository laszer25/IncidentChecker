// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
var incidents = [];
var tracking  = false;

function doAwesomeStuffWithTheResponse (response, tab) {
  console.log("doing awesome stuff with the response");
  tracking = true;
  var options = {
    type: "basic",
    title: "Kitty Alert",
    message: "A new incident has been added to the queue",
    iconUrl: "icon.png",
    priority: 2,
    requireInteraction: true
  }
  //Figure out the list of all matching incidents
  //(IT|it)00[0-9]+
  console.log(response)
  if (response != undefined) {
    var newIncidents = response.match(/(IT|it)00[0-9]+/g)
    if (incidents.length != 0) {
      console.log("incidents length is over 0")
      if (!incidents.equals(newIncidents)) {
        console.log("There has been a change in the incident numbers");
        chrome.notifications.create(options, function (notificationId) {
        console.log(notificationId);
        });  
      }
    }
    incidents = newIncidents;  
  }
  
  setTimeout(function() {
    console.log("Reloading  ");
    chrome.tabs.reload(tab.id, function (){
      chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, function(response) {
        console.log("Inside the refresh loop")
        doAwesomeStuffWithTheResponse(response, tab);
      });
      console.log("Reloaded");
    })
  }, 10000);
}

function isTracking() {
    return tracking;
}