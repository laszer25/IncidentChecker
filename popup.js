var bgPage = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function() {
  var startTrackingButton = document.getElementById('startTracking');
  startTrackingButton.addEventListener('click', function() {
    console.log("clicked");
    startTrackingButton.innerText = "Tracking...meow..meow"
    startTrackingButton.disabled = true
    chrome.tabs.getSelected(null, function(tab) {
      
      chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, function(response) {
        console.log("response received")
        console.log(response)
        bgPage.doAwesomeStuffWithTheResponse(response, tab);
      });      
    });
  }, false);
}, false);
window.onload = function() {
  var isTracking = bgPage.isTracking();
  var startTrackingButton = document.getElementById('startTracking');
  if (isTracking) {
    startTrackingButton.innerText = "Tracking...meow..meow"
    startTrackingButton.disabled = true
  }
}