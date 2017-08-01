/**
	* Some utilities to be usable with the streeting
	*/
var DATE_TO_SHORT_STRING = function(date) {
	return date.getDate() + ". " + (date.getMonth() + 1) + ". ";
}

var DATE_TO_FULL_STRING = function(date) {
	return date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear();
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


streeting.baseDateProcessor = function (id, elem, value, dateToStringFn) {
	var date = new Date(value);
	
	var str = dateToStringFn(date);

	elem.innerHTML = str;
}

streeting.shortDateProcessor = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, DATE_TO_SHORT_STRING);
}
streeting.fullDateProcessor = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, DATE_TO_FULL_STRING);
}
streeting.shortTimeProcessor = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, TIME_TO_SHORT_STRING);
}
streeting.fullTimeProcessor = function(id, elem, value) {
	streeting.baseDateProcessor(id, elem, value, TIME_TO_FULL_STRING);
}

///////////////////////////////////////////////////////////////////////////////


function multilinedTextProcessor(id, elem, value) {

  var lines = value.split(/<br>/);

  //clearChildren(elem);
  elem.innerHTML = "";
  var x = elem.getAttribute('x');

  for (var i = 0; i < lines.length; i++) {
    elem.innerHTML += '<tspan x="' + x + '" dy="1eM">' + lines[i] + '</tspan>';
    
    /*
    var child = document.createElement('tspan');
  
    child.innerHTML = lines[i];

    child.setAttribute('x', elem.getAttribute('x'));
    child.setAttribute('dy', '1eM');

    elem.appendChild(child);
     */
  }
}
