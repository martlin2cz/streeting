/**
	* Some utilities to be usable with the streeting
	*/

streeting.makeSourceInteractive = function(dataSourceId, processHandler) {
	var inputs = this.listInputs(dataSourceId);

	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		this.makeInputInteractive(input, processHandler);
	}
}

streeting.makeInputInteractive = function(input, processHandler) {
	var listener = function(e) {
		processHandler();
	};

	switch (input.type) {
		case "radio":
			input.addEventListener("click", listener);
			break;
		default:
			input.addEventListener("input", listener);
			break;
	}
}	
