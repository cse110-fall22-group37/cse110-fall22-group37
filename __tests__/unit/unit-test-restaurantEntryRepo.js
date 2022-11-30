// unit.test.js

const functions = require('../../source/restaurantEntry/restaurantEntryRepo.js');

// TODO - Part 2
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

test('testing getEntriesFromStorage typical',()=>{
    let entries = new Array();
    entries.push('Mcdonalds');
    entries.push('Burger king');
    global.localStorage.setItem('entries', JSON.stringify(entries));
    let func = functions.getEntriesFromStorage();
    expect(JSON.stringify(func)).toBe(JSON.stringify(entries));
});

test('testing getEntriesFromStorage empty array',()=>{
    let entries = new Array();
    global.localStorage.setItem('entries', JSON.stringify(entries));
    let func = functions.getEntriesFromStorage();
    expect(JSON.stringify(func)).toBe(JSON.stringify(entries));
});

test('testing saveEntriesToStorage typical',()=>{
    let entries = new Array();
    entries.push('Mcdonalds');
    entries.push('Burger king');
    functions.saveEntriesToStorage(entries);
    let entriesFromStore = global.localStorage.getItem('entries');

    expect(entriesFromStore).toBe(JSON.stringify(entries));
});

test('testing saveEntriesToStorage empty array',()=>{
    let entries = new Array();
    functions.saveEntriesToStorage(entries);
    let entriesFromStore = global.localStorage.getItem('entries');

    expect(entriesFromStore).toBe(JSON.stringify(entries));
});

test('testing removeEntryFromLocalStorage last element',()=>{
    let entries = new Array();
    entries.push('Mcdonalds');
    entries.push('Burger king');
    global.localStorage.setItem('entries', JSON.stringify(entries));

    functions.removeEntryFromLocalStorage('1');
    let entriesFromStore = global.localStorage.getItem('entries');
    entries.pop();

    expect(entriesFromStore).toBe(JSON.stringify(entries));
});

test('testing removeEntryFromLocalStorage middle element',()=>{
    let entries = new Array();
    entries.push('Mcdonalds');
    entries.push('Burger king');
    entries.push('Carls Junior');

    global.localStorage.setItem('entries', JSON.stringify(entries));

    let removed = functions.removeEntryFromLocalStorage('1');
    let entriesFromStore = global.localStorage.getItem('entries');
    let entriesRem = new Array();
    entriesRem.push('Mcdonalds');
    entriesRem.push('Carls Junior');  
    expect(removed).toBe("Burger king"); 
    expect(entriesFromStore).toBe(JSON.stringify(entriesRem));
});

test('testing removeEntryFromLocalStorage first element',()=>{
    let entries = new Array();
    entries.push('Mcdonalds');
    entries.push('Burger king');
    entries.push('Carls Junior');

    global.localStorage.setItem('entries', JSON.stringify(entries));

    let removed = functions.removeEntryFromLocalStorage('0');
    let entriesFromStore = global.localStorage.getItem('entries');
    let entriesRem = new Array();
    entriesRem.push('Burger king');
    entriesRem.push('Carls Junior'); 

    expect(removed).toBe("Mcdonalds"); 
    expect(entriesFromStore).toBe(JSON.stringify(entriesRem));
});

test('testing removeEntryFromLocalStorage nothing in array',()=>{
    let entries = new Array();

    global.localStorage.setItem('entries', JSON.stringify(entries));

    let removed = functions.removeEntryFromLocalStorage('0');
    let entriesFromStore = global.localStorage.getItem('entries');
    let entriesRem = new Array();
     
    expect(removed).toBeUndefined; 
    expect(entriesFromStore).toBe(JSON.stringify(entriesRem));
});

test('testing removeEntryFromLocalStorage one item in array',()=>{
    let entries = new Array();
    entries.push("Mcdonalds");

    global.localStorage.setItem('entries', JSON.stringify(entries));

    let removed = functions.removeEntryFromLocalStorage('0');
    let entriesFromStore = global.localStorage.getItem('entries');
    let entriesRem = new Array();
     
    expect(removed).toBe("Mcdonalds");
    expect(entriesFromStore).toBe(JSON.stringify(entriesRem));
});