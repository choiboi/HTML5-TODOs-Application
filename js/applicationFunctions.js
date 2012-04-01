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

// Add #home tage in the URL when the application first loads.
// This will enable it to list all the TODOs.
function loadPage() {
	var currentPage = $(location).attr("href");
	
	if (currentPage.indexOf("#home") === -1 && 
			currentPage.indexOf("#") === -1 ) {
		window.location = currentPage + "#home";
	}
}

// Open up the browser application to the specified link.
function openBrowser(link) {
	var args = new blackberry.invoke.BrowserArguments(link);
	blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
}

// Display alert indicating that title field or the text field is empty.
function alertEmptyText(title, text) {
	var INFO_TEXT = "Please enter information.";
	
	if ($(title).val() === "" && $(text).val() === "") {
		blackberry.ui.dialog.standardAskAsync("Both Title and TODO fields empty. " + INFO_TEXT,
											  blackberry.ui.dialog.D_OK,
											  null);
	} else if ($(title).val() === "" && $(text).val() !== "") {
		blackberry.ui.dialog.standardAskAsnyc("Title field empty. " + INFO_TEXT,
											  blackberry.ui.dialog.D_OK,
											  null);
	} else {
		blackberry.ui.dialog.standardAskAsync("TODO field empty. " + INFO_TEXT,
											  blackberry.ui.dialog.D_OK,
											  null)
	}
}
