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

// Clear textfield value when leaving the addNote page.
function addNoteClearValues() {
	document.getElementById("addNoteTitle").value = "";
	document.getElementById("addNoteText").value = "";
}

// Add #home tage in the URL when the application first loads.
// This will enable it to list all the TODOs.
function loadPage() {
	var currentPage = document.URL;
	
	if (currentPage.indexOf("#home") === -1) {
		location.href = currentPage + "#home";
	}
}

// Open up the browser application to the specified link.
function openBrowser(link) {
	alert(link);
	var args = blackberry.invoke.BrowserArguments(link);
	blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
}
