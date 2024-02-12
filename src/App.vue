<script setup lang="ts">
import { RouterView } from "vue-router"
import Footer from "./components/FooterComponent.vue"
import Header from "./components/HeaderComponent.vue"
</script>

<template>
    <header class="monospace">
        <Header />
    </header>
    <main>
        <RouterView />
    </main>
    <footer class="monospace">
        <Footer />
    </footer>
</template>
