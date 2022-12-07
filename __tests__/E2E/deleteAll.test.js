const { default: JSDOMEnvironment } = require("jest-environment-jsdom")
const puppeteer = require("puppeteer")

describe("Delete All", () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch( { headless: false})
		page = await browser.newPage()
		await page.goto("https://wheretwoeat.netlify.app")
        
	},10000)
  
	afterAll(async () => {
		await page.close()
		await browser.close()
	})

	beforeEach(async () => {
		await page.reload()
	})

	it("Add first entry", async () => {
		await page.$eval("input[id=\"name\"]", el => el.value = "Panda")
		await page.click("input[id=\"rating-3\"]")
		await page.click("input[id=\"price-1\"]")
		await page.$eval("textarea", el => el.value = "Orange chicken is really good.")
		await page.click("input[id=\"chinese\"]")
		await page.click("button[type=\"add\"]")
	}, 10000)
    
	it("Add second entry", async () => {
		await page.$eval("input[id=\"name\"]", el => el.value = "Plumeria")
		await page.click("input[id=\"rating-4\"]")
		await page.click("input[id=\"price-2\"]")
		await page.$eval("textarea", el => el.value = "Really good vegan food with cool vibes.")
		await page.click("input[id=\"vegan\"]")
		await page.click("input[id=\"kids\"]")
		await page.click("button[type=\"add\"]")
	}, 10000)

	it("Verify there are 2 entries", async () => {
		const entry = await page.$$("restaurant-entry")
		expect(entry.length).toBe(2)
	})

	it("Click delete all", async () => {
		await page.click("button[type=\"deleteAll\"]")

	})

	it("Verify there are 0 entries", async () => {
		const entry = await page.$$("restaurant-entry")
		expect(entry.length).toBe(0)
	})
})