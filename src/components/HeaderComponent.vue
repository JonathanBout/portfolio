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
const { t: translate, te: translationExists } = useI18n()
const animationDuration = ".2s"

const versionHash = inject<string>("gitRev")!

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
    return route.fullPath.split("/").filter((x) => !!x)
}

function basePath(index: number) {
    return (
        "/" +
        fullPathParts()
            .slice(0, index + 1)
            .join("/")
    )
}

function translatePathName(index: number, part: string) {
    const key = `pathName.${basePath(index).replace(/(^\/)|(\/$)/, "")}`
    if (translationExists(key)) {
        return translate(key)
    }
    return part
}
//#endregion
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
@import url(./HeaderComponent.vue.less);
</style>
