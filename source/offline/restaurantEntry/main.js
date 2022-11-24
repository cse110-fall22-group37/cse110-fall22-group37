// main.js
import {getEntriesFromStorage, saveEntriesToStorage, removeEntryFromLocalStorage} from "./restaurantEntryRepo.js";
// Run the init() function when the page has loaded
const TAGS = ["vegan", "western", "chinese", "japanese", "kids", "other"];
window.addEventListener('DOMContentLoaded', init);
let time = 0;
// Starts the program, all function calls trace back here
function init() {
// Current URL: https://my-website.com/page_a
const nextURL = 'http://127.0.0.1:5501/source/offline/index.html';
const nextTitle = 'My new page title';
const nextState = { additionalInformation: 'Updated the URL with JS' };

// This will create a new entry in the browser's history, without reloading
window.history.pushState(nextState, nextTitle, nextURL);

// This will replace the current entry in the browser's history, without reloading
window.history.replaceState(nextState, nextTitle, nextURL);
  time = 1;
  console.log("initiated");
  if(localStorage.getItem('names') == null){
      var names = new Array();
      //names[0] = "New member name?"
      console.log("names does not exist");
      console.log("hi");
      console.log(names);
      names.push("rest1");
      console.log("why");
      console.log(names);
      names.push("rest2");
      localStorage.setItem("names", JSON.stringify(names));
  }else{
      console.log("names exists");
  }
  // Get the entries from localStorage
  let entries = getEntriesFromStorage();
  // Add each entry to the <main> element
  addEntriesToDocument(entries);
  // Add the event listeners to the form elements
  initFormHandler(null);
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
  let list = document.querySelector('#list');

  // A11. TODO - Loop through each of the entries in the passed in array,
  //            create a <restaurant-entry> element for each one, and populate
  //            each <restaurant-entry> with that entry data using element.data = ...
  //            Append each element to <main>
  
  if (entries != null) {
    for (let i = 0; i < entries.length; i++) {
      let restaurantEntry = document.createElement('restaurant-entry');
      restaurantEntry.id = entries[i].name;
      restaurantEntry.data = entries[i];
      list.appendChild(restaurantEntry);
    }
  }
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler(entry) {

  // B2. TODO - Get a reference to the <form> element
  // let form = document.querySelector('form');
  let form = document.getElementById('restaurant-entry');
  if (entry == null) {
    let nullEntry = {
      name: "",
      rating: "",
      price: "",
      description: "",
      tags: "",
      img: "",
      imgAlt: ""
    };
    entry = nullEntry;
  }
    form.innerHTML = `
    <label for="restaurant-name">Name:
      <input type="text" id="name" name="name" value="${entry.name}" required>
    </label>
    <br>
    <legend>Rating:</legend>
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
    <br>
    <legend>Price:</legend>
    <label for="price-1">
      $<input type="radio" id="price-1" value="1" name="price">
    </label>
    <label for="price-2">
      $$<input type="radio" id="price-2" value="2" name="price">
    </label>
    <label for="price-3">
      $$$<input type="radio" id="price-3" value="3" name="price">
    </label>
    <br>
    <label for="description">
      Description:
      <br>
      <textarea name="description" id="description" cols="38" rows="5">${entry.description}</textarea>
    </label>
    <br>
    <legend>Tags:</legend>
    <label for="${TAGS[0]}">
      ${TAGS[0]}<input type="checkbox" id="${TAGS[0]}" value="yes" name="${TAGS[0]}">
    </label>
    <label for="${TAGS[1]}">
      ${TAGS[1]}<input type="checkbox" id="${TAGS[1]}" value="yes" name="${TAGS[1]}">
    </label>
    <label for="${TAGS[2]}">
      ${TAGS[2]}<input type="checkbox" id="${TAGS[2]}" value="yes" name="${TAGS[2]}">
    </label>
    <label for="${TAGS[3]}">
      ${TAGS[3]}<input type="checkbox" id="${TAGS[3]}" value="yes" name="${TAGS[3]}">
    </label>
    <label for="${TAGS[4]}">
      ${TAGS[4]}<input type="checkbox" id="${TAGS[4]}" value="yes" name="${TAGS[4]}">
    </label>
    <label for="${TAGS[5]}">
      ${TAGS[5]}<input type="checkbox" id="${TAGS[5]}" value="yes" name="${TAGS[5]}">
    </label>
    <br>
    <label for="img">Select image:</label>
    <input type="file" id="img" name="img" accept="image/*" value="${entry.img}">
    <br>
    <label for="image-alt">
      Alt Text:
      <input type="text" id="imgAlt" name="imgAlt" value="${entry.imgAlt}">
    </label>
    <br>
  <button type="add">Save Restaurant</button>
  <button type="deleteAll" class="danger">Delete all restaurants</button>`;
  console.log("HIIII");
    if (entry.rating != "" && entry.price != "") {
      document.getElementById('rating-'+entry.rating).checked = true;
      document.getElementById('price-'+entry.price).checked = true;
    }
  
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  console.log("HEKKI");
  document.querySelector('button[type="add"]').addEventListener('click', function() {
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
  console.log("adding buttion");

    if (!form.checkValidity()) return;

    console.log("adding buttion");
    var myOldUrl = window.location.href;
console.log(myOldUrl);
console.log("urkl^");
    let newForm = new FormData(form);
  
  // B5. TODO - Create an empty object (I'll refer to this object as entryObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into entryObject
    let entryObject = new Object();
    entryObject.tags = [];
    let tagCount = 0;
    for(let [name, value] of newForm) {
      for (let i = 0; i < TAGS.length; i++) {
        if (name == TAGS[i]) {
          entryObject.tags[tagCount] = ' ' + TAGS[i];
          tagCount++;
          continue;
        }
      }
      entryObject[name] = value;
    }
    console.log(entryObject.tags);
    
  // B6. TODO - Create a new <restaurant-entry> element
    let restaurantEntry = document.createElement('restaurant-entry');

  // B7. TODO - Add the entryObject data to <restaurant-entry> using element.data
    restaurantEntry.data = entryObject;

  // B8. TODO - Append this new <restaurant-entry> to <main>
    document.querySelector('#list').appendChild(restaurantEntry);
    const nextURL = 'http://127.0.0.1:5501/source/offline/index.html';
    const nextTitle = 'My new page title';
    const nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.pushState(nextState, nextTitle, nextURL);
    window.history.replaceState(nextState, nextTitle, nextURL);
  // B9. TODO - Get the entries array from localStorage, add this new entry to it, and
  //            then save the entries array back to localStorage
    let allEntries = JSON.parse(window.localStorage.getItem('entries'));
    if (allEntries != null && allEntries.length > 0) {
      let exists = false;
      for (let i = 0; i < allEntries.length; i++) {
        if (allEntries[i].name == entryObject.name) {
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
  });

  // B10. TODO - Get a reference to the "Clear Local Storage" button
  let clearLocalStorage = document.querySelector('button[type="deleteAll"]');

  // B11. TODO - Add a click event listener to clear local storage button
  clearLocalStorage.addEventListener('click', function() {
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
    window.localStorage.clear();

  // B13. TODO - Delete the contents of <main>
    document.querySelector('#list').innerHTML = '';
  });
}

function deletePostHandler(e) {
  let entries = getEntriesFromStorage();
  if (entries == null || entries.length == 0) return;
  let buttons = [];
  for (let i = 0; i < entries.length; i++) {
    buttons[i] = document.querySelector('#' + entries[i].name).shadowRoot.querySelector('button[type="delete"]');
  }

  for (let i = 0; i < entries.length; i++) {
    buttons[i].addEventListener('click', function() {
      removeEntryFromLocalStorage(i);
      document.querySelector('#' + entries[i].name).remove();
    });
  }
}

function editPostHandler() {
  let entries = getEntriesFromStorage();
  if (entries == null || entries.length == 0) return;
  let buttons = [];
  for (let i = 0; i < entries.length; i++) {
    buttons[i] = document.querySelector('#' + entries[i].name).shadowRoot.querySelector('button[type="edit"]');
  }

  for (let i = 0; i < entries.length; i++) {
    buttons[i].addEventListener('click', function() {
      let entry = removeEntryFromLocalStorage(i);
      document.querySelector('#' + entries[i].name).remove();
      initFormHandler(entry);
    });
  }
}