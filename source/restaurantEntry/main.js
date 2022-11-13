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
  editPostHandler();
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
    if (allEntries != null && allEntries.length > 0) {
      let exists = false;
      for (let i = 0; i < allEntries.length; i++) {
        if (allEntries[i].titleTxt == entryObject.titleTxt) {
          alert('Failed to add new entry. An entry with the same title already exists.');
          exists = true;
          break;
        }
      } 
      if (!exists) {
        let entryCount = allEntries.length + 1;
        // Default sort by rating, descending order
        for (let j = 0; j < allEntries.length; j++) {
          if (allEntries[j].rating < entryObject.rating) {
            for (let k = allEntries.length; k > j; k--) {
              allEntries[k] = allEntries[k - 1];
            }
            allEntries[j] = entryObject;
            break;
          }
        }
        if (allEntries.length < entryCount) {
          allEntries[allEntries.length] = entryObject;
        }
      }
    } else {
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
  }

  for (let i = 0; i < entries.length; i++) {
    buttons[i].addEventListener('click', function() {
      removeEntryFromLocalStorage(i);
      document.querySelector('#' + entries[i].titleTxt).remove();
    });
  }
}

function editPostHandler() {
  let entries = getEntriesFromStorage();
  let buttons = [];
  for (let i = 0; i < entries.length; i++) {
    buttons[i] = document.querySelector('#' + entries[i].titleTxt).shadowRoot.querySelector('button[type="edit"]');
  }

  for (let i = 0; i < entries.length; i++) {
    buttons[i].addEventListener('click', function() {
      let entry = removeEntryFromLocalStorage(i);
      document.querySelector('#' + entries[i].titleTxt).remove();
      let form = document.getElementById('restaurant-entry');
      console.log(form);
      form.innerHTML = `<fieldset>
                        <legend>Image:</legend>
                        <label for="image-src">
                          Source:
                          <input type="text" id="imgSrc" name="imgSrc" value="${entry.imgSrc}" required>
                        </label>
                        <label for="image-alt">
                          Alt Text:
                          <input type="text" id="imgAlt" name="imgAlt" value="${entry.imgAlt}" required>
                        </label>
                      </fieldset>
                      <fieldset>
                        <legend>Title:</legend>
                        <label for="title-txt">Text:
                          <input type="text" id="titleTxt" name="titleTxt" value="${entry.titleTxt}" required>
                        </label>
                        <label for="title-lnk">Link:
                          <input type="url" id="titleLnk" name="titleLnk" value="${entry.titleLnk}" required>
                        </label>
                      </fieldset>
                      <fieldset>
                        <legend>Rating</legend>
                        <label for="rating-0">
                          0<input type="radio" id="rating-0" value="0" name="rating">
                        </label>
                        <label for="rating-1">
                          1<input type="radio" id="rating-1" value="1" name="rating">
                        </label>
                        <label for="rating-2">
                          2<input type="radio" id="rating-2" value="2" name="rating">
                        </label>
                        <label for="rating-3">
                          3<input type="radio" id="rating-3" value="3" name="rating">
                        </label>
                        <label for="rating-4">
                          4<input type="radio" id="rating-4" value="4" name="rating">
                        </label>
                        <label for="rating-5">
                          5<input type="radio" id="rating-5" value="5" name="rating">
                        </label>
                        <label for="numRatings">
                          Num Ratings:
                          <input type="number" id="numRatings" name="numRatings" value="${entry.numRatings}">
                        </label>
                      </fieldset>
                      <fieldset>
                        <legend>Other Info:</legend>
                        <label for="organization">
                          Organization:
                          <input type="text" id="organization" name="organization" value="${entry.organization}" required>
                        </label>
                        <label for="lengthTime">
                          Length (time):
                          <input type="text" id="lengthTime" name="lengthTime" value="${entry.lengthTime}" required>
                        </label>
                        <label for="ingredients">
                          <p>Ingredients:</p>
                          <textarea name="ingredients" id="ingredients" cols="38" rows="5" 
                            required>${entry.ingredients}</textarea>
                        </label>
                      </fieldset>
                      <button type="add">Save Restaurant</button>
                      <button type="deleteAll" class="danger">Delete all restaurants</button>`;
      document.getElementById('rating-'+entry.rating).checked = true;
      initFormHandler();
    });
  }
}