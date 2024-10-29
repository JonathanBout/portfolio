/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: "jest-puppeteer",
    rootDir: "tests/integration",
    testRegex: "./*\\.test\\.ts$",
    testEnvironment: "node",
    transform: {
        "^.+.ts?$": ["ts-jest", {}]
    }
}
