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
      // await page.close();
      // await browser.close();
    })
    

    it('Add new entry', async () => {
      await page.$eval('input[id="name"]', el => el.value = 'Panda Express');
      await page.click('input[id="rating-3"]');
      await page.click('input[id="price-1"]');
      await page.$eval('textarea', el => el.value = 'Orange chicken is really good.');
      await page.click('input[id="chinese"]');
      // TODO: Figure out image upload
      // await page.$eval('input[type="file"]', async el => await el.uploadFile('__tests__/E2E/images/pandaExpress.png'));
      // const filePath = path.relative(process.cwd(), __dirname + '/images/pandaExpress.png');
      // const imgInput = await page.$("input[type=file]");
      // await imgInput.uploadFile(filePath);
      // await imgInput.uploadFile('/Users/petha/Desktop/Data/Class Material/FA22/CSE110/Project Repo/cse110-fall22-group37/__tests__/E2E/images/pandaExpress.png');
      await page.click('button[type="add"]');
    })

    xit('Verify new entry added', async () => {
      await page.$eval('input[id="name"]', el => el.value = 'The new name');
      // const names = await page.$$('input[id="name"]');
      // const names = await page.$$('a');
      // console.log(names)
      // const text = await names[0].getProperty('innerText');
      // const text = await page.$eval('a',  el => el.getProperty('innerText'));
      // expect(await text.jsonValue()).toBe('Panda Express');
    });

    it('Add second entry', async () => {
      await page.$eval('input[id="name"]', el => el.value = 'Plumeria');
      await page.click('input[id="rating-4"]');
      await page.click('input[id="price-2"]');
      await page.$eval('textarea', el => el.value = 'Really good vegan food with cool vibes.');
      await page.click('input[id="vegan"]');
      await page.click('input[id="kids"]');
      // TODO: Figure out image upload
      await page.click('button[type="add"]');
    })
  });