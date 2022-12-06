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
      //await page.close();
      //await browser.close();
    })
    
    beforeEach(async () => {
      await page.reload();
    })

    it('Add first entry', async () => {
      await page.$eval('input[id="name"]', el => el.value = 'Panda');
      await page.click('input[id="rating-3"]');
      await page.click('input[id="price-1"]');
      await page.$eval('textarea', el => el.value = 'Orange chicken is really good.');
      await page.click('input[id="chinese"]');
      await page.click('button[type="add"]');
    }, 10000)

    it('check if an entry is added', async() => {
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

    it('Add second entry', async () => {
      await page.$eval('input[id="name"]', el => el.value = 'Plumeria');
      await page.click('input[id="rating-4"]');
      await page.click('input[id="price-2"]');
      await page.$eval('textarea', el => el.value = 'Really good vegan food with cool vibes.');
      await page.click('input[id="chinese"]');
      await page.click('input[id="kids"]');
      await page.click('button[type="add"]');
    }, 10000)

    it('check if an entry is added', async() => {
      const entry = await page.$$('restaurant-entry');
      let shadowRoot = await entry[0].getProperty('shadowRoot');
      let article = await shadowRoot.$('article');
      let name = await (await (await article.$('p[class="name"] > a')).getProperty('innerText')).jsonValue();
      let rate = await article.$$('img');
      let rateAlt = await (await rate[1].getProperty('alt')).jsonValue();
      let price = await (await (await article.$('p[class="price"]')).getProperty('innerText')).jsonValue();
      let textArea = await (await (await article.$('p[class="description"]')).getProperty('innerText')).jsonValue();
      let tag = await (await (await article.$('p[class="tags"]')).getProperty('innerText')).jsonValue();

      expect(name).toBe("Plumeria");
      expect(rateAlt).toBe("4 stars");
      expect(price).toBe("Price: $$");
      expect(textArea).toBe("Description:\n" + "Really good vegan food with cool vibes.");
      expect(tag).toBe("Tags: chinese, kids");
      expect(entry.length).toBe(2);
    }, 10000)

    it('Search', async() => {
      await page.$eval('input[id="search-bar"]', el => el.value = 'Plumeria');
      
      const entry1 = await page.$('#PandaExpress');
      expect(await entry1.boundingBox()).toBe(null);

      const entry2 = await page.$('#Plumeria');
      expect(await entry2.boundingBox()).not.toBe(null);
    })
  });