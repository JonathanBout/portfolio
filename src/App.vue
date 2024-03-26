<script setup lang="ts">
import { RouterView } from "vue-router"
import Footer from "./components/FooterComponent.vue"
import Header from "./components/HeaderComponent.vue"
import { ref } from "vue"

const menuIsOpen = ref(false)

function getIsInert() {
    return menuIsOpen.value && window.matchMedia("(max-width: 700px)").matches
}
</script>

<template>
    <Header @menu-open-changed="(value) => (menuIsOpen = value)" />
    <main :inert="getIsInert()">
        <RouterView />
    </main>
    <Footer :inert="getIsInert()" />
</template>
