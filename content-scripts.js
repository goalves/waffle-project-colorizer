function colorize() {
  cardProjectDiv = $(this).find('div.source-name.ng-scope')
  cardNumberDiv = $(this).find('button.card-number.btn.btn-link.btn-xs')
  cardProject = cardProjectDiv.text()

  if(typeof localStorage[cardProject] == "undefined") {
    localStorage[cardProject] = generateRandomPastelColor()
  }

  color = localStorage[cardProject]
  $(this).css('background-color',color)
  cardProjectDiv.css('color',"#333333")
  cardNumberDiv.css('color',"#333333")
}

function rgbToHex(r, g, b) {
  var rgb = b | (g << 8) | (r << 16);
  return "#" + rgb.toString(16);
}

function generateRandomPastelColor(){
  red = Math.floor(Math.random() * 255);
  green = Math.floor(Math.random() * 255);
  blue = Math.floor(Math.random() * 255);

  mixRed = 255
  mixGreen = 255
  mixBlue = 255

  red = (red + mixRed) / 2
  green = (green + mixGreen) / 2
  blue = (blue + mixBlue) / 2

  return rgbToHex(red, green, blue)
}

function start(){
  $('.card-header').each(colorize);
}

var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
    start();
});

chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse){
        localStorage.clear();
        start();
    }
);

observer.observe($('body').get(0), {
  childList: true,
});
