<script setup lang="ts">
const props = defineProps<{ title: string; paragraphs: string | string[]; lastUpdate: Date }>()

const transformedParagraphs = Array.isArray(props.paragraphs) ? props.paragraphs : getParagraphs(props.paragraphs)

function getParagraphs(paragraphs: string): string[] {
    return paragraphs.split("\n")
}
</script>
<template>
    <div class="page-root">
        <h1>
            {{ title }}
        </h1>
        <div class="state">{{ $t("privacy.lastUpdated") }}: {{ lastUpdate }}</div>
        <p v-for="paragraph in transformedParagraphs" :key="paragraph">
            {{ paragraph }}
        </p>
    </div>
</template>
