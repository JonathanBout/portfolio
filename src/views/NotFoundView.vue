<script setup lang="ts">
import { useRoute } from "vue-router"

const path = useRoute().path
</script>

<template>
    <h1 class="monospace">404</h1>
    <h2>{{ $t("errorPage.pageNotFound", { path }) }}</h2>
    <a href="/">{{ $t("errorPage.back") }}</a>
    <a href="/">{{ $t("home") }}</a>
</template>
