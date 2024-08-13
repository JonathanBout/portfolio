<script setup lang="ts">
import { LOCALES, type Locale, type Localized, changeLanguage } from "@/localizer"
import { inject } from "vue"
const creditsYear = new Date().getFullYear()

defineProps<{
    inert: boolean
}>()

const currentLocale = inject<Locale>("locale")

const iconsByLocale: Localized<string> = {
    en: "gb",
    nl: "nl"
}
</script>

<template>
    <footer class="monospace" :inert="inert">
        <div class="language-display" translate="no">
            <span>{{ $t("language.availableLocaleMessage") }}</span>
            <br />
            <ul>
                <li v-for="locale in LOCALES" v-bind:key="locale">
                    <button
                        :class="'link no-external-icon' + (currentLocale === locale ? ' current' : '')"
                        @click="changeLanguage(locale)"
                    >
                        <i :class="'fi fi-' + iconsByLocale[locale]"></i>
                        {{ $t("language." + locale) }}
                    </button>
                </li>
            </ul>
        </div>
        <div class="links separated">
            <span>&copy; {{ creditsYear }} Jonathan Bout</span>
            <span>
                <a href="https://github.com/jonathanbout/portfolio">
                    {{ $t("footer.view-on-gh") }}
                </a>
            </span>
        </div>
        <i class="credits-notice">
            {{ $t("imageCreditNotice") }}
        </i>
    </footer>
</template>

<style scoped lang="less">
.credits,
.language-display > button,
.links {
    text-align: center;
    font-size: 0.9em;

    @media (pointer: coarse) {
        line-height: 48px;
    }
}

.links {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    justify-content: safe center;

    --padding-size: 20px;

    padding-inline: var(--padding-size);
    * {
        text-wrap: nowrap;
    }

    &::before {
        position: sticky;
        content: "_";
        color: transparent;
        left: calc(var(--padding-size) * -1);
        top: 0;
        width: var(--padding-size);
        height: 100%;
        z-index: 10;
        background: linear-gradient(90deg, var(--color-background) 0%, transparent 100%);
    }

    &::after {
        position: sticky;
        content: "_";
        color: transparent;
        right: calc(var(--padding-size) * -1);
        top: 0;
        width: var(--padding-size);
        height: 100%;
        z-index: 10;
        background: linear-gradient(-90deg, var(--color-background) 0%, transparent 100%);
    }
}

.language-display {
    ul,
    li {
        list-style: none;
        padding: 0;
    }
    button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 0.9em;
        margin-inline: 5px;
    }

    padding-bottom: 1em;
}

footer {
    width: 100%;
    padding-top: 3em;
    border-top: 1px solid @border-color;
    text-align: center;
    @media (prefers-color-scheme: light) {
        --color-background: white;
        --color-text: black;
    }
    @media (prefers-color-scheme: dark) {
        --color-background: #161611;
        --color-text: white;
    }
    color: var(--color-text);
    background-color: var(--color-background);

    & > * {
        width: 100%;
        display: block;
    }
}

.credits-notice {
    font-size: 0.8em;
    display: block;
    text-align: center;
    color: #999;
}
</style>
