// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the entrys from localStorage
  let entrys = getentrysFromStorage();
  // Add each entry to the <main> element
  addentrysToDocument(entrys);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'entrys' from localStorage and returns an array of
 * all of the entrys found (parsed, not in string form). If
 * nothing is found in localStorage for 'entrys', an empty array
 * is returned.
 * @returns {Array<Object>} An array of entrys found in localStorage
 */
function getentrysFromStorage() {
  let entry = localStorage.getItem('entrys');
  let parse = JSON.parse(entry);
  const myarray = new Array();
  for(let i = 0; i < parse.length; i++){
    myarray.push(parse[i]);
  }
  return myarray;
}

/**
 * Takes in an array of entrys and for each entry creates a
 * new <entry-card> element, adds the entry data to that card
 * using element.data = {...}, and then appends that new entry
 * to <main>
 * @param {Array<Object>} entrys An array of entrys
 */
function addentrysToDocument(entrys) {

    let main = document.querySelector('main');
    for(let i = 0; i < entrys.length; i++){
      let card= document.createElement('entry-card');
      card.data = entrys[i];
      main.appendChild(card);
    }

}

/**
 * Takes in an array of entrys, converts it to a string, and then
 * saves that string to 'entrys' in localStorage
 * @param {Array<Object>} entrys An array of entrys
 */
function saveentrysToStorage(entrys) {
  let entryStr = JSON.stringify(entrys);
  localStorage.setItem(entryStr);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  let form = document.getElementById('new-entry');

  document.getElementsByTagName('button')[0].addEventListener('click', (event) =>{
    let newForm = new FormData(form);
    let entryObject = new Object();
    for(let [name, value] of newForm) {
      entryObject[name] = value;
    }
    console.log(newForm.get('imgSrc'));
   
    let card= document.createElement('entry-card');

    card.data = entryObject;
  
    let main = document.querySelector('main');
    let entrys = JSON.parse(localStorage.getItem('entrys'));
    main.appendChild(card);
    entrys.push(card);


    localStorage.setItem('entrys', JSON.stringify(entrys));

  
  });

  let clear = document.getElementsByClassName('danger');
  clear[0].addEventListener('click', (event) =>{
    localStorage.clear();
    let main = document.querySelector('main');
    main.innerHTML = "";
  });

}
