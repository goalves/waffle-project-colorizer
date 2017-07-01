function colorize() {
  cardProjectDiv = $(this).find('div.source-name.ng-scope')
  cardNumberDiv = $(this).find('button.card-number.btn.btn-link.btn-xs')
  cardProject = cardProjectDiv.text()

  if(typeof localStorage[cardProject] == "undefined") {
    localStorage[cardProject] = colorByHashCode(cardProject)
  }
  color = localStorage[cardProject]
  $(this).css('background-color',color)
  cardProjectDiv.css('color',"#333333")
  cardNumberDiv.css('color',"#333333")
}

function colorByHashCode(value) {
    hash = hashCode(value)
    return toHSL(hash)
}

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function toHSL(value) {
    var shortened = value % 360;
    return "hsl(" + shortened + ",100%,85%)";
};

function start(){
  $('.card-header').each(colorize);
}

var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
    start();
});

observer.observe($('body').get(0), {
  childList: true,
});
