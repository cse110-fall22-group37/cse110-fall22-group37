// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  initFormHandler();
}

function exportToPDF() {
  let content = document.getElementById('content');
  let settings = {
    margin: 0.5,
    filename: 'mylist.pdf',
    image: {type: 'jpeg', quality: 1},
    html2canvas: {scale: 1},
    jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait', precision: '12'}
  };
  html2pdf().set(settings).from(content).save();
}

function initFormHandler() {
  let button = document.createElement('export-button');
  document.body.appendChild(button);
  console.log(button);
  button.addEventListener('click', (event) =>{
    exportToPDF();
  });
}
