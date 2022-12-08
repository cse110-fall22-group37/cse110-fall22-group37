// main.js

import {getEntriesFromStorage} from "../restaurantEntry/restaurantEntryRepo.js"


//Run the init() function when the page has loaded so the DOM content has loaded
window.addEventListener("DOMContentLoaded", init)

/**
 * Starts the program, all function calls trace back to init()
 * Calls the initExportBtnHandler function
 */
function init() {
	initExportBtnHandler()
}

/**
 * Exports the current list of elements in the order shown on screen
 * Invokes a window to save as pdf, to save the current list
 */
export function exportToPDF(entries) {
  let list = document.getElementById("export")
  list.innerHTML += `<h1> WHERE2EAT </h1>`
  for (let i = 0; i < entries.length; i++) {
    list.innerHTML += `<h3> ${i + 1}. ${entries[i].name}</h3>
                      <img src= "${entries[i].img}">
                      <p> Rating: ${entries[i].rating}; Price: ${entries[i].price}; Tags: ${entries[i].tags}; Description: ${entries[i].description} </p>
                      <br>`
  }

	window.print()
	setTimeout(() => {
    list.innerHTML = ''
	}, 0.0000000001)
}

/**
 * Add an event listener to the export button so when it is clicked, 
 * it calls exportToPDF();
 */
export function initExportBtnHandler(entries) {
	let button = document.createElement("export-button")
	document.body.appendChild(button)
	button.addEventListener("click", (event) =>{
		exportToPDF(entries)
	})
}
