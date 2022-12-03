/**
 * When user types in search field, non-matching results 
 * are hidden
 */
function search() {
  // Declare variables
  var input, filter, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();

  // Selects list of restaurant entries
  let ul = document.getElementById("list");
  let li = ul.getElementsByTagName('restaurant-entry');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {

    // Selects the name of the restaurant entry
    let root =  li[i].shadowRoot;
    let article = root.querySelector('article');
    let name = article.querySelector('.name');
    txtValue = name.innerText;

    // If the text value in the search bar does not match a restaurant entry, it is hidden
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
      li[i].className = 'hide';
    }
  }
}