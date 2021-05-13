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
	
	var handler = function(link) {
		var theResultLink = document.getElementById("the-result-link");
		theResultLink.href = link;
	};

	var errorHandler = function(msg, e) {
		alert(msg);
	}
	if (ifEvent) {
		var sender = ifEvent.target;
		streeting.processUpdate('the-svg', sender, handler, errorHandler);
	} else {
		streeting.process('the-svg', 'the-form', handler, errorHandler);
	}
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
			transformation = "rotate(180) translate(70, -1190) ";	// :-O
		}
	
		elem.setAttribute('transform', transformation);
	}	
}        


