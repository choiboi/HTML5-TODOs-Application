function addNote() {
	var title = document.getElementById("addNoteTitle");
	var note = document.getElementById("addNoteText");
	var date = dateParser();
	
	var data = JSON.stringify({
		"title" : title.value, 
		"note" : note.value, 
		"dateAdded" : date[1],
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

function updateList(urlObj, options) {
	var index = 0,
		list = "<ul data-role='listview'>";
	
	for (index = 0; index < localStorage.length; index++) {
		var data = localStorage.getItem(localStorage.key(index));
		var dataJSON = jQuery.parseJSON(data);
		list += "<li><a href='#editNote' style='white-space:normal'><h3>" +
				dataJSON.title + "</h3><p class='notes'>" + dataJSON.note +
				"</p><p class='ui-li-aside'><strong>"+ dataJSON.dateAdded +
				"</strong></p></a></li>";
	}
	list += "</ul>";
	
	pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	var $page = $( pageSelector ),
		$content = $page.children(":jqmData(role=content)");
	$content.html(list);
	$page.page();
	$content.find( ":jqmData(role=listview)" ).listview();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

$(document).bind("pagebeforechange", function(e, data) {
	if (typeof data.toPage === "string") {
		var requestURL = $.mobile.path.parseUrl( data.toPage ),
			homeURL = /^#home/;
		if (requestURL.hash.search(homeURL) !== -1) {
			updateList(requestURL, data.options);
			e.preventDefault();
		}
	}
});


