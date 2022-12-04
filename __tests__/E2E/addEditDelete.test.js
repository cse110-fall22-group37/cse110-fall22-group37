const { default: JSDOMEnvironment } = require('jest-environment-jsdom');
const puppeteer = require('puppeteer');

describe('Add, Edit, Delete', () => {
    let browser;
    let page;

    beforeAll(async () => {
      browser = await puppeteer.launch( { headless: false});
      page = await browser.newPage();
      await page.goto('https://wheretwoeat.netlify.app');
      
    },10000);

    afterAll(async () => {
      await page.close();
      await browser.close();
    })
    

    it('initialize page', async () => {
      await page.$eval('input[id="name"]', el => el.value = 'Panda Express');
      await page.click('input[id="rating-3"]');
      await page.click('input[id="price-1"]');
      await page.$eval('textarea', el => el.value = 'Orange chicken is really good.');
      await page.click('input[id="chinese"]');
      await page.click('button[type="add"]');
    }, 10000)

    it('check if an entry is added', async() => {
      await page.reload();
      const entry = await page.$$('restaurant-entry');
      let shadowRoot = await entry[0].getProperty('shadowRoot');
      let article = await shadowRoot.$('article');
      let name = await (await (await article.$('p[class="name"] > a')).getProperty('innerText')).jsonValue();
      let rate = await article.$$('img');
      let rateAlt = await (await rate[1].getProperty('alt')).jsonValue();
      let price = await (await (await article.$('p[class="price"]')).getProperty('innerText')).jsonValue();
      let textArea = await (await (await article.$('p[class="description"]')).getProperty('innerText')).jsonValue();
      let tag = await (await (await article.$('p[class="tags"]')).getProperty('innerText')).jsonValue();

      expect(name).toBe("Panda Express");
      expect(rateAlt).toBe("3 stars");
      expect(price).toBe("Price: $");
      expect(textArea).toBe("Description:\n" + "Orange chicken is really good.");
      expect(tag).toBe("Tags: chinese");
      expect(entry.length).toBe(1);
    }, 10000)

    
  });