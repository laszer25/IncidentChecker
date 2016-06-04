
document.addEventListener('DOMContentLoaded', function() {
  var startTrackingButton = document.getElementById('startTracking');
  startTrackingButton.addEventListener('click', function() {
    console.log("clicked");
    chrome.tabs.getSelected(null, function(tab) {
      
      chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, function(response) {
        console.log("response received")
        console.log(response)
        var bgPage = chrome.extension.getBackgroundPage();
        bgPage.doAwesomeStuffWithTheResponse(response, tab);
      });      
    });
  }, false);
}, false);