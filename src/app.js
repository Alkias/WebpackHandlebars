var bookListingTemplate = require("./layout.handlebars");
import { setup } from "./setup";
import "./css/main.scss";
import data from './data/data.json'
import  './images/logo.png'

$(() => {
	var div = $(`<div id="mitsos"></div>`)
	.html(bookListingTemplate(data))
	.appendTo("body");

	setup();
})
