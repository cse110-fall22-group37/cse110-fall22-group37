// RestaurantEntry.js
const TAGS = ["vegan", "western", "chinese", "japanese", "kids", "other"];

/**
 * Class restuarantEntry creates the restaurant entry objects and attaches the shadowDOM
 * @extends HTMLElement
 */
class RestaurantEntry extends HTMLElement {
    /**
     * @constructor Creates the restaurant entry element, attaches the shadowDOM
     * Called once when document.createElement('restaurant-entry') is called or
     * the element is written into the DOM directly as <restaurant-entry>
     */
    constructor() {
      super(); // Inheirit everything from HTMLElement
      //Attach the shadow DOM to this Web Component (leave the mode open)
      this.shadowRC = this.attachShadow({mode: 'open'});

     //Create an <article> element to hold our data
      this.elementArticle = document.createElement('article');
  
      //Create a style element to style our restaurant entry
      this.elementStyle = document.createElement('style');
  
      //Insert all of the styles into the <style> element you just made
      this.elementStyle.textContent = 
      `* {
        font-family: sans-serif;
        margin: auto;
        padding: 0;
      }

      a {
        display: -webkit-box;
        font-size: 36px;
        height: 50px;
        position:relative; 
        left:-190px; 
        top:-60px;
        line-height: 0;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
                                  
      article {
        margin-top: 10px;
        margin-bottom: 18px;
        box-sizing: border-box;
        border-radius: 100px;
        display: grid;
        row-gap: 10px;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        padding: 16px 16px 16px 16px;
        width: 650px;
        outline: solid;
        outline-width: 4px; 
        background: #ffff
      }

      button:first-of-type {
        position:relative; 
        left:208px; 
        top:1px;
        width:85px;
        height:25px;
      }
      
      button:last-of-type {
        position:relative; 
        left:110px; 
        top:-34px;
        width:85px;
        height:25px;
      }
                                  
      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
        position:relative; 
        left:-190px; 
        top:-50px;
      }
                                  
      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }

      .price {
        align-items: center;
        column-gap: 5px;
        display: flex;
        position:relative; 
        left:-190px; 
        top:-100px;
      }

      .price>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }
      
      article>img {
        border-top-left-radius: 80px;
        border-top-right-radius: 80px;
        border-bottom-left-radius: 80px;
        border-bottom-right-radius: 80px;
        height: 150px;
        object-fit: cover;
        margin-right: 10px;
        width: 340px;
        height: 200px
      }
                                  
      p.description {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
        position:relative; 
        left:-260px; 
        top:-80px;
      }

      p.tags {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
        position:relative; 
        left:-240px; 
        top:60px;
      }
                                  
      p:not(.title),
      span,
      time {
        color: black;
        font-size: 12px;
      }`;
  
      //Append the <style> and <article> elements to the Shadow DOM
      this.shadowRC.appendChild(this.elementStyle);
      this.shadowRC.appendChild(this.elementArticle);
    }
  
    /**
     * Called when the .data property is set on this element.
     *
     * For Example:
     * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
     * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <recipe-card>, must be of the
     *                        following format:
     *                        {
     *                          "img": "image upload",
     *                          "imgAlt": "string",
     *                          "name": "string",
     *                          "rating": number,
     *                          "price": number,
     *                          "tags": "strings",
     *                          "description": "string"
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;
  
      // Select the <article> we added to the Shadow DOM in the constructor
      let elementArticle = this.elementArticle;
  
      /**
       * Set the contents of the <article> with the data given 
       */
      let $ = '';
      for (let i = 0; i < data.price; i++) {
        $ += '$';
      }

      elementArticle.innerHTML = `<img src= "${data.img}"
                            alt="${data.imgAlt}">
                          <p class="name">
                            <a href="${data.name}">${data.name}</a>
                          </p>
                          <div class="rating">
                            <span>Rating: </span>
                            <img src="https://eustaciasukarto.github.io/fa22-cse110-lab6/assets/images/icons/${data.rating}-star.svg" alt="${data.rating} stars">
                          </div>
                          <p class="price">Price: ${$}</p>
                          <p class="tags">Tags: ${data.tags}</p>
                          <p class="description">
                            Description:
                            <br>
                            ${data.description}
                          </p>
                          <button type="edit">Edit</button>
                          <button type="delete">Delete</button>`;
    }
  }
  
  // Define the Class as a customElement so that you can create
  //           'restaurant-entry' elements
  customElements.define('restaurant-entry', RestaurantEntry);