// Adds note into localStorage.
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

	localStorage.setItem(localStorage.length, data);
}

// Delete specified note from localStorage.
function deleteNote() {
	var index = getIndexValue(document.URL),
		ind = 0;
	
	for (ind = index; ind < localStorage.length; ind++) {
		if (ind + 1 < localStorage.length) {
			nextData = localStorage.getItem(ind + 1);
			localStorage.setItem(ind, nextData);
		} else if (ind === localStorage.length - 1) {
			localStorage.removeItem(ind);
		}
	}
}

// Edit note title and TODOs with newly provided data.
function editNote() {
	var title = document.getElementById("editNoteTitle"),
		note = document.getElementById("editNoteText"),
		index = getIndexValue(document.URL);
	var dataJSON = jQuery.parseJSON(localStorage.getItem(index));
	
	var data = JSON.stringify({
		"title" : title.value, 
		"note" : note.value, 
		"dateAdded" : dataJSON.dateAdded,
		"completed" : dataJSON.completed
	});
	
	localStorage.setItem(index, data);
}

// Change TODO status (either completed or not completed).
function markCompleted() {
	var index = getIndexValue(document.URL)
		marked = "false";
	var dataJSON = jQuery.parseJSON(localStorage.getItem(index));
	
	if (dataJSON.completed === "false") {
		marked = "true";
	}
	
	var data = JSON.stringify({
		"title" : dataJSON.title, 
		"note" : dataJSON.note, 
		"dateAdded" : dataJSON.dateAdded,
		"completed" : marked
	});
	
	localStorage.setItem(index, data);
}
