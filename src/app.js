var bookListingTemplate = require("./book-listing.handlebars");
import data from './data/data.json'

document.addEventListener("DOMContentLoaded", function() {
	var div = document.createElement('div');
	div.innerHTML = bookListingTemplate(data);
	document.body.appendChild(div);
});
