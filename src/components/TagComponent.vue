<script setup lang="ts">
import tagsData, { Tag } from "@/assets/projects"

const props = defineProps({
    tag: String
})

const foundTag = (tagsData.tags as any)[props.tag || ""] as Tag

let style: string | undefined = undefined

if (foundTag) {
    style = `background-color: ${foundTag.color ?? "white"}; color: ${foundTag.textColor ?? "black"}`
}
</script>

<template>
    <span v-if="!foundTag?.url" :style="style">{{ foundTag?.name ?? tag }}</span>
    <a v-else :href="foundTag.url" :style="style">{{ foundTag.name ?? tag }}</a>
</template>

<style lang="less" scoped>
span,
a {
    padding-inline: 10px;
    padding-block: 0px;
    border-radius: 100px;
    background-color: var(--color-text);
    color: var(--color-secondary-background);
}
</style>
