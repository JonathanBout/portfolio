import { fileURLToPath, URL } from "node:url"
import localizerPlugin from "./plugins/localizer.plugin.js"
import gitInfoPlugin from "./plugins/git-status.plugin.js"
import autoprefixer from "autoprefixer"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"

export default defineConfig({
    plugins: [vue(), localizerPlugin(), gitInfoPlugin(), vueDevTools()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        },
        dedupe: ["vue"],
    },
    server: {
        watch: {
            // to make hot reload work on WSL2
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
