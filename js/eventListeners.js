// Setup editNote page with the correct values.
function updateEditNotePage(urlObj, options) {
	var index = urlObj.hash.replace( /.*index=/, "" ),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	
	var title = document.getElementById("editNoteTitle"),
		note = document.getElementById("editNoteText"),
		dataJSON = jQuery.parseJSON(localStorage.getItem(index));
	title.value = dataJSON.title;
	note.value = dataJSON.note;	
	
	var $page = $( pageSelector );
	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

// Any page change into the home page will invoke this function.
function updateList(urlObj, options) {
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
}

// Any page change event will go into here.
$(document).bind("pagebeforechange", function(e, data) {
	if (typeof data.toPage === "string") {
		var requestURL = $.mobile.path.parseUrl( data.toPage ),
			homeURL = /^#home/,
			editURL = /^#editNote/;
		if (requestURL.hash.search(homeURL) !== -1) {
			updateList(requestURL, data.options);
			e.preventDefault();
		} else if (requestURL.hash.search(editURL) !== -1) {
			updateEditNotePage(requestURL, data.options);
			e.preventDefault();
		}
	}
});

// Event listener which is invoked when the device changes orientation.
$(document).bind("orientationchange", function(event) {
	$('#todoList').css('height', 
		window.screen.height - $('#todoListHeader').height() - $('#todoListNavbar').height() - 32);
});