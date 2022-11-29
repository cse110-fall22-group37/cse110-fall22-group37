/**
 * @jest-environment jsdom
 */

const { ConsoleMessage } = require('puppeteer');
const functions = require('../../source/exportBtn/exportBtn.js');
//import {initExportButtonHandler} from "./source/exportBtn.js";

 // This prints "My First JSDOM!"

//jest.mock('../../source/exportBtn/exportBtn.js');

test('test initExportBtnHandler ', () => {
    document.body.innerHTML =
    ` <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Restaurant Entry</title>
  
    <!-- Export Button Custom Element -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
    <script src="exportBtn.js" type="module"></script>
    <script src="main.js" type="module"></script>
    <link rel="stylesheet" href="main.css" />
  
    <!-- Restaurant Entry Custom Element -->
    <script src="../restaurantEntry/restaurantEntry.js" type="module"></script>
    
    <!-- Main Stylesheets & Scripts -->
    <link rel="stylesheet" href="../restaurantEntry/main.css" />
    <script src="../restaurantEntry/restaurantEntryRepo.js" type="module"></script>
    <script src="../restaurantEntry/main.js" type="module"></script>
  </head>
  <body>
      <main>
    
    <div class='row'>
      <div class='column' id='left'>
        <div class='left-column'>
  
          <!-- <iframe id="searchBar" src="./search-bar/search-bar.html"></iframe> -->
    
          <div id="list">
            <!-- Add Restaurant Entries Here -->
          </div>
          
          </div>
      </div>
      <div class='column'>
        <div class='right-column' id="right">
  
    <form id="restaurant-entry" class="form-style"></form>
        </div>
      </div>
      </div>
      <div id="output"></div>
    </main>
  </body>
  </html>
  `    
  console.log(document.querySelector('body').innerHTML);


    functions.initExportBtnHandler();
    console.log(document.querySelector('export-button'));
    expect(document.querySelector('export-button')).not.toBeNull();    
    //const element = document.createElement('div');
    //expect(element).not.toBeNull();
    //console.log(document.querySelector('body').innerHTML);
  });

  test('test exportToPDF ', () => {
    console.log("Test2");
    console.log(document.querySelector('body').innerHTML);
    functions.exportToPDF();

    expect(document.getElementById('right').style.display).toBe("none");
    console.log(document.getElementById('right').style.display);
    setTimeout(() => {
        console.log(document.getElementById('right').style.display);

        expect(document.getElementById('right').style.display).toBe("block");
      }, 0.0000000001);
    

    console.log("test 2 end");

  });

  jest.spyOn(window, 'alert').mockReturnValue();
  jest.spyOn(window, 'print').mockReturnValue();
    describe("test that print is called", () => {
    it('test that print is called', function () {
    functions.exportToPDF();
    expect(window.print).toHaveBeenCalled();
    });
    });



  


/*
test('initExportButtonHandler',()=>{
    functions.initExportBtnHandler();
    expect(true).toBe(false);
});
*/ 
/*
let head = document.head || document.getElementsByTagName('head')[0];
let style = document.createElement('style');


test('exportToPDF()',()=>{
    exportToPDF();
    
    
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
});*/