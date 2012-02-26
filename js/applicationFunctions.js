function closeApp() {
	blackberry.app.exit();
}

function dateParser() {
	var dateRaw = new Date();
	var dateArray = dateRaw.toString().split(" ");
	var date =  dateArray[0] + ". " + dateArray[2] + ", " + dateArray[3];
	var dateTime = date + " " + dateArray[4];
	return new Array(date, dateTime);
}