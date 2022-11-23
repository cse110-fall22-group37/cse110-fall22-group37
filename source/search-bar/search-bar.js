/**
 * The init() function is run after the webpage is finished
 * loading
 */
window.addEventListener('DOMContentLoaded', init);

/**
 * Creates a list of the restaurants from local storage
 */
function getRestaurantsFromStorage() {
  return JSON.parse(localStorage.getItem('restaurants'));
}

/**
 * When the webpage loads, the restaurants from storage
 * are added to the list
 */
function init() {
  let restaurants = getRestaurantsFromStorage();
  let resList = document.getElementById('resList');

  addRestaurantsToList(restaurants);
}

/**
 * Takes in an array of restaurants and for each adds it
 * to the existing list
 * @param {Array<Object>} recipes An array of restaurants
 */
function addRestaurantsToList(restaurants) {
  for (let i = 0; i < restaurants.length; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "#";
    a.innerText = restaurants[i].titleTxt;
    li.appendChild(a);
    resList.appendChild(li);
  }
}

/**
 * When user types in search field, non-matching results 
 * are hidden
 */
function search() {
   // Declare variables
  var input, filter, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();

  let ul = document.getElementById("resList");
  let li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}