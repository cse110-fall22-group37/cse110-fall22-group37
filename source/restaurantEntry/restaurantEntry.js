// RestaurantEntry.js
const TAGS = ["vegan", "western", "chinese", "japanese", "kids", "dessert"];

class RestaurantEntry extends HTMLElement {
    // Called once when document.createElement('restaurant-entry') is called, or
    // the element is written into the DOM directly as <recipe-card>
    constructor() {
      super(); // Inheret everything from HTMLElement
  
      // EXPOSE - START (All expose numbers start with A)
      // A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
      this.shadowRC = this.attachShadow({mode: 'open'});
  
      // A2. TODO - Create an <article> element - This will hold our markup once our data is set
      this.elementArticle = document.createElement('article');
  
      // A3. TODO - Create a style element - This will hold all of the styles for the Web Component
      this.elementStyle = document.createElement('style');
  
      // A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made
      this.elementStyle.textContent = 
      `* {
        font-family: sans-serif;
        margin: auto;
        padding: 0;
      }

      a {
        display: -webkit-box;
        font-size: 50px;
        height: 70px;
        width: 300px;
        position:relative; 
        left:-130px; 
        top:-90px;
        overflow: auto;
        word-wrap: break-word;
        overflow-wrap: break-word;
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
        top:-45px;
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
        height: 100px;
        width:500px;
        line-height: 26px;
        padding-top: 4px;
        position:relative; 
        left:-30px; 
        top:-80px;
        overflow: auto;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      p.tags {
        display: -webkit-box;
        font-size: 50px;
        height: 50px;
        width: 300px;
        position:relative; 
        left:-100px; 
        top:75px;
        overflow: auto;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }
                                  
      p:not(.title),
      span,
      time {
        color: black;
        font-size: 18px;
      }`;
  
      // A5. TODO - Append the <style> and <article> elements to the Shadow DOM
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
     *                          "imgSrc": "string",
     *                          "imgAlt": "string",
     *                          "titleLnk": "string",
     *                          "titleTxt": "string",
     *                          "organization": "string",
     *                          "rating": number,
     *                          "numRatings": number,
     *                          "lengthTime": "string",
     *                          "ingredients": "string"
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;
  
      // A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
      let elementArticle = this.elementArticle;
  
      // A7. TODO - Set the contents of the <article> with the <article> template given in
      //           cardTemplate.html and the data passed in (You should only have one <article>,
      //           do not nest an <article> inside another <article>). You should use Template
      //           literals (tempalte strings) and element.innerHTML for this.
      // console.log(data)
      let $ = '';
      for (let i = 0; i < data.price; i++) {
        $ += '$';
      }

      elementArticle.innerHTML = `<img src= "${data.img}"
                            alt="${data.imgAlt}">
                          <p class="name">
                            <a>${data.name}</a>
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
  
  // A8. TODO - Define the Class as a customElement so that you can create
  //           'restaurant-entry' elements
  customElements.define('restaurant-entry', RestaurantEntry);