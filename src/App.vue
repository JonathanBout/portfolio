<script setup lang="ts">
import { RouterView } from "vue-router"
import Footer from "./components/FooterComponent.vue"
</script>

<template>
    <header>
        <a href="/"> Jonathan Bout </a>
    </header>
    <RouterView />
    <Footer />
</template>
