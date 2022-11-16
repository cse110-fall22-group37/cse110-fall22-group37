// main.js
import {getEntriesFromStorage, saveEntriesToStorage, removeEntryFromLocalStorage} from "./restaurantEntryRepo.js";
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
async function init() {
  // Get the entries from localStorage
  let entries = getEntriesFromStorage();
  // Add each entry to the <main> element
  // Add the event listeners to the form elements
  
  initFormHandler(null);


  initializeServiceWorker();
  // Get the recipes from localStorage
  let recipes;
  try {
    recipes = await getRecipes();
  } catch (err) {
    console.error(err);
  }
  addEntriesToDocument(entries);
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
  console.log(main);
  
  if (entries != null) {
    for (let i = 0; i < entries.length; i++) {
      let restaurantEntry = document.createElement('restaurant-entry');
      restaurantEntry.id = entries[i].name;
      restaurantEntry.data = entries[i];
      main.appendChild(restaurantEntry);
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
    <br>
    <legend>Price</legend>
    <label for="price-0">
      0<input type="radio" id="price-0" value="0" name="price">
    </label>
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
    <label for="tag">
      Tags:
      <input type="text" id="tags" name="tags" value="${entry.tags}" required>
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
    if (entry.rating != "" && entry.price != "") {
      document.getElementById('rating-'+entry.rating).checked = true;
      document.getElementById('price-'+entry.price).checked = true;
    }
  
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


function initializeServiceWorker() {
  if("serviceWorker" in navigator){
    //b2
    window.addEventListener('load', async (event)  =>{
      console.log("hi");
      try{
      const registration = await navigator.serviceWorker.register("./sw.js");

      if(registration.active){
        console.log("Registration Success");
      }
      }catch(error){
        console.log("Registration failed with ${error}" );
      }
    }   );
  }
};

async function getRecipes() {
  const myarray = new Array();

  if(localStorage.getItem('entries') ){
  let entries = localStorage.getItem('entries');
  let parse = JSON.parse(entries);
  for(let i = 0; i < parse.length; i++){
    myarray.push(parse[i]);
  }
  }

  let myRecipeArr = new Array();
let myPromise = new Promise( async (resolve, reject) =>{
  
for( let entry of myarray){
  try{
   const result =  await fetch(entry);
    const recipe = await result.json();
    myRecipeArr.push(recipe);
    if(myRecipeArr.length == myarray.length){
      saveRecipesToStorage(myRecipeArr);
    }
  }catch(error){
    console.error(error);
    reject(error);
  }
}
});
return myPromise;
}