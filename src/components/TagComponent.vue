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

function getIconUrl() {
    if (foundTag.iconUrl) {
        return foundTag.iconUrl
    } else if (foundTag.url) {
        return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${foundTag.url}&size=64`
    }
    return undefined
}
</script>

<template>
    <component :is="foundTag.url ? 'a' : 'span'" class="tag-element no-external-icon" :href="foundTag.url" :style="style">
        <img
            v-if="foundTag.iconUrl || foundTag.url"
            :src="getIconUrl()"
            onerror="this.style.display = 'none';"
            alt="icon"
        />
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
    margin-top: 3px;
    display: inline-flex;
    align-items: center;

    @media (prefers-color-scheme: light) {
        box-shadow: 0 0 10px -4px #000;
    }

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
        margin-left: -5px;
        border-radius: 25%;
    }
}
</style>
