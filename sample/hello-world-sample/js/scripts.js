var templateName = 'template-0.svg';
var template = 'templates/' + templateName;

    
function prepare() {
	var form = document.getElementById("the-form");
      
	form.onsubmit = function(e) {
      
		processIt();

		return false;
	}
      
	streeting.initialize('the-svg', template);
}


function processIt() {

	var links = streeting.process('the-svg', 'the-form');
	var link = links['svg'];

	var theResultLink = document.getElementById("the-result-link");
	theResultLink.href = link;
}
         
