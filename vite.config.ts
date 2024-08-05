import { fileURLToPath, URL } from "node:url"
import localizerPlugin from "./plugins/localizer.plugin.js"
import gitrevPlugin from "./plugins/gitrev.plugin.js"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), localizerPlugin(), gitrevPlugin()],
    resolve: {
        alias: {
            //@ts-ignore
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
})
