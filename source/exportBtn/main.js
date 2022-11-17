// main.js
import {getEntriesFromStorage} from "../restaurantEntry/restaurantEntryRepo.js";
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  initExportBtnHandler();
}

function exportToPDF() {
  let output = document.querySelector('#output');
  output.innerHTML = '<h1> MY LIST </h1>';
  let allEntries = getEntriesFromStorage();
  let entries = document.querySelectorAll('restaurant-entry');
  let entryCount = 0;
  for (let i = 0; i < allEntries.length; i++) {
    let data = allEntries[i];
    if (allEntries[i].name == entries[entryCount].shadowRoot.querySelector('article > .name > a').innerHTML) {
      output.innerHTML += `
        <h2 class="name" style="margin: 50px; height: 0.7px">${data.name}</h2>
        <p class="rating" style="margin: 50px; height: 0.7px">
        Rating: ${data.rating}<br>
        Price: ${data.price}<br>
        Tags:${data.tags}<br>
        Description:<br>${data.description}</p><br><br>`;
      entryCount++;
    }
  }
  
  let settings = {
    margin: 0,
    padding: 0.5,
    filename: 'mylist.pdf',
    image: {type: 'jpeg', quality: 1},
    html2canvas: {scale: 1},
    jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait', precision: '12'}
  };
  html2pdf().set(settings).from(output).save();
  setTimeout(() => {
    output.innerHTML = '';
  }, 0.0000000001)
}

function initExportBtnHandler() {
  let button = document.createElement('export-button');
  document.body.appendChild(button);
  button.addEventListener('click', (event) =>{
    exportToPDF();
  });
}
