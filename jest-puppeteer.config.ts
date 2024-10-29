export default {
    launch: {
        dumpio: true,
        headless: false
    },
    browser: 'chromium',
    browserContext: 'default',
    server: {
        command: 'npm run compose-up',
        port: 50001,
        // ten minutes (10min * 60s/min * 1000ms/s) as docker-compose can take a while
        launchTimeout: 600_000,
        debug: true
    }
}