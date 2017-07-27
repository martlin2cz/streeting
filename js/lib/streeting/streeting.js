/**
	* Streeting main script 1.0
	* m@rtlin, 27. 7. 2017
	*/

var IMAGE_MIME = "image/png";

streeting = {};

streeting.initialize = function(templateWrapperId, templateUrl) {
		this.loadTemplate(templateWrapperId, templateUrl);
}

streeting.process = function(templateWrapperId, sourceId, canvasId) {
	//console.log(sourceId + ", " + canvasId + ", " + imageId);
	var template = this.getTemplate(templateWrapperId);
	var data = this.loadData(sourceId);
	var rendered = this.renderTemplate(template, data);

	this.outputToCanvas(rendered, canvasId);

	var link = this.canvasToUrl(canvasId);
	return link;
}

streeting.loadTemplate = function(templateWrapperId, templateUrl) {
	var xhttp = new XMLHttpRequest();

	xhttp.open("GET", templateUrl, false);
	xhttp.overrideMimeType("image/svg+xml");
	xhttp.send();

	var doc = xhttp.responseXML.documentElement;
	
	var wrapper = document.getElementById(templateWrapperId);
	wrapper.appendChild(doc);
}

streeting.getTemplate = function(templateWrapperId) {
	var wrapper = document.getElementById(templateWrapperId);
	var svg = wrapper.firstChild;

	return svg;
}


streeting.loadData = function(sourceId) {
	return {'panel-text': 'Hi there!'};	//TODO FIXME
}

streeting.renderTemplate = function(template, data) {
	console.log(template);

	for (var id in data) {
		var elem = document.getElementById(id);
		var value = data[id];
		elem.innerHTML = value;
	}

	return template; //XXX
}

streeting.outputToCanvas = function(svgRoot, canvasId) {
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');

	var img = new Image();

	img.onload = function() {
		ctx.drawImage(img, 0, 0);
	}

	var svgXml = (new XMLSerializer()).serializeToString(svgRoot);
	var svgUrl = "data:image/svg+xml;base64," + btoa(svgXml);
	
	img.src = svgUrl;


//	img.src = rendered;
}

streeting.canvasToUrl = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	return canvas.toDataURL(IMAGE_MIME);
}



