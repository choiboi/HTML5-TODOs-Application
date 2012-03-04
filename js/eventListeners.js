// Any page change into the home page will invoke this function.
function updateHomePage(urlObj, options) {
	var index = 0,
		list = "<ul data-role='listview'>",
		completedLine = "<p class='completedLabel'><b>TODO COMPLETED</b></p>",
		ongoingLine = "<p class='ongoingLabel'><b>TODO ONGOING</b></p>";
	
	for (index = 0; index < localStorage.length; index++) {
		var data = localStorage.getItem(index);
		var dataJSON = jQuery.parseJSON(data);
		list += "<li><a href='#editNote?index=" + index + 
				"' data-transition='none'><p class='editNoteTitle'><b>" + 
				dataJSON.title + "</b><br/></p>";
		
		if (dataJSON.completed === "true") {
			list += completedLine;
		} else {
			list += ongoingLine;
		}
		
		list += "<p class='notes' style='white-space:pre'>" + dataJSON.note + 
				"</p><p class='ui-li-aside'><strong>Date Created: " +
				dataJSON.dateAdded + "</strong></p></a></li>";
	}
	list += "</ul>";

	var $page = $( urlObj.hash ),
		$content = $page.children(":jqmData(role=content)");
	$content.html(list);
	$page.page();
	$content.find( ":jqmData(role=listview)" ).listview();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
	updatePageLayout("#homeContent", "#homeHeader", "#homeNavbar");
}

// Setup addNote page with the correct values.
function updateAddNotePage(urlObj, options) {
	var $page = $( urlObj.hash ),
		$content = $page.children(":jqmData(role=content)");
	
	textfield = "<b><label class='label'>Note Title:</label></b>" +
				"<input id='addNoteTitle' type='text' class='textInput'></input>" +
				"<b><label id='todoLabel' class='label'>TODO:</label></b>" +
				"<textarea id='addNoteText' type='text' class='textInput'></textarea>";
	
	// $("#addNoteTitle").val("");
	// $("#addNoteText").val("");
	
	$content.html(textfield);
	$page.page();
	$("input").textinput();
	$("textarea").textinput();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options);
	updatePageLayout("#addNoteContent", "#addNoteHeader", "#addNoteNavbar");
}

// Setup editNote page with the correct values.
function updateEditNotePage(urlObj, options) {
	var index = urlObj.hash.replace( /.*index=/, "" ),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	
	var dataJSON = jQuery.parseJSON(localStorage.getItem(index));

	$("#editNoteTitle").val(dataJSON.title);
	$("#editNoteText").val(dataJSON.note);
	
	var $page = $( pageSelector );
	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
	updatePageLayout("#editNoteContent", "#editNoteHeader", "#editNoteNavbar");
}

// Setup about page with the correct values.
function updateAboutPage(urlObj, options) {
	var $page = $( urlObj.hash );
	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
	updatePageLayout("#aboutContent", "#aboutHeader", "#aboutNavbar");
}

// Invoke whenever a page is loaded or device orientation changed.
function updatePageLayout(content, header, navbar) {
	$(content).css('height', 
		window.screen.height - $(header).height() - $(navbar).height() - 32);
}

// Any page change event will go into here.
$(document).bind("pagebeforechange", function(e, data) {
	if (typeof data.toPage === "string") {
		var requestURL = $.mobile.path.parseUrl( data.toPage );

		if (requestURL.hash.search(/^#home/) !== -1) {
			updateHomePage(requestURL, data.options);
		} else if (requestURL.hash.search(/^#editNote/) !== -1) {
			updateEditNotePage(requestURL, data.options);
		} else if (requestURL.hash.search(/^#addNote/) !== -1) {
			updateAddNotePage(requestURL, data.options);
		} else if (requestURL.hash.search(/^#about/) !== -1) {
			updateAboutPage(requestURL, data.options);
		}
		e.preventDefault();
	}
});

// Event listener which is invoked when the device changes orientation.
$(document).bind("orientationchange", function(event) {
	var url = $(location).attr("href");

	if (selector.indexOf("#home") !== -1) {
		updatePageLayout("#homeContent", "#homeHeader", "#homeNavbar");
	} else if (selector.indexOf("#addNote") !== -1) {
		updatePageLayout("#addNoteContent", "#addNoteHeader", "#addNoteNavbar");
	} else if (selector.indexOf("#editNote") !== -1) {
		updatePageLayout("#editNoteContent", "#editNoteHeader", "#editNoteNavbar");
	} else if (selector.indexOf("#about") !== -1) {
		updatePageLayout("#aboutContent", "#aboutHeader", "#aboutNavbar");
	} 
});