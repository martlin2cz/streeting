/**
	* Streeting main script 1.0
	* m@rtlin, 27. 7. 2017
	*/

streeting = {};

var ID_ATTR_NAME = "data-streeting-id";
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
	var dataSource = document.getElementById(dataSourceId);
	var children = dataSource.childNodes;

	var predicate = function (e) {
		return e.getAttribute && e.getAttribute(ID_ATTR_NAME);
	};

	var filtered = streeting.filterAndFlatten(children, predicate);
	
	var result = {};
	for (var i = 0; i < filtered.length; i++) {
		var node = filtered[i];
		var idAttrValue = node.getAttribute(ID_ATTR_NAME);
		var value = node.value;
		result[idAttrValue] = value;
	}

	return result;
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
	var serializer = new XMLSerializer();
	var svgXml = serializer.serializeToString(svgRoot);

	var svgSvgUrl = "data:image/svg+xml;base64," + btoa(svgXml);
	// here should go render to PNG, but - will need external library, foo

	return { 'svg': svgSvgUrl };
}


///////////////////////////////////////////////////////////////////////////////

streeting.filterAndFlatten = function(nodes, predicate) {
	var result = [];

	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var match = predicate(node);
		if (match) {
			result.push(node);
		}
		
		var children = node.childNodes;
		var subresult = this.filterAndFlatten(children, predicate);
		result = result.concat(subresult);
	}

	return result;
}
