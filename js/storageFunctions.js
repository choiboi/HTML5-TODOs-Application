function addNote() {
	var title = document.getElementById("addNoteTitle");
	var note = document.getElementById("addNoteText");
	var date = dateParser();
	
	var data = JSON.stringify({
		"title" : title.value, 
		"note" : note.value, 
		"dateAdded" : date,
		"completed" : "false"
	});
	
	// Clear values in textfield.
	title.value = "";
	note.value = "";
	
	addToStorage(localStorage.length, data);
}

function addToStorage(date, data) {
	localStorage.setItem(date, data)
}

function editNote(urlObj, options) {
	var index = urlObj.hash.replace( /.*index=/, "" ),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	
	var title = document.getElementById("editNoteTitle"),
		note = document.getElementById("editNoteText"),
		dataJSON = jQuery.parseJSON(localStorage.getItem(index));
	title.value = dataJSON.title;
	note.value = dataJSON.note;	
	
	$page = $( pageSelector );
	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

// Any page change into the home page will invoke this function.
function updateList(urlObj, options) {
	var index = 0,
		list = "<ul data-role='listview'>";
	
	for (index = 0; index < localStorage.length; index++) {
		var data = localStorage.getItem(index);
		var dataJSON = jQuery.parseJSON(data);
		list += "<li><a href='#editNote?index=" + index + 
				"' style='white-space:normal'><h3>" + dataJSON.title + 
				"</h3><p class='notes'>" + dataJSON.note + "</p><p " +
				"class='ui-li-aside'><strong>"+ dataJSON.dateAdded +
				"</strong></p></a></li>";
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
		} else if (requestURL.hash.search(editURL) !== -1) {
			editNote(requestURL, data.options);
		}
		e.preventDefault();
	}
});


