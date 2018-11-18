var availableColors = []
var projectsList = []
var projectCount = 0

function colorize() {
  var cardProjectDiv = $(this).find('div.source-name.ng-scope')
  var cardNumberDiv = $(this).find('button.card-number.btn.btn-link.btn-xs')
  var cardProject = cardProjectDiv.text()

  if (typeof localStorage[cardProject] === 'undefined') {
    localStorage[cardProject] = getColor(cardProject)
  }

  var color = localStorage[cardProject]
  $(this).css('background-color', color)
  cardProjectDiv.css('color', '#333333')
  cardNumberDiv.css('color', '#333333')
}

function getColor(cardProject) {
  var color = availableColors[projectCount]
  projectCount++
  return 'hsl(' + color + ',100%,85%)'
}

function calculateColorHues() {
  if (projectCount > 1) {
    var startPoint = (360 / projectCount) / 2
    var number = 360 / (projectCount)
    var i
    for (i = startPoint; i <= 360; i = i + number) {
      availableColors.push(Math.floor(i))
    }
  }
}

function checkNewProject() {
  var cardProjectDiv = $(this).find('div.source-name.ng-scope')
  var cardProject = cardProjectDiv.text()

  if (!isInArray(cardProject, projectsList)) {
    projectsList.push(cardProject)
    projectCount++
  }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1
}

var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
  start()
})

observer.observe($('body').get(0), {
  childList: true
})

function cleanup() {
  localStorage.clear()
  projectsList = []
  availableColors = []
  projectCount = 0
}

function setDarkMode() {
  document.getElementById("project-ct").classList.add("dark-theme")
}

function start() {
  setDarkMode()

  $('.card-header').each(checkNewProject)
  calculateColorHues(projectCount)
  console.log(availableColors)
  projectCount = 0

  $('.card-header').each(colorize)
}
