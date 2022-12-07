const { default: JSDOMEnvironment } = require("jest-environment-jsdom")
const puppeteer = require("puppeteer")

describe("Delete All", () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch( { 
			args: ['--no-sandbox'],
			headless: false
		})
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

	it("Add third entry", async () => {
		await page.$eval("input[id=\"name\"]", el => el.value = "VeganDTF")
		await page.click("input[id=\"rating-4\"]")
		await page.click("input[id=\"price-3\"]")
		await page.$eval("textarea", el => el.value = "A nice vegan place for vagan food.")
		await page.click("input[id=\"chinese\"]")
		await page.click("input[id=\"vegan\"]")
		await page.click("button[type=\"add\"]")
	}, 10000)

	it("Verify default sort", async () => {
		const entry = await page.$$("restaurant-entry")

		let shadowRoot1 = await entry[0].getProperty("shadowRoot")
		let article1 = await shadowRoot1.$("article")
		let name1 = await (await (await article1.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name1).toBe("Plumeria")

		let shadowRoot2 = await entry[1].getProperty("shadowRoot")
		let article2 = await shadowRoot2.$("article")
		let name2 = await (await (await article2.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name2).toBe("VeganDTF")

		let shadowRoot3 = await entry[2].getProperty("shadowRoot")
		let article3 = await shadowRoot3.$("article")
		let name3 = await (await (await article3.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name3).toBe("Panda")
	}, 5000)

	it("Sort by Price Low", async () => {
		await page.click("#priceAsc")

		const entry = await page.$$("restaurant-entry")

		let shadowRoot1 = await entry[0].getProperty("shadowRoot")
		let article1 = await shadowRoot1.$("article")
		let name1 = await (await (await article1.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name1).toBe("Panda")

		let shadowRoot2 = await entry[1].getProperty("shadowRoot")
		let article2 = await shadowRoot2.$("article")
		let name2 = await (await (await article2.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name2).toBe("Plumeria")

		let shadowRoot3 = await entry[2].getProperty("shadowRoot")
		let article3 = await shadowRoot3.$("article")
		let name3 = await (await (await article3.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name3).toBe("VeganDTF")
	}, 5000)

	it("Sort by Price High", async () => {
		await page.click("#priceDesc")

		const entry = await page.$$("restaurant-entry")

		let shadowRoot1 = await entry[0].getProperty("shadowRoot")
		let article1 = await shadowRoot1.$("article")
		let name1 = await (await (await article1.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name1).toBe("VeganDTF")

		let shadowRoot2 = await entry[1].getProperty("shadowRoot")
		let article2 = await shadowRoot2.$("article")
		let name2 = await (await (await article2.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name2).toBe("Plumeria")

		let shadowRoot3 = await entry[2].getProperty("shadowRoot")
		let article3 = await shadowRoot3.$("article")
		let name3 = await (await (await article3.$("p[class=\"name\"] > a")).getProperty("innerText")).jsonValue()
		expect(name3).toBe("Panda")
	}, 5000)
})