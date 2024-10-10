<script setup lang="ts">
import { inject, ref, watch } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import BurgerMenuIconComponent from "../BurgerMenuIconComponent.vue"
import { useI18n } from "vue-i18n"

const emit = defineEmits<{
    (e: "menuOpenChanged", value: boolean): void
}>()

let headerOpen = ref(false)

const router = useRouter()
const route = useRoute()
const { t: translate, te: translationExists } = useI18n()
const animationDuration = ".2s"

const versionHash = inject<string>("gitRev") ?? "unknown"

watch(router.currentRoute, () => {
    close_menu()
})
//#region functions
function close_menu() {
    headerOpen.value = false
    emit("menuOpenChanged", headerOpen.value)
}

function toggle_menu() {
    headerOpen.value = !headerOpen.value
    emit("menuOpenChanged", headerOpen.value)
}

function fullPath() {
    return route.fullPath
}

function fullPathParts() {
    let parts = route.fullPath.split("?")[0].split("/")

    if (!parts[0]) {
        parts = parts.slice(1)
    }

    return parts
}

function basePath(index: number, decode: boolean = false) {
    const path =
        "/" +
        fullPathParts()
            .slice(0, index + 1)
            .join("/")

    return decode ? decodeURI(path) : path
}

function transformPathName(index: number, part: string) {
    part = decodeURI(part)
    const key = `pathName.${basePath(index, true).replace(/(^\/)|(\/$)/, "")}`

    if (translationExists(key)) {
        return translate(key)
    }

    return part
}
//#endregion
</script>

<template>
    <div class="menu-wrapper" :style="'--animation-duration: ' + animationDuration">
        <div :class="'header-backdrop' + (headerOpen ? '' : ' closed')" @click="close_menu" />
        <button aria-label="menu" class="header-toggle" @click="toggle_menu">
            <BurgerMenuIconComponent :animation-duration="animationDuration" :open="headerOpen" />
            <div class="header-toggle-backdrop" />
        </button>
        <div v-if="fullPath() != '/'" class="location-marker">
            <router-link v-for="(part, index) in fullPathParts()" :key="part" :to="{ path: basePath(index) }">
                {{
                    transformPathName(index, part)
                }}
            </router-link>
        </div>
        <header :class="'monospace' + (headerOpen ? '' : ' closed')">
            <router-link to="/" active-class="active" class="site-title">
                <span>Jonathan Bout</span>
            </router-link>
            <router-link active-class="active" to="/projects">
                <span>{{ $t("header.projects") }}</span>
            </router-link>
            <router-link active-class="active" to="/contact">
                <span>{{ $t("contact.title") }}</span>
            </router-link>
            <a href="https://github.com/JonathanBout" :aria-label="$t('header.github')" class="no-external-icon small">
                <span><i class="bi bi-github" /></span>
            </a>
            <a
                href="https://linkedin.com/in/jonathanbout"
                :aria-label="$t('header.linkedin')"
                class="no-external-icon small"
            >
                <span><i class="bi bi-linkedin" /></span>
            </a>
            <div class="flex-filler" />
            <div class="version">
                <a :href="'https://github.com/JonathanBout/portfolio/commit/' + versionHash">{{
                    $t("version") + " " + versionHash
                }}</a>
            </div>
        </header>
    </div>
</template>
<style lang="less" scoped>
@import url(./HeaderComponent.vue.less);
</style>
