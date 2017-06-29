function colorize() {
  card_project_div = $(this).find('div.source-name.ng-scope')
  card_number_div = $(this).find('button.card-number.btn.btn-link.btn-xs')
  card_project = card_project_div.text()

  if(typeof localStorage[card_project] == "undefined") {
    localStorage[card_project] = generate_random_pastel_color()
  }

  color = localStorage[card_project]
  $(this).css('background-color',color)
  card_project_div.css('color',"#333333")
  card_number_div.css('color',"#333333")
}

function rgb_to_hex(r, g, b) {
  var rgb = b | (g << 8) | (r << 16);
  return "#" + rgb.toString(16);
}

function generate_random_pastel_color(){
  red = Math.floor(Math.random() * 255);
  green = Math.floor(Math.random() * 255);
  blue = Math.floor(Math.random() * 255);

  mix_red = 255
  mix_green = 255
  mix_blue = 255

  red = (red + mix_red) / 2
  green = (green + mix_green) / 2
  blue = (blue + mix_blue) / 2

  return rgb_to_hex(red, green, blue)
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
