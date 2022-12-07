//const { default: JSDOMEnvironment } = require("jest-environment-jsdom")
const puppeteer = require("puppeteer")

describe("Add, Edit, Delete", () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch( { 
			headless: true
		})
		page = await browser.newPage()
		await page.goto("https://wheretwoeat.netlify.app")
      
	},10000)

	beforeEach(async () => {
		await page.reload()
	})

	afterAll(async () => {
		await page.close()
		await browser.close()
	})
    

	it("Add first entry", async () => {
		await page.$eval("input[id=\"name\"]", el => el.value = "Panda Express")
		await page.$eval("input[id=\"rating-3\"]", el => el.click())
		await page.$eval("input[id=\"price-1\"]", el => el.click())
		await page.$eval("textarea", el => el.value = "Orange chicken is really good.")
		await page.$eval("input[id=\"chinese\"]", el => el.click())
		await page.$eval("button[type=\"add\"]", el => el.click())
	}, 10000)

    

	it("Check if first entry is added", async() => {
		const entry = await page.$$("restaurant-entry")
		let shadowRoot = await entry[0].getProperty("shadowRoot")
		let article = await shadowRoot.$("article")
		let name = await (await (await article.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		let rate = await article.$$("img")
		let rateAlt = await (await rate[1].getProperty("alt")).jsonValue()
		let price = await (await (await article.$("p[class=\"price\"]")).getProperty("innerText")).jsonValue()
		let textArea = await (await (await article.$("p[class=\"description\"]")).getProperty("innerText")).jsonValue()
		let tag = await (await (await article.$("p[class=\"tags\"]")).getProperty("innerText")).jsonValue()

		expect(name).toBe("Panda Express")
		expect(rateAlt).toBe("3 stars")
		expect(price).toBe("Price: $")
		expect(textArea).toBe("Description:\n" + "Orange chicken is really good.")
		expect(tag).toBe("Tags: chinese")
		expect(entry.length).toBe(1)
	}, 10000)

	it("Add second entry", async () => {
		await page.$eval("input[id=\"name\"]", el => el.value = "Plumeria")
		await page.$eval("input[id=\"rating-4\"]", el => el.click())
		await page.$eval("input[id=\"price-2\"]", el => el.click())
		await page.$eval("textarea", el => el.value = "Really good vegan food with cool vibes.")
		await page.$eval("input[id=\"chinese\"]", el => el.click())
		await page.$eval("input[id=\"kids\"]", el => el.click())
		await page.$eval("button[type=\"add\"]", el => el.click())
	}, 10000)

	it("Check if second entry is added", async() => {
		const entry = await page.$$("restaurant-entry")
		let shadowRoot = await entry[0].getProperty("shadowRoot")
		let article = await shadowRoot.$("article")
		let name = await (await (await article.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		let rate = await article.$$("img")
		let rateAlt = await (await rate[1].getProperty("alt")).jsonValue()
		let price = await (await (await article.$("p[class=\"price\"]")).getProperty("innerText")).jsonValue()
		let textArea = await (await (await article.$("p[class=\"description\"]")).getProperty("innerText")).jsonValue()
		let tag = await (await (await article.$("p[class=\"tags\"]")).getProperty("innerText")).jsonValue()

		expect(name).toBe("Plumeria")
		expect(rateAlt).toBe("4 stars")
		expect(price).toBe("Price: $$")
		expect(textArea).toBe("Description:\n" + "Really good vegan food with cool vibes.")
		expect(tag).toBe("Tags: chinese, kids")
		expect(entry.length).toBe(2)
	}, 10000)

	it("edit the first entry", async() => {
		const entry = await page.$$("restaurant-entry")
		let shadowRoot = await entry[0].getProperty("shadowRoot")
		await shadowRoot.$eval("button[type=\"edit\"]", el => el.click())

		await page.$eval("input[id=\"name\"]", el => el.value = "Tapioca Express")
		await page.$eval("input[id=\"rating-5\"]", el => el.click())
		await page.$eval("input[id=\"price-1\"]", el => el.click())
		await page.$eval("textarea", el => el.value = "Combo 8 for the best")
		await page.$eval("input[id=\"chinese\"]", el => el.click())
		await page.$eval("input[id=\"kids\"]", el => el.click())
		await page.$eval("input[id=\"other\"]", el => el.click())
		await page.$eval("button[type=\"add\"]", el => el.click())
	},10000)

	it("Check if entry is editted", async() => {
		const entry = await page.$$("restaurant-entry")
		let shadowRoot = await entry[0].getProperty("shadowRoot")
		let article = await shadowRoot.$("article")
		let name = await (await (await article.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		let rate = await article.$$("img")
		let rateAlt = await (await rate[1].getProperty("alt")).jsonValue()
		let price = await (await (await article.$("p[class=\"price\"]")).getProperty("innerText")).jsonValue()
		let textArea = await (await (await article.$("p[class=\"description\"]")).getProperty("innerText")).jsonValue()
		let tag = await (await (await article.$("p[class=\"tags\"]")).getProperty("innerText")).jsonValue()

		expect(name).toBe("Tapioca Express")
		expect(rateAlt).toBe("5 stars")
		expect(price).toBe("Price: $")
		expect(textArea).toBe("Description:\n" + "Combo 8 for the best")
		expect(tag).toBe("Tags: other")
		expect(entry.length).toBe(2)
	}, 10000)

	it("delete an entry", async() => {
		const entry = await page.$$("restaurant-entry")
		let shadowRoot = await entry[0].getProperty("shadowRoot")
		await shadowRoot.$eval("button[type=\"delete\"]", el => el.click())
		let deletedEntry = await page.$$("restaurant-entry")

		expect(deletedEntry.length).toBe(1)
      
	})
    
})