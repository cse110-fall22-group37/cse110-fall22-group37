const { default: JSDOMEnvironment } = require("jest-environment-jsdom")
const puppeteer = require("puppeteer")

describe("Search", () => {
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

	it("Search for Plu", async() => {
		const searchBar = await page.$("#search-bar")
		await searchBar.type("Plu")
    
		const entry1 = await page.$("#Panda")
		expect(await entry1.boundingBox()).toBe(null)

		const entry2 = await page.$("#Plumeria")
		expect(await entry2.boundingBox()).not.toBe(null)

		await page.reload()
	})
})