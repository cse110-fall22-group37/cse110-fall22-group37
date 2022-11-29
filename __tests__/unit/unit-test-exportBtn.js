/**
 * @jest-environment jsdom
 */

const { ConsoleMessage } = require('puppeteer');
const functions = require('../../source/exportBtn/exportBtn.js');

/**
* This test tests for if the initExportBtnHandler creates the export button and sets the html for the document
*/
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
    functions.initExportBtnHandler();
    expect(document.querySelector('export-button')).not.toBeNull();    
  });

  /**
   * This test tests for if the exportToPDF changes the style of the right side correctly
   */
  test('test exportToPDF changes right side style', () => {
    functions.exportToPDF();
    expect(document.getElementById('right').style.display).toBe("none");
    setTimeout(() => {
        expect(document.getElementById('right').style.display).toBe("block");
      }, 0.0000000001);
  });

  /**
   * This test tests for if the ExportToPDF() function calls window.print()
   */
  jest.spyOn(window, 'alert').mockReturnValue();
  jest.spyOn(window, 'print').mockReturnValue();
    describe("", () => {
    it('test that print is called', function () {
    functions.exportToPDF();
    expect(window.print).toHaveBeenCalled();
    });
 });
