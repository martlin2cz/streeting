/**
	* Streeting main script 1.0
	* m@rtlin, 27. 7. 2017
	*/

var IMAGE_MIME = "image/png";
streeting = {};

///////////////////////////////////////////////////////////////////////////////

streeting.initialize = function(svgId, templateUrl) {
		this.loadTemplate(svgId, templateUrl);
}

streeting.process = function(svgId, dataSourceId) {
	var data = this.inferData(dataSourceId);
	this.putIntoTemplate(data);

	var links = this.outputToImages(svgId);
	return links;
}

///////////////////////////////////////////////////////////////////////////////

streeting.loadTemplate = function(svgId, templateUrl) {
	var xhttp = new XMLHttpRequest();

	xhttp.open("GET", templateUrl, false);
	xhttp.overrideMimeType("image/svg+xml");
	xhttp.send();

	var doc = xhttp.responseXML.documentElement;
	doc.id = svgId;

	var oldSvg = document.getElementById(svgId);
	var wrapper = oldSvg.parentNode;

	wrapper.replaceChild(doc, oldSvg);
}

///////////////////////////////////////////////////////////////////////////////


streeting.inferData = function(dataSourceId) {
	return {'panel-text': 'Hi there!'};	//TODO FIXME
}

streeting.putIntoTemplate = function(data) {
	for (var id in data) {
		var elem = document.getElementById(id);
		var value = data[id];
		//TODO value handler
		elem.innerHTML = value;
	}
}

streeting.outputToImages = function(svgId) {
	
	var svgRoot = document.getElementById(svgId);
	var svgXml = (new XMLSerializer()).serializeToString(svgRoot);

	var svgSvgUrl = "data:image/svg+xml;base64," + btoa(svgXml);

	return { 'svg': svgSvgUrl };
}


///////////////////////////////////////////////////////////////////////////////

