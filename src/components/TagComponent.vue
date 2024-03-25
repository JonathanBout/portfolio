<script setup lang="ts">
import tagsData from "@/assets/projects"

const props = defineProps({
    tag: String
})

const foundTag = tagsData.tags.find((t) => t.name === props.tag)

let style: string | undefined = undefined

if (foundTag) {
    style = `background-color: ${foundTag.color}; color: ${foundTag.textColor}`
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
