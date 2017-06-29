function click(e) {
  chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tabs){
     //console.log(JSON.stringify(tabs[0]));
     chrome.tabs.sendMessage(tabs[0].id, "colorize");
   });
}

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', click);
  }
});
