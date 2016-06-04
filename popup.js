document.addEventListener('DOMContentLoaded', function() {
  var startTrackingButton = document.getElementById('startTracking');
  startTrackingButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      
      chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, function(response) {
        
        doAwesomeStuffWithTheResponse(response, tab);
      });      
    });
  }, false);
}, false);

function doAwesomeStuffWithTheResponse (response, tab) {
  var options = {
    type: "basic",
    title: "New Incident",
    message: "A new incident has been added to the queue",
    iconUrl: "icon.png",
    priority: 2,
    requireInteraction: true
  }
  console.log(chrome);
  chrome.notifications.create(options, function (notificationId) {
    console.log(notificationId);
  });
  setTimeout(function() {
    console.log("Reloading  ");
    chrome.tabs.reload(tab.id, function (){
      console.log("Reloaded");
    })
  }, 20000);
}