// list.js

import {getEntriesFromStorage} from "../restaurantEntry/restaurantEntryRepo.js";

window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the entries from localStorage
  let entries = getEntriesFromStorage();
  // Add each entry to the <main> element
  addEntriesToDocument(entries);
}

/**
 * Takes in an array of entries and for each entry creates a
 * new <restaurant-entry> element, adds the entry data to that card
 * using element.data = {...}, and then appends that new entry
 * to <main>
 * @param {Array<Object>} entries An array of entries
 */
export function addEntriesToDocument(entries) {
    //get the list from the document to add elements to in main
    let list = document.querySelector('#list');
    list.innerHTML = '';
    //if there are entries so it is not null
    if (entries != null) {
        //for each entry, create a restaurant entry and add to the document
        for (let i = 0; i < entries.length; i++) {
            let restaurantEntry = document.createElement('restaurant-entry');
            restaurantEntry.id = entries[i].name;
            restaurantEntry.data = entries[i];
            list.appendChild(restaurantEntry);
        }
    }
}