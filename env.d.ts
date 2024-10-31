/// <reference types="vite/client" />

import type { Locale } from "@/localizer"
import "module"

declare global {
    interface Window {
        app: {
            locale: Locale
        }
    }
}