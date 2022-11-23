// filter.js

import {getEntriesFromStorage} from "../restaurantEntry/restaurantEntryRepo.js";
import {addEntriesToDocument} from "../list/list.js";

const TAGS = ["vegan", "western", "chinese", "japanese", "kids", "other"];

window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the entries from localStorage
  loadFilters();
  getFilters();
  // Add each entry to the <main> element
}

function loadFilters() {
    let filter = document.getElementById('filter');
    filter.innerHTML = '';
    for (let i = 0; i < TAGS.length; i++) {
        filter.innerHTML += `<label for="by-${TAGS[i]}">
                                ${TAGS[i]} <input type="checkbox" id="by-${TAGS[i]}" value="yes" name="by-${TAGS[i]}">
                            </label>`;
    }
}

function getFilters() {
    let filters = [];
    for (let i = 0; i < TAGS.length; i++) {
        filters[TAGS[i]] = false;
    }

    for (let i = 0; i < TAGS.length; i++) {
        let id = 'by-' + TAGS[i];
        document.getElementById(id).addEventListener('change', function() {
            filters[TAGS[i]] = this.checked;
            filterEntries(filters);
        });
    }
}

function filterEntries(filters) {
    let count = 0;
    let entries = getEntriesFromStorage();
    console.log(filters);
    let filteredEntries = [];
    
    for (let i = 0; i < entries.length; i++) {
        let taken = true;
        for (let j = 0; j < TAGS.length; j++) {
            if (filters[TAGS[j]] && !entries[i].tags.includes(' ' + TAGS[j])) {
                taken = false;
                break;
            }
        }
        if (taken) {
            filteredEntries[count] = entries[i];
            count++;
        }
    }
    
    addEntriesToDocument(filteredEntries);
}