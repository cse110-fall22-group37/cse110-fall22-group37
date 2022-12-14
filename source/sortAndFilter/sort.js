// sort.js

import {getEntriesFromStorage} from "../restaurantEntry/restaurantEntryRepo.js"
import {addEntriesToDocument} from "../list/list.js"

window.addEventListener("DOMContentLoaded", init)

// Starts the program, all function calls trace back here
function init() {
	// Get the entries from localStorage
	loadParams()
	getParams()
	// Add each entry to the <main> element
}

function loadParams() {
	let filter = document.getElementById("sort-by")
	filter.innerHTML = `<label for="priceAsc">
                            <input type="radio" id="priceAsc" value="1" name="price">
							<a>Price Low<a>
                        </label>
                        <label for="priceDesc">
                            <input type="radio" id="priceDesc" value="-1" name="price">
							<a>Price High<a>
                        </label>`
}

function getParams() {
	document.getElementById("priceAsc").addEventListener("change", function() {
		sortEntries("priceAsc")
	})
	document.getElementById("priceDesc").addEventListener("change", function() {
		sortEntries("priceDesc")
	})
}

function sortEntries(param) {
	let entries = getEntriesFromStorage()
    
	if (param == "priceAsc") {
		for (let i = 0; i < entries.length - 1; i++) {
			for (let j = 0; j < entries.length - i - 1; j++) {
				if (entries[j].price > entries[j + 1].price) {
					let temp = entries[j]
					entries[j] = entries[j + 1]
					entries[j + 1] = temp
				}
			}
		}
	} else if (param == "priceDesc") {
		for (let i = 0; i < entries.length - 1; i++) {
			for (let j = 0; j < entries.length - i - 1; j++) {
				if (entries[j].price < entries[j + 1].price) {
					let temp = entries[j]
					entries[j] = entries[j + 1]
					entries[j + 1] = temp
				}
			}
		}
	}
    
	addEntriesToDocument(entries)
}