import { fileURLToPath, URL } from "node:url"
import localizerPlugin from "./plugins/localizer.plugin.js"
import gitrevPlugin from "./plugins/gitrev.plugin.js"
import autoprefixer from "autoprefixer"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    plugins: [vue(), localizerPlugin(), gitrevPlugin(), vueDevTools(), mkcert()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        },
        dedupe: ["vue"]
    },
    server: {
        watch: {
            // to make the project work on WSL2
            usePolling: true
        },
        port: 3999,
        strictPort: true
    },
    preview: {
        port: 3999,
        strictPort: true
    },
    css: {
        preprocessorOptions: {
            less: {
                // import global less things
                additionalData: `@import "@/assets/globals.less";`
            }
        },
        postcss: {
            // autoprefixer to add vendor prefixes
            plugins: [autoprefixer]
        }
    }
})
