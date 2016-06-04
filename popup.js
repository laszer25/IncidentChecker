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

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  var refreshText = document.getElementById("refreshCounter");
  
  if (msg.text === "timer_cnt") {
    refreshText.innerText = "Refreshing in " + msg.time + " seconds.";
  }
});