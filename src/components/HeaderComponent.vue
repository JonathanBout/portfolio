<script setup lang="ts">
import { inject, ref, watch } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import BurgerMenuIconComponent from "./BurgerMenuIconComponent.vue"
import { useI18n } from "vue-i18n"

const emit = defineEmits<{
    (e: "menuOpenChanged", value: boolean): void
}>()

let headerOpen = ref(false)

const router = useRouter()
const route = useRoute()
const { t: translate, te: translationExists } = inject("i18n") as ReturnType<typeof useI18n>
const animationDuration = ".2s"

const versionHash = inject("versionHash") as string

watch(router.currentRoute, () => {
    close_menu()
})

function close_menu() {
    headerOpen.value = false
    emit("menuOpenChanged", headerOpen.value)
}

function toggle_menu() {
    headerOpen.value = !headerOpen.value
    emit("menuOpenChanged", headerOpen.value)
}

const fullPath = () => route.fullPath
const fullPathParts = () => route.fullPath.split("/").filter((x) => !!x)
const basePath = (index: number) =>
    "/" +
    fullPathParts()
        .slice(0, index + 1)
        .join("/")

function translatePathName(index: number, part: string) {
    const key = `pathName.${basePath(index).replace(/(^\/)|(\/$)/, "")}`
    if (translationExists(key)) {
        return translate(key)
    }
    return part
}
</script>

<template>
    <div class="menu-wrapper" :style="'--animation-duration: ' + animationDuration">
        <div :class="'header-backdrop' + (headerOpen ? '' : ' closed')" @click="close_menu"></div>
        <button class="header-toggle" @click="toggle_menu">
            <BurgerMenuIconComponent :animation-duration="animationDuration" :open="headerOpen" />
            <div class="header-toggle-backdrop"></div>
        </button>
        <div class="location-marker" v-if="fullPath() != '/'">
            <a v-for="(part, index) in fullPathParts()" :href="basePath(index)" v-bind:key="part">{{
                translatePathName(index, part)
            }}</a>
        </div>
        <header :class="'monospace' + (headerOpen ? '' : ' closed')">
            <router-link to="/" active-class="active" class="site-title">
                <span>Jonathan Bout</span>
            </router-link>
            <router-link active-class="active" to="/projects">
                <span>{{ $t("header.projects") }}</span>
            </router-link>
            <div class="flex-filler"></div>
            <div class="version">{{ $t("version") + " " + versionHash }}</div>
        </header>
    </div>
</template>
<style lang="less" scoped>
.version {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.6rem;
    padding-right: 5px;
    padding-top: 5px;
    margin: 0;
    line-height: 1;
    text-transform: lowercase;
}

.menu-wrapper {
    display: contents;

    @media (width <= 700px) {
        display: block;
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 100;
        height: 50px;
    }
}

.site-title {
    font-size: 1.4em;
}

.flex-filler,
.location-marker {
    display: none;
}

header {
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    background-color: var(--color-secondary-background);
}

.header-toggle {
    background-color: var(--color-secondary-background);
    &::before,
    &::after {
        background-color: transparent;

        top: calc(0px - var(--border-radius) * 2);
        left: 0;

        content: "";
        position: absolute;
        width: var(--border-radius);
        height: calc(var(--border-radius) * 2);
        border-bottom-left-radius: var(--border-radius);
        box-shadow: 0 var(--border-radius) 0 0 var(--color-secondary-background);
    }

    &::after {
        top: unset;
        border-bottom-left-radius: unset;
        border-top-left-radius: var(--border-radius);
        box-shadow: 0 calc(0px - var(--border-radius)) 0 0 var(--color-secondary-background);
        bottom: calc(0px - var(--border-radius) * 2);
    }
}

@media (width > 700px) {
    .header-toggle,
    .header-backdrop {
        display: none;
    }

    header > a {
        height: 100%;
        text-decoration: none;
        color: var(--color-text);
        transform-origin: top center;
        display: inline-block;
        transition: font-size 0.1s linear;
        font-size: 1em;

        transition: background-color var(--animation-duration) linear;

        padding: 5px 20px 0px var(--border-radius);

        display: flex;
        align-items: center;
        border-radius: var(--border-radius) var(--border-radius) 0 0;

        &::before,
        &::after {
            z-index: 20;
            content: "";
            position: absolute;
            width: 20px;
            height: 40px;
            background-color: transparent;
            left: calc(0px - var(--border-radius));
            bottom: 0;
            border-bottom-right-radius: var(--border-radius);
            transition: box-shadow var(--animation-duration) linear;
        }

        &::after {
            background-color: transparent;
            left: unset;
            right: calc(0px - var(--border-radius));
            border-bottom-right-radius: unset;
            border-bottom-left-radius: var(--border-radius);
        }

        &.active {
            background-color: var(--color-background);

            &::before,
            &::after {
                box-shadow: 0 var(--border-radius) 0 0 var(--color-background);
            }
        }

        @media (hover: hover) {
            &:hover:not(.active) {
                filter: brightness(1.1);
            }
        }
    }

    header {
        --animation-duration: 0.2s;
        flex: 0 1 0px;
        width: 100%;
        box-shadow: 100px 0 0 0 var(--color-secondary-background);
        padding-top: 5px;
        gap: 10px;
    }
}
@media (width <= 700px) {
    .header-toggle {
        display: block;
        position: relative;
        top: 10px;
        width: 60px;
        aspect-ratio: 1;
        z-index: 3;
        border: none;
        border-radius: 0 10px 10px 0;
        background-color: var(--color-secondary-background);
        box-shadow: 5px 0 5px -5px var(--color-background);
    }

    .flex-filler {
        display: block;
        flex-grow: 1;
        flex-basis: 0px;
    }

    .version {
        position: static;
    }

    .location-marker {
        position: absolute;
        left: 60px;
        height: 60px;
        font-size: 1rem;
        top: 10px;

        padding-inline: 5px;
        display: flex;
        align-items: center;
        max-width: calc(100% - 60px);
        flex-wrap: nowrap;

        overflow: auto;

        a {
            background-color: var(--color-secondary-background);
            padding: 5px 15px;
            text-wrap: nowrap;

            clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0% 100%);
            &:not(:first-child) {
                margin-left: -5px;
            }

            &:first-child {
                clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0% 100%);
                padding-left: 10px;
            }

            &:last-child {
                clip-path: polygon(10px 0px, 100% 0, 100% 100%, 0% 100%);
                border-radius: 0 10px 10px 0;
                padding-right: 15px;
            }

            &:only-child {
                clip-path: none;
            }
        }
    }

    header {
        transition: transform var(--animation-duration) ease-out;
        position: fixed;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        padding: 20px;
        z-index: 2;
        transform-origin: right;
        box-shadow: 0 2px 10px 0 black;

        top: 90px;
        left: 10px;
        right: 10px;
        margin: auto;
        max-width: 400px;
        min-height: 50%;
        border-radius: calc(var(--border-radius) - 10px);

        &.closed {
            transform: translateX(100dvw);
        }
    }

    .header-backdrop {
        opacity: 0.6;
        transition: opacity var(--animation-duration) ease-out;
        content: "";
        position: fixed;
        inset: 0;
        background-color: black;
        z-index: 1;

        &.closed {
            z-index: -10;
            opacity: 0.8;
            background: linear-gradient(to bottom, var(--color-background) 60px, transparent 100px);
            scrollbar-gutter: stable;
            pointer-events: none;
        }
    }
}
</style>
