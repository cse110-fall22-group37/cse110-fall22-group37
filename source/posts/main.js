// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  let recipe = localStorage.getItem('recipes');
  let parse = JSON.parse(recipe);
  const myarray = new Array();
  for(let i = 0; i < parse.length; i++){
    myarray.push(parse[i]);
  }
  return myarray;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {

    let main = document.querySelector('main');
    for(let i = 0; i < recipes.length; i++){
      let card= document.createElement('recipe-card');
      card.data = recipes[i];
      main.appendChild(card);
    }

}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  let recipeStr = JSON.stringify(recipes);
  localStorage.setItem(recipeStr);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  let form = document.getElementById('new-recipe');

  document.getElementsByTagName('button')[0].addEventListener('click', (event) =>{
    let newForm = new FormData(form);
    let recipeObject = new Object();
    for(let [name, value] of newForm) {
      recipeObject[name] = value;
    }
    console.log(newForm.get('imgSrc'));
   
    let card= document.createElement('recipe-card');

    card.data = recipeObject;
  
    let main = document.querySelector('main');
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    main.appendChild(card);
    recipes.push(card);


    localStorage.setItem('recipes', JSON.stringify(recipes));

  
  });

  let clear = document.getElementsByClassName('danger');
  clear[0].addEventListener('click', (event) =>{
    localStorage.clear();
    let main = document.querySelector('main');
    main.innerHTML = "";
  });

}
