<script setup lang="ts">
import { RouterView } from "vue-router"
import Footer from "./components/FooterComponent.vue"
import Header from "./components/HeaderComponent.vue"
</script>

<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>
