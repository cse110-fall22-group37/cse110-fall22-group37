// main.js
import {getEntriesFromStorage, saveEntriesToStorage, removeEntryFromLocalStorage} from "./restaurantEntryRepo.js";

//current preset tags which entries can be given
const TAGS = ["vegan", "western", "chinese", "japanese", "kids", "other"];

//run the init function once the page has loaded
window.addEventListener('DOMContentLoaded', init);

/**
 * Starts the program, all function calls trace back to init()
 * Gets the entries from storage, adds them to document, run the form handler, 
 * run the delete handler, run the edit post handler
 */
function init() {
  // Get the entries from localStorage
  let entries = getEntriesFromStorage();
  // Add each entry to the <main> element
  // Add the event listeners to the form elements
  initFormHandler(null);
  deletePostHandler();
  editPostHandler();
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 * @param entry, an entry to the form
 */
function initFormHandler(entry) {
  let form = document.getElementById('restaurant-entry');
  //handle an empty entry to the work
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

    form.innerHTML = `
    <label for="restaurant-name"> Name:
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
      Describe your experience (favorite dishes, wait times, etc):
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
    <label for="img">Add an image:</label>
      <input type="file" id="img" name="img" accept="image/*">
    <br>
  <br>
<button type="add">Save Restaurant</button>
<button type="deleteAll" class="danger">Delete all restaurants</button>`;
  } else {
    form.innerHTML = `
    <label for="restaurant-name"> Name:
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
      Describe your experience (favorite dishes, wait times, etc):
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
    <label for="img">Add an image (if left blank, previous image will be saved):</label>
    <input type="file" id="img" name="img" accept="image/*">
    <br>
  <br>
<button type="add">Save Restaurant</button>
<button type="deleteAll" class="danger">Delete all restaurants</button>`;
  }

  //check the rating and price of the entry if not empty mark as checked
    if (entry.rating != "" && entry.price != "") {
      document.getElementById('rating-'+entry.rating).checked = true;
      document.getElementById('price-'+entry.price).checked = true;
    }
  //check the tags of the entry if not empty check selected tags
    if (entry.tags != "") {
      for (let i = 0; i < entry.tags.length; i++) {
        let id = entry.tags[i].split(' ').join('');
        document.getElementById(id).checked = true;
      }
    }
  
  // Add an event listener for the 'click' event, which fires when the 
  // add button is clicked
  document.querySelector('button[type="add"]').addEventListener('click', function() {
    //if the form is not valid return
    if (!form.checkValidity()) return;

    //create a new form for the data
    let newForm = new FormData(form);
  
    //create a new object to extract the tags from
    let entryObject = new Object();
    entryObject.tags = [];
    let tagCount = 0;
    for(let [name, value] of newForm) {
      for (let i = 0; i < TAGS.length; i++) {
        if (name == TAGS[i]) {
          entryObject.tags[tagCount] = ' ' + TAGS[i];
          tagCount++;
          break;
        }
      }
      entryObject[name] = value;
    }
    // Read image from file input
    const imgPath = document.querySelector('input[type=file]').files[0];
    if (imgPath != null) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
          entryObject['img'] = reader.result;
          processFormData(entryObject);
      });
      if (imgPath) {
          reader.readAsDataURL(imgPath);
      }
    } else {
        if (entry.img != null) {
          // if user did not update the image when editing form, keep old image
          entryObject['img'] = entry.img;
        } else {
          entryObject['img'] = '';
        }
      processFormData(entryObject);
    }
  });

  // Get a reference to the "Clear Local Storage" button
  let clearLocalStorage = document.querySelector('button[type="deleteAll"]');

  // Add a click event listener to clear local storage button
  clearLocalStorage.addEventListener('click', function() {
  //Clear the local storage
    window.localStorage.clear();
   //Delete the contents of <main>
    document.querySelector('#list').innerHTML = '';
  });
}

/**
 * Adds the new/updated restaurant entry to the entry list 
 * and store it to localStorage
 * @param entryObject, data of the entry to be processed
 */
function processFormData(entryObject) {
  // Create a new <restaurant-entry> element
  let restaurantEntry = document.createElement('restaurant-entry');

  // Add the entryObject data to <restaurant-entry> using element.data
    restaurantEntry.data = entryObject;

  //  Add this new <restaurant-entry> to <main>
    document.querySelector('#list').appendChild(restaurantEntry);

  // Get the entries array from localStorage, add this new entry to it, and
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
    saveEntriesToStorage(allEntries);
}

/**
 * Gets the button of every element, when one delete button is clicked, find the element 
 * whose delete button was clicked, then delete that element
 */
export function deletePostHandler() {
  let entries = getEntriesFromStorage();
  if (entries == null || entries.length == 0) return;
  let buttons = [];
  for (let i = 0; i < entries.length; i++) {
    buttons[i] = document.querySelector('#' + entries[i].name.replace(/[^a-zA-Z0-9]/g, ''));
      // if (buttons[i] != null)
      buttons[i] = buttons[i].shadowRoot.querySelector('button[type="delete"]');
  }

  for (let i = 0; i < entries.length; i++) {
    // if (buttons[i] != null)
      buttons[i].addEventListener('click', function() {
        removeEntryFromLocalStorage(i);
        document.querySelector('#' + entries[i].name.replace(/[^a-zA-Z0-9]/g, '')).remove();
      });
  }
}

/**
 * Gets the button of every element, when one edit button is clicked, bring the entry to the form, 
 * remove the entry, add it to the form, call init form handler
 */
export function editPostHandler() {
  let entries = getEntriesFromStorage();
  if (entries == null || entries.length == 0) return;
  let buttons = [];
  for (let i = 0; i < entries.length; i++) {
    buttons[i] = document.querySelector('#' + entries[i].name.replace(/[^a-zA-Z0-9]/g, ''));
    // if (buttons[i] != null)
      buttons[i] = buttons[i].shadowRoot.querySelector('button[type="edit"]');
  }

  for (let i = 0; i < entries.length; i++) {
    // if (buttons[i] != null)
      buttons[i].addEventListener('click', function() {
        let entry = removeEntryFromLocalStorage(i);
        document.querySelector('#' + entries[i].name.replace(/[^a-zA-Z0-9]/g, '')).remove();
        initFormHandler(entry);
      });
  }
}