chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    console.log("Here in the page");
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        console.log("Here in the page");
        console.log(document.all[0].outerHTML);
        sendResponse(document.all[0].outerHTML);
        return true;
    }
});