/**
	* Set of basic processors. Requires streeting.js
	*/

streeting.backgroundProcessor = function(id, elem, value) {
	elem.style.fill = value;	
}

///////////////////////////////////////////////////////////////////////////////

/*
streeting.parseStyleAttr = function(elem) {
	var style = elem.style;

	//HACK: simple solution, won't work allways
	style = style.replace(/:/g, '": "');
	style = style.replace(/;/g, '"; "');
	style = "{ " + style + " }";

	var obj = JSON.parse(style);
	return obj;

}

streeting.exportStyleAttr = function(elem, obj) {
	var style = JSON.stringify(obj);

	style = style.replace(/[{}]/g, '');
	style = style.replace(/,/g, '": "');
	style = style.replace(/:/g, '"; "');

	elem.style = style;
}
*/
