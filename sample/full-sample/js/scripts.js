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


function processIt(ifEvent) {
	var links;
	if (ifEvent) {
		var sender = ifEvent.target;
		links = streeting.processUpdate('the-svg', sender);
	} else {
		links = streeting.process('the-svg', 'the-form');
	}

	var link = links['svg'];

	var theResultLink = document.getElementById("the-result-link");
	theResultLink.href = link;
}


function happySunMouthProcess(id, elem, value) {
	sunMouthMoodProcess(elem, true, value);
}        

function sadSunMouthProcess(id, elem, value) {
	sunMouthMoodProcess(elem, false, value);
}

function sunMouthMoodProcess(elem, isHappy, isInMood) {
	var transformation;

	if (isInMood) {
		if (isHappy) {
			transformation = "rotate(0)";
		} else {
			transformation = "rotate(180) translate(70, -1190) ";
		}
	
		elem.setAttribute('transform', transformation);
	}	
}        


