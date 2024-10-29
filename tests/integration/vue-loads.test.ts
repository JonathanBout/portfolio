import { describe, beforeAll, it, expect, afterAll } from "@jest/globals"

import puppeteer, { Page } from "puppeteer"

let page: Page

describe("The portfolio's vue app", () => {
    beforeAll(async () => {
        const browser = await puppeteer.launch({ timeout: 5000 }) // wait at most 5 seconds for any selectors to appear
        page = await browser.newPage()

        await page.setUserAgent("puppeteer-integration-tester")

        await Promise.all([page.waitForNavigation(), page.goto("http://localhost:50000/")])
    })

    it("loads", async () => {
        const siteTitle = await page.waitForSelector("a.site-title")
        expect(await siteTitle?.evaluate((el) => el.textContent)).toContain("Jonathan Bout")

        const heading1 = await page.waitForSelector("h1")
        expect(await heading1?.evaluate((el) => el.ariaLabel)).toContain("Jonathan")
    }, 60_000) // timeout of 60 seconds, as the app can be slow to load

    it("loads the English locales", async () => {
        await page.waitForSelector("html[lang='en']")

        expect(await page.title()).toBe("Jonathan Bout")

        const creditsNotice = await page.waitForSelector("i.credits-notice")
        expect(await creditsNotice?.evaluate((el) => el.textContent)).toContain("rights to images")
    }, 60_000)

    it("loads the Dutch locales", async () => {
        await Promise.all([page.waitForNavigation(), page.goto("http://localhost:50001/")])

        await page.waitForSelector("html[lang='nl']")

        expect(await page.title()).toBe("Jonathan Bout")

        const creditsNotice = await page.waitForSelector("i.credits-notice")
        expect(await creditsNotice?.evaluate((el) => el.textContent)).toContain("rechten op de afbeeldingen")
    }, 60_000)

    it("loads the GitHub stats", async () => {
        const dataLangNameCS = await page.waitForSelector('[data-lang-name="C#"] > span:first-child', {
            timeout: 60_000
        })
        expect(await dataLangNameCS?.evaluate((el) => el.textContent)).toContain("C#")
    }, 70_000)

    afterAll(async () => {
        const browser = page?.browser()
        await Promise.all([browser?.close(), page?.close()]);
    })
})
