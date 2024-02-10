<script setup lang="ts">
import { useRoute } from "vue-router"

const path = useRoute().path
</script>

<template>
  <main>
    <h1 class="error-code">404</h1>
    <h2>{{ $t("errorPage.pageNotFound", { path }) }}</h2>
    <a href="/">{{ $t("errorPage.back") }}</a>
    <a href="/">{{ $t("home") }}</a>
  </main>
</template>
<style lang="less">
.error-code {
  font-family: "Cascadia Code", "Cascadia Mono", "Consolas", monospace;
}
</style>
