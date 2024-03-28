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
    <component :is="foundTag.url ? 'a' : 'span'" :href="foundTag.url" :style="style">
        <img v-if="foundTag.iconUrl" :src="foundTag.iconUrl" alt="icon" />
        {{ foundTag?.name ?? tag }}
    </component>
</template>

<style lang="less" scoped>
span,
a {
    padding-inline: 10px;
    padding-block: 0px;
    border-radius: 100px;
    background-color: var(--color-text);
    color: var(--color-secondary-background);
    img {
        height: 1em;
        aspect-ratio: 1;
        margin-right: 5px;
        transform: translateY(0.11em);
    }
}
</style>
