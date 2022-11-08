// RecipeCard.js

class RecipeCard extends HTMLElement {
    // Called once when document.createElement('recipe-card') is called, or
    // the element is written into the DOM directly as <recipe-card>
    constructor() {
      super(); // Inheret everything from HTMLElement
  
      // Attach the shadow DOM to this Web Component
      let shadow1 = this.attachShadow({mode:'open'});
      // Create an <article> element 
      let article1 = document.createElement('article');
      // Create a style element - This will hold all of the styles for the Web Component
      let style1 = document.createElement('style');
      // Insert all of the styles
      style1.textContent = ` * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
    
      a {
        text-decoration: none;
      }
    
      a:hover {
        text-decoration: underline;
      }
    
      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }
    
      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }
    
      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }
    
      article>img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }
    
      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }
    
      p.organization {
        color: black !important;
      }
    
      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    
      p:not(.title),
      span,
      time {
        color: #70757A;
        font-size: 12px;
      }
   `
  
      // Append the <style> and <article> elements to the Shadow DOM
      shadow1.appendChild(style1);
      shadow1.appendChild(article1);
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
     *                          "description": "string",
     *                          "rating": number,
     *                          "cost": number,
     *                          "tags": "string",
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;
  
      // Select the <article> we added to the Shadow DOM in the constructor
      let myarticle = this.shadowRoot.querySelector('article');
      // Set the contents of the <article> 
      myarticle.innerHTML =`
    <img src=""
      alt="Recipe Title">
    <p class="title">
      <a href="https://link-to-article.com">Title</a>
    </p>
    <p class="description">The Chef's Organization</p>
    <div class="rating">
      <span>5</span>
      <img src="/assets/images/icons/5-star.svg" alt="5 stars">
    </div>
    <div class = "cost">
      <span>3</span>
      <img src="/assets/images/icons/5-star.svg" alt="5 stars">
    </div>
    <div class = "tags">
    <span>3</span>
    <span value="1" id="tag-1" name="tag-1" class="tag-1">American</span>
    <span value="2" id="tag-2" name="tag-2" class="tag-2">Chinese</span>
    <span value="3" id="tag-3" name="tag-3" class="tag-3">Fast Food</span>
    <span value="4" id="tag-4" name="tag-4" class="tag-4">Vegan</span>
    <span value="5" id="tag-other" name="tag-other" class="tag-other">Vegan</span>
  
  </div>
  
      `
      console.log("hello");
      console.log(myarticle.querySelector('img'));
      console.log(myarticle.querySelector('img').src);
      console.log(data.imgSrc);
      

      myarticle.querySelector('img').setAttribute('alt', data.imgAlt);
      myarticle.getElementsByTagName('a')[0].setAttribute('href', data.titleLnk);
      myarticle.getElementsByTagName('a')[0].textContent = data.titleTxt;
      myarticle.getElementsByClassName('description')[0].textContent = data.description;
      myarticle.getElementsByClassName('rating')[0].querySelector('span').textContent = data.rating;
      myarticle.getElementsByClassName('cost')[0].querySelector('span').textContent = data.cost;
      myarticle.getElementsByClassName('tags')[0].querySelector('span').textContent = data.tags;
  
      var cboxes = document.getElementsByName('tags');
      var len = cboxes.length;
      console.log(len);
      console.log(cboxes);
      for (var i=0; i<len; i++) {
        console.log(cboxes[i].id);
          console.log(i + (cboxes[i].checked?' checked ':' unchecked ') + cboxes[i].value);
  
          if(cboxes[i].checked){
            console.log("we visible");
          myarticle.getElementsByClassName((cboxes[i].id))[0].style.visibility="visible";
          } else{
            console.log("we hidden");
            console.log((cboxes[i].id));
            console.log( myarticle.getElementsByClassName((cboxes[i].id))[0]);
            myarticle.getElementsByClassName((cboxes[i].id))[0].style.visibility= "hidden";
  
  
          }
        }
    }
  }
  
  // A8. TODO - Define the Class as a customElement so that you can create
  //           'recipe-card' elements
  customElements.define("recipe-card", RecipeCard);
  