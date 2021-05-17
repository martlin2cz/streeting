/**
	* Some utilities to be usable with the streeting
	*/
var DATE_TO_SHORT_STRING = function(date) {
	return date.getDate() + "." + (date.getMonth() + 1) + ".";
}

var DATE_TO_FULL_STRING = function(date) {
	return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

var TIME_TO_SHORT_STRING = function(date) {
	return date.getHours() + ":" + date.getMinutes();
}

var TIME_TO_FULL_STRING = function(date) {
	return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

///////////////////////////////////////////////////////////////////////////////

streeting.makeSourceInteractive = function(dataSourceId, processHandler) {
	var inputs = this.listInputs(dataSourceId);

	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		this.makeInputInteractive(input, processHandler);
	}
}

streeting.makeInputInteractive = function(input, processHandler) {
	var listener = function(e) {
		processHandler(e);
	};

	switch (input.type) {
		case "radio":
		case "checkbox":
			input.addEventListener("click", listener);
			break;
		default:
			input.addEventListener("input", listener);
			break;
	}
}

///////////////////////////////////////////////////////////////////////////////

streeting.importFromJson = function(dataSourceId, json) {
	var data;
	try {
		data = JSON.parse(json);
	} catch (e) {
		alert('Cannot parse JSON data');
	}
	
	this.disperseData(dataSourceId, data);
}

streeting.exportToJson = function(dataSourceId) {
	var data = this.inferData(dataSourceId);

	var json = JSON.stringify(data);

	return json;
}

///////////////////////////////////////////////////////////////////////////////

streeting.outputByOIC = function(svgId, format, svgEncoding, handler, errorHandler) {
	var svg = document.getElementById(svgId);

	if (format == 'svg') {
		var link = oic.convertSVGtoSVGdata(svg, svgEncoding, errorHandler);
		handler(link);
	} else {
		oic.convertSVGtoImageData(svg, format, handler, errorHandler);
	}
}

///////////////////////////////////////////////////////////////////////////////
streeting.dateProcessor = {};
streeting.timeProcessor = {};

streeting.dateProcessor.short = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, DATE_TO_SHORT_STRING);
}
streeting.dateProcessor.full = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, DATE_TO_FULL_STRING);
}
streeting.timeProcessor.short = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, TIME_TO_SHORT_STRING);
}
streeting.timeProcessor.full = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, TIME_TO_FULL_STRING);
}

streeting.baseDateProcessor = function (id, elem, value, dateToStringFn) {
	var date = new Date(value);
	
	var str = dateToStringFn(date);

	elem.innerHTML = str;
}
///////////////////////////////////////////////////////////////////////////////
streeting.multilinedTextProcessor = {};

streeting.multilinedTextProcessor.topAligned = function(id, elem, value) {
	streeting.baseMultilinedTextProcessor(id, elem, value, false);
}

streeting.multilinedTextProcessor.centerAligned = function(id, elem, value) {
	streeting.baseMultilinedTextProcessor(id, elem, value, true);
}

streeting.baseMultilinedTextProcessor = function(id, elem, value, isCentered) {

  var lines = value.split(/<br *\/?>/);

  elem.innerHTML = "";
  var x = elem.getAttribute('x');

  for (var i = 0; i < lines.length; i++) {
		var dy;
		if (i == 0) {
			if (isCentered) {
				dy = - (lines.length / 2);
			} else {
				dy = 0;
			}
		} else {
			dy = 1;
		}
    
		elem.innerHTML += '<tspan x="' + x + '" dy="' + dy + 'eM">' + lines[i] + '</tspan>';
  }
}

///////////////////////////////////////////////////////////////////////////////
streeting.sizeProcessor = function(id, elem, value) {
	elem.setAttribute("width", value);
	elem.setAttribute("height", value);
}

streeting.roundCornersProcessor = function(id, elem, value) {
	elem.setAttribute("rx", value);
	elem.setAttribute("rx", value);
}

