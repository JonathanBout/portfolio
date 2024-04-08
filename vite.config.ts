import { fileURLToPath, URL } from "node:url"
import localizerPlugin from "./plugins/localizer.plugin"
import gitrevPlugin from "./plugins/gitrev.plugin"

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
