const { default: JSDOMEnvironment } = require("jest-environment-jsdom")
const puppeteer = require("puppeteer")

describe("Filter", () => {
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

	it("Add third entry", async () => {
		await page.$eval("input[id=\"name\"]", el => el.value = "VeganDTF")
		await page.click("input[id=\"rating-4\"]")
		await page.click("input[id=\"price-3\"]")
		await page.$eval("textarea", el => el.value = "A nice vegan place for vagan food.")
		await page.click("input[id=\"chinese\"]")
		await page.click("input[id=\"vegan\"]")
		await page.click("button[type=\"add\"]")
	}, 10000)

	it("Verify all three entries visible", async () => {
		const entry1 = await page.$("#Panda")
		expect(await entry1.boundingBox()).not.toBe(null)

		const entry2 = await page.$("#Plumeria")
		expect(await entry2.boundingBox()).not.toBe(null)

		const entry3 = await page.$("#VeganDTF")
		expect(await entry3.boundingBox()).not.toBe(null)
	}, 5000)

	it("Filter by vegan", async () => {
		await page.click("#by-vegan")

		const entry1 = await page.$("#Panda")
		expect(await entry1.boundingBox()).toBe(null)

		const entry2 = await page.$("#Plumeria")
		expect(await entry2.boundingBox()).not.toBe(null)

		const entry3 = await page.$("#VeganDTF")
		expect(await entry3.boundingBox()).not.toBe(null)
	}, 5000)

	it("Filter by chinese and vegan", async () => {
		await page.click("#by-vegan")
		await page.click("#by-chinese")

		const entry1 = await page.$("#Panda")
		expect(await entry1.boundingBox()).toBe(null)

		const entry2 = await page.$("#Plumeria")
		expect(await entry2.boundingBox()).toBe(null)

		const entry3 = await page.$("#VeganDTF")
		expect(await entry3.boundingBox()).not.toBe(null)
	}, 5000)

	it("Filter by chinese, vegan and kids", async () => {
		await page.click("#by-vegan")
		await page.click("#by-chinese")
		await page.click("#by-kids")

		const entry1 = await page.$("#Panda")
		expect(await entry1.boundingBox()).toBe(null)

		const entry2 = await page.$("#Plumeria")
		expect(await entry2.boundingBox()).toBe(null)

		const entry3 = await page.$("#VeganDTF")
		expect(await entry3.boundingBox()).toBe(null)
	}, 5000)
})