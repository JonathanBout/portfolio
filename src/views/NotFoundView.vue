<script setup lang="ts">
import { useRoute } from "vue-router"

const path = useRoute().path
</script>

<template>
    <div class="page-root">
        <h1 class="monospace">404</h1>
        <h2>{{ $t("errorPage.pageNotFound", { path: decodeURI(path) }) }}</h2>
        <div class="separated">
            <span>
                <a href="/">{{ $t("errorPage.back") }}</a>
            </span>
            <span>
                <a href="/">{{ $t("home") }}</a>
            </span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page-root > .separated {
    display: flex;
    justify-content: center;
}
</style>
