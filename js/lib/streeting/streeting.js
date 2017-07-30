/**
	* Streeting main script 1.0
	* m@rtlin, 27. 7. 2017
	*/

streeting = {};

var ID_ATTR_NAME = "data-streeting-id";
var ATTR_ATTR_NAME = "data-streeting-attr";
var STYLE_PROP_ATTR_NAME = "data-streeting-style-property";
var PROCESSOR_ATTR_NAME = "data-streeting-processor";

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

streeting.initialize = function(svgId, templateUrl) {
		this.loadTemplate(svgId, templateUrl);
}

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
///////////////////////////////////////////////////////////////////////////////

streeting.process = function(svgId, dataSourceId) {
	var data = this.inferData(dataSourceId);
	this.putIntoTemplate(data);

	var links = this.outputToImages(svgId);
	return links;
}

///////////////////////////////////////////////////////////////////////////////


streeting.inferData = function(dataSourceId) {
	var inputs = this.listInputs(dataSourceId);
	var data = this.inferDataFromInputs(inputs);

	return data;
}

streeting.listInputs = function(dataSourceId) {
	var dataSource = document.getElementById(dataSourceId);
	var children = dataSource.childNodes;

	var predicate = function (e) {
		return e.getAttribute && e.getAttribute(ID_ATTR_NAME);
	};

	var filtered = streeting.filterAndFlatten(children, predicate);

	return filtered;
}

streeting.inferDataFromInputs = function(inputs) {
	var result = [];
	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		var value = this.inferValueOfInput(input);
		
		var id = input.getAttribute(ID_ATTR_NAME);

		var attr = input.getAttribute(ATTR_ATTR_NAME);
		var style = input.getAttribute(STYLE_PROP_ATTR_NAME);	
		var processor = input.getAttribute(PROCESSOR_ATTR_NAME);
		
		var item = { 'id': id, 'value': value, 'attr': attr, 'style': style, 'processor': processor };
		//console.log(item);
		result.push(item);
	}

	return result;
}

streeting.inferValueOfInput = function(input) {
	switch (input.type) {
		case "radio":
		case "checkbox":
			return input.checked;
		default:
			return input.value;
	}
}
///////////////////////////////////////////////////////////////////////////////


streeting.putIntoTemplate = function(data) {
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		//console.log(item);

		var id = item.id;

		var elem = document.getElementById(id);
		
		var value = item.value;
		var attr = item.attr;
		var style = item.style;
		var processor = item.processor;
	
		if (!attr && !style && !processor) {
			elem.innerHTML = value;
		}

		if (attr) {
			elem.setAttribute(attr, value);
		}

		if (style) {
			elem.style[style] = value;
		}

		if (processor) {
			var fun = eval(processor);
			fun(id, elem, value);
		}
	}
}

streeting.outputToImages = function(svgId) {
	
	var svgRoot = document.getElementById(svgId);
	var serializer = new XMLSerializer();
	var svgXml = serializer.serializeToString(svgRoot);

	var svgSvgUrl = "data:image/svg+xml;base64," + btoa(svgXml);
	// here should go render to PNG, but - will need external library, foo

	var links = { 'svg': svgSvgUrl };
	//console.log(links);
	return links;
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
