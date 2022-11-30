// exportBtn.js


//import {getEntriesFromStorage} from "../restaurantEntry/restaurantEntryRepo.js";
module.exports = { init, exportToPDF, initExportBtnHandler};


 //Run the init() function when the page has loaded so the DOM content has loaded
window.addEventListener('DOMContentLoaded', init);

/**
 * Starts the program, all function calls trace back to init()
 * Calls the initExportBtnHandler function
 */
function init() {
  initExportBtnHandler();
}

/**
 * Exports the current list of elements in the order shown on screen
 * Invokes a window to save as pdf, to save the current list
 */
function exportToPDF() {
// TODO: fix css
/////////////////////////////////////////////////////////////////////////   
/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////// 
  let css = '@page { size: 790px 940px; margin: 10px;}';
  let head = document.head || document.getElementsByTagName('head')[0];
  let style = document.createElement('style');

  style.type = 'text/css';
  style.media = 'print';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  document.getElementById('right').style.display = "none";

  window.print();
  setTimeout(() => {
    document.getElementById('right').style.display = "block";
  }, 0.0000000001)
}

/**
 * Add an event listener to the export button so when it is clicked, 
 * it calls exportToPDF();
 */
function initExportBtnHandler() {
  let button = document.createElement('export-button');
  document.body.appendChild(button);
  button.addEventListener('click', (event) =>{
    exportToPDF();
  });
}