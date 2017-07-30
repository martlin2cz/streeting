var templateName = 'template-0.svg';
var template = 'templates/' + templateName;

    
function prepare() {
	var form = document.getElementById("the-form");
      
	form.onsubmit = function(e) {
      
		processIt();

		return false;
	}
      
	streeting.initialize('the-svg', template);
	streeting.makeSourceInteractive('the-form', processIt);

}


function processIt() {

	var links = streeting.process('the-svg', 'the-form');
	var link = links['svg'];

	var theResultLink = document.getElementById("the-result-link");
	theResultLink.href = link;
}


function happySunMouthProcess(id, elem, value) {
	sunMouthMoodProcess(id, elem, value);
}        

function sadSunMouthProcess(id, elem, value) {
	// not needed here to be done twice
	// sunMouthMoodProcess(id, elem, value);
}

function happySunMouthProcess(id, elem, isHappy) {
	var transformation;

	if (!isHappy) {
		transformation = "rotate(180) translate(70, -1190) ";
	} else {
		transformation = "rotate(0)";
	}
	
	elem.setAttribute('transform', transformation);

}        


