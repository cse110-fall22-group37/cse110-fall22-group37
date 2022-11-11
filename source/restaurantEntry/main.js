// main.js
import {getEntriesFromStorage, saveEntriesToStorage, removeEntryFromLocalStorage} from "./restaurantEntryRepo.js";
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the entries from localStorage
  let entries = getEntriesFromStorage();
  // Add each entry to the <main> element
  addEntriesToDocument(entries);
  // Add the event listeners to the form elements
  initFormHandler();

  deletePostHandler();
}

/**
 * Takes in an array of entries and for each entry creates a
 * new <restaurant-entry> element, adds the entry data to that card
 * using element.data = {...}, and then appends that new entry
 * to <main>
 * @param {Array<Object>} entries An array of entries
 */
function addEntriesToDocument(entries) {
  // A10. TODO - Get a reference to the <main> element
  let main = document.querySelector('main');

  // A11. TODO - Loop through each of the entries in the passed in array,
  //            create a <restaurant-entry> element for each one, and populate
  //            each <restaurant-entry> with that entry data using element.data = ...
  //            Append each element to <main>
  
  if (entries != null) {
    for (let i = 0; i < entries.length; i++) {
      let restaurantEntry = document.createElement('restaurant-entry');
      restaurantEntry.id = entries[i].titleTxt;
      restaurantEntry.data = entries[i];
      main.appendChild(restaurantEntry);
    }
  }
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  // let form = document.querySelector('form');
  let form = document.getElementById('restaurant-entry');
  
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  document.querySelector('button[type="add"]').addEventListener('click', function() {
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
    if (!form.checkValidity()) return;

    let newForm = new FormData(form);
  
  // B5. TODO - Create an empty object (I'll refer to this object as entryObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into entryObject
  let entryObject = new Object();
    for(let [name, value] of newForm) {
      entryObject[name] = value;
    }
    
  // B6. TODO - Create a new <restaurant-entry> element
    let restaurantEntry = document.createElement('restaurant-entry');

  // B7. TODO - Add the entryObject data to <restaurant-entry> using element.data
    restaurantEntry.data = entryObject;

  // B8. TODO - Append this new <restaurant-entry> to <main>
    document.querySelector('main').appendChild(restaurantEntry);

  // B9. TODO - Get the entries array from localStorage, add this new entry to it, and
  //            then save the entries array back to localStorage
    let allEntries = JSON.parse(window.localStorage.getItem('entries'));
    if (allEntries != null) {
      let exists = false;
      for (let i = 0; i < allEntries.length; i++) {
        if (allEntries[i].titleTxt == entryObject.titleTxt) {
          alert('Failed to add new entry. An entry with the same title already exists.');
          exists = true;
          break;
        }
      } 
      if (!exists) allEntries[allEntries.length] = entryObject;
    }
    else {
      allEntries = [];
      allEntries[0] = entryObject;
    };
    saveEntriesToStorage(allEntries);
  });

  // B10. TODO - Get a reference to the "Clear Local Storage" button
  let clearLocalStorage = document.querySelector('button[type="deleteAll"]');

  // B11. TODO - Add a click event listener to clear local storage button
  clearLocalStorage.addEventListener('click', function() {
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
    window.localStorage.clear();

  // B13. TODO - Delete the contents of <main>
    document.querySelector('main').innerHTML = '';
  });
}

function deletePostHandler(e) {
  let entries = getEntriesFromStorage();
  let buttons = [];
  for (let i = 0; i < entries.length; i++) {
    buttons[i] = document.querySelector('#' + entries[i].titleTxt).shadowRoot.querySelector('button[type="delete"]');
    console.log(buttons[i]);
  }

  for (let i = 0; i < entries.length; i++) {
    buttons[i].addEventListener('click', function() {
      removeEntryFromLocalStorage(i);
      document.querySelector('#' + entries[i].titleTxt).remove();
    });
  }
}