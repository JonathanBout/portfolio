import { fileURLToPath, URL } from "node:url"
import localizerPlugin from "./plugins/localizer.plugin.js"
import gitrevPlugin from "./plugins/gitrev.plugin.js"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), localizerPlugin(), gitrevPlugin(), vueDevTools()],
    resolve: {
        alias: {
            //@ts-ignore
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                 additionalData: `@import "@/assets/variables.less";`
            }
        }
    }
})