// Close the application.
function closeApp() {
	blackberry.app.exit();
}

// Get the current system date.
function dateParser() {
	var dateRaw = new Date();
	var dateArray = dateRaw.toString().split(" ");
	var date =  dateArray[1] + ". " + dateArray[2] + ", " + dateArray[3];
	return date;
}

// Get the index value from the URL
function getIndexValue(url) {
	var indexStr = url.substring(url.indexOf("?") + 1, url.length);
	var index = indexStr.substring(indexStr.indexOf("=") + 1, indexStr.length);
	
	return parseInt(index);
}