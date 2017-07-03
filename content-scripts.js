function colorize() {
  cardProjectDiv = $(this).find('div.source-name.ng-scope')
  cardNumberDiv = $(this).find('button.card-number.btn.btn-link.btn-xs')
  cardProject = cardProjectDiv.text()

  if(typeof localStorage[cardProject] == "undefined") {
    localStorage[cardProject] = getColor(cardProject)
  }
  color = localStorage[cardProject]
  $(this).css('background-color',color)
  cardProjectDiv.css('color',"#333333")
  cardNumberDiv.css('color',"#333333")
}

function getColor(cardProject) {
  var color = availableColors[projectCount]
  projectCount++
  return "hsl(" + color + ",100%,85%)";
}

function calculateColorHues(){
  if(projectCount > 1){
    startPoint = (360/projectCount)/2
    number = 360/(projectCount)
    for(i = startPoint; i <= 360; i = i+number){
      availableColors.push(Math.floor(i))
    }
  }
}

function checkNewProject() {
  cardProjectDiv = $(this).find('div.source-name.ng-scope')
  cardProject = cardProjectDiv.text()

  if(!isInArray(cardProject, projectsList)) {
    projectsList.push(cardProject)
    projectCount++
  }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
  start();
});

observer.observe($('body').get(0), {
  childList: true,
});

function start(){
  //Clear previous data
  localStorage.clear()
  projectsList = []
  availableColors = []
  projectCount = 0

  //Get info from card-headers
  $('.card-header').each(checkNewProject)
  calculateColorHues(projectCount)
  console.log(availableColors)
  projectCount = 0

  //Colorize
  $('.card-header').each(colorize)
}

var availableColors = []
var projectsList = []
var projectCount = 0;
