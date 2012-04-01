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
	var INFO_TEXT = "Please enter information.",
		settings = {size : blackberry.ui.dialog.SIZE_SMALL,
					position : blackberry.ui.dialog.CENTER};
	
	if ($(title).val() === "" && $(text).val() === "") {
		blackberry.ui.dialog.standardAskAsync("Both Title and TODO fields empty.\n" + INFO_TEXT,
											  blackberry.ui.dialog.D_OK,
											  function () {},
											  settings);
	} else if ($(title).val() === "") {
		blackberry.ui.dialog.standardAskAsync("Title field empty.\n" + INFO_TEXT,
											  blackberry.ui.dialog.D_OK,
											  function () {},
											  settings);
	} else {
		blackberry.ui.dialog.standardAskAsync("TODO field empty.\n" + INFO_TEXT,
											  blackberry.ui.dialog.D_OK,
											  function () {},
											  settings);
	}
}

/* TextAreaResizer plugin */
$.fn.TextAreaResizer = function() {
	var textarea, staticOffset,
		iLastMousePos = 0;


	return this.each(function() {
		textarea = $(this).addClass('processed'), staticOffset = null;
		
		$(this).wrap('<div class="resizable-textarea"><span></span></div>')
			.parent().append($('<div class="grippie"></div>').bind("mousedown",{el: this} , startDrag));
		
		var grippie = $('div.grippie', $(this).parent())[0];
		grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';
	});
	
	function startDrag(e) {
		textarea = $(e.data.el);
		textarea.blur();
		iLastMousePos = mousePosition(e).y;
		staticOffset = textarea.height() - iLastMousePos;
		textarea.css('opacity', 0.25);
		$(document).mousemove(performDrag).mouseup(endDrag);
		return false;
	}
}
