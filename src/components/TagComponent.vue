<script setup lang="ts">
import tagsData, { Tag } from "@/projects"

const props = defineProps({
    tag: String
})

const foundTag = (tagsData.tags as any)[props.tag || ""] as Tag

let style: string | undefined = undefined

if (foundTag) {
    style = `--tag-background-color: ${foundTag.color ?? "white"}; --tag-text-color: ${
        foundTag.textColor.toCSSColorString() ?? "black"
    }`
}
</script>

<template>
    <component :is="foundTag.url ? 'a' : 'span'" class="tag-element" :href="foundTag.url" :style="style">
        <img v-if="foundTag.iconUrl" :src="foundTag.iconUrl" alt="icon" />
        <span>
            {{ foundTag?.name ?? tag }}
        </span>
    </component>
</template>

<style lang="less" scoped>
.tag-element {
    padding-inline: 10px;
    padding-block: 0px;
    border-radius: 100px;
    height: 100%;
    margin-top: 3px;
    &,
    & > span {
        background-color: var(--tag-background-color);
        color: var(--tag-text-color);
        height: 100%;
    }

    img {
        height: 1em;
        aspect-ratio: 1;
        margin-right: 5px;
        transform: translateY(0.11em);
    }
}
</style>
