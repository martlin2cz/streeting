/**
	* Streeting main script 1.0
	* m@rtlin, 27. 7. 2017
	*/

var IMAGE_MIME = "image/png";

streeting = {};


streeting.process = function(templateUrl, sourceId, canvasId) {
	//console.log(sourceId + ", " + canvasId + ", " + imageId);
	var template = this.loadTemplate(templateUrl);
	var data = this.loadData(sourceId);
	var rendered = this.renderTemplate(template, data);

	this.outputToCanvas(rendered, canvasId);

	var link = this.canvasToUrl(canvasId);
	return link;
}

streeting.loadTemplate = function(templateUrl) {
	var xhttp = new XMLHttpRequest();

	xhttp.open("GET", templateUrl, false);
	xhttp.send();

	return xhttp.responseXML;
}

streeting.loadData = function(sourceId) {
	return {'panel-text': 'Hi there!'};	//TODO FIXME
}

streeting.renderTemplate = function(template, data) {
	console.log(template);
	return template; //TODO	
}

streeting.outputToCanvas = function(rendered, canvasId) {
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');

	var img = new Image();

	img.onload = function() {
		ctx.drawImage(img, 0, 0);
	}

	img.src = rendered;
}

streeting.canvasToUrl = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	canvas.toDataURL(IMAGE_MIME);
}



