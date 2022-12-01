const { TestEnvironment } = require('jest-environment-jsdom');
const functions = require('../../source/list/list.js');

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
  global.localStorage = new LocalStorageMock;



  test('test restaurant-entry is created',()=>{
    document.body.innerHTML=`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Restaurant Entry</title>
    
      <!-- Export Button Custom Element -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script> 
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
      <script src="exportBtn/exportBtn.js" type="module"></script>
      <script src="exportBtn/main.js" type="module"></script>
      <link rel="stylesheet" href="exportBtn/main.css" />
    
      <script src="list/list.js" type="module"></script>
    
      <script src="sortAndFilter/filter.js" type="module"></script>
      <script src="sortAndFilter/sort.js" type="module"></script>
    
      <!-- Restaurant Entry Custom Element -->
      <script src="restaurantEntry/restaurantEntry.js" type="module"></script>
      
      <!-- Main Stylesheets & Scripts -->
      <link rel="stylesheet" href="restaurantEntry/main.css" />
      <link rel="stylesheet" href="list/main.css" />
      <link rel="stylesheet" href="sortAndFilter/main.css" />
      <link rel="stylesheet" href="main.css" />
    
      <script src="restaurantEntry/restaurantEntryRepo.js" type="module"></script>
      <script src="restaurantEntry/main.js" type="module"></script>
    </head>
    <body>
        <main>
          <img src= "center_logo.svg" alt="Where2Eat"/>
      
      <div class='row'>
        <div class='column' id='left'>
          <div class='left-column'>
    
            <iframe id="searchBar" src="./search-bar/search-bar.html"></iframe>
      
            <div id="list">
              <!-- Add Restaurant Entries Here -->
            </div>
            
            </div>
        </div>
        <div class='column' id='right'>
          <div class='right-column'>
            <div id="filter"></div>
            <div id="sort-by"></div>
    
      <form id="restaurant-entry" class="form-style"></form>
          </div>
        </div>
        </div>
        <div id="output"></div>
      </main>
    
      <div class="footer">Questions? where2eatsupport@gmail.com</div>
    
    </body>
    </html>`
    let entries = new Array();
    entries.push('Mcdonalds');
    entries.push('Burger king');
    global.localStorage.setItem('entries', JSON.stringify(entries));
    functions.addEntriesToDocument(entries);
    expect(document.querySelector('restaurant-entry')).not.toBeNull();
  })