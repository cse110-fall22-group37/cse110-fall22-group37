/**
 * The init() function is run after the webpage is finished
 * loading
 */
 import {getEntriesFromStorage} from "../restaurantEntry/restaurantEntryRepo.js";
 import {addEntriesToDocument} from "../list/list.js";
window.addEventListener('DOMContentLoaded', init);

/**
 * Creates a list of the restaurants from local storage
 */
function getRestaurantsFromStorage() {
  return JSON.parse(localStorage.getItem('entries'));
}

/**
 * When the webpage loads, the restaurants from storage
 * are added to the list
 */
function init() {
  let searchbar= document.getElementById('search-bar');
  searchbar.onkeyup = function(){
    search();
  }
   
}

/**
 * When user types in search field, non-matching results 
 * are hidden
 */
function search(){
  let count = 0;
  let entries = getEntriesFromStorage();
  let filteredEntries = [];
  var input, filter, a, i, txtValue;
  input = document.getElementById('search-bar');
  filter = input.value.toUpperCase();
  for (let i = 0; i < entries.length; i++){
      if(entries[i].name.toUpperCase().indexOf(filter) > -1){
        filteredEntries[count] = entries[i];
        count++;
      }
  }
  addEntriesToDocument(filteredEntries);
}

