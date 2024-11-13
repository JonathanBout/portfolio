<script setup lang="ts">
import server from "@/server"
import { onMounted, ref } from "vue"

type CacheData = {
    entries: number
    hits: number
    misses: number
    size: number
}

// false if not loaded, true if loaded but error, CacheData if loaded successfully
const cacheData = ref<CacheData | boolean>(false)

onMounted(refreshStats)

async function refreshStats() {
    cacheData.value = false
    try {
        const response = await server.get("/api/application/cache")
        cacheData.value = response.data
    } catch (error) {
        cacheData.value = true
        console.error("Error fetching cache data", error)
    }
}

function clearCache() {
    if (confirm("Are you sure you want to clear the cache?")) {
        server
            .delete("/api/application/cache")
            .then(async () => {
                await refreshStats()
            })
            .catch((error) => {
                console.error("Error clearing cache", error)
            })
    }
}
</script>

<template>
    <h1>Cache</h1>

    <table>
        <thead>
            <tr>
                <th>Entries</th>
                <th>Hits</th>
                <th>Misses</th>
                <th>Size</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="cacheData === true">
                <td colspan="4">Error loading cache data</td>
            </tr>
            <tr v-else-if="cacheData === false">
                <td colspan="4">Loading...</td>
            </tr>
            <tr v-else>
                <td>{{ cacheData.entries }}</td>
                <td>{{ cacheData.hits }}</td>
                <td>{{ cacheData.misses }}</td>
                <td>{{ cacheData.size }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="refreshStats">Refresh</button>
    <button @click="clearCache">Clear Cache</button>
</template>

<style scoped lang="less">
table {
    border-collapse: collapse;

    td,
    th {
        padding-inline: 0.5em;
        text-align: center;
    }
}
</style>
