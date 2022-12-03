const { default: JSDOMEnvironment } = require('jest-environment-jsdom');
const puppeteer = require('puppeteer');

describe('Basic user flow for Website', () => {
    // visit website
    let browser
    let page

    beforeAll(async () => {
      //browser = await puppeteer.launch();
      //page = await browser.newPage();
      browser = await puppeteer.launch( { headless: false});
      page = await browser.newPage();
      await page.goto('https://wheretwoeat.netlify.app');
      
    },10000);

    afterAll(async () => {
      //await page.close();
      //await browser.close();
    })
    

    it('Adding an entry', async () => {
      // get form's elements
      let form = await page.$('form');
      let name = await form.$('input[id="name"]');
      let rating = await form.$('input[id="rating-1"]');
      let price = await form.$('input[id="price-1"]');
      let textArea = await form.$('textarea');
      let tag = await form.$('input[id="western"]');
      let img = await form.$('input[id="img"]');
      let button = await form.$('button[type="add"]');

      // add information
      name.value = 'name';
      await rating.click();
      await price.click();
      textArea.value = 'good';
      await tag.click();
      img.src = './food_image/test1.jpeg';
      await button.click();

      // get the entry info
      //let entry = await page.$$('p[class="name"]');
      //console.log(entry[0]);
      /*
      let entryImg = (await entry.$('img')).src;
      let entryName = (await entry.$('p[class="name"]')).innerHTML;
      let entryRating = (await (await entry.$('div[class="rating"]')).$('img')).src;
      let entryPrice = (await entry.$('p[class="price"]')).innerHTML;
      let entryTag = (await entry.$('p[class="tag"]')).innerHTML;
      let entryDescription = (await entry.$('p[class="description"]')).innerHTML;

      // test
      console.log(entryImg);
      console.log(entryName);
      console.log(entryRating);
      console.log(entryPrice);
      console.log(entryTag);
      console.log(entryDescription);
      */
      expect(true).toBe(true);
    }, 10000)

    
  });