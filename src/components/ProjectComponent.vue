<script setup lang="ts">
import type { Project } from "@/assets/projects"
import { defineProps, inject } from "vue"
import TagComponent from "@/components/TagComponent.vue"

const props = defineProps<{
    project: Project
}>()

const locale = inject("locale") as string
</script>

<template>
    <div class="project">
        <div class="name">{{ props.project.name }}</div>
        <div class="description">{{ (project.description as any)[locale] }}</div>
        <div class="links">
            <span v-if="project.github">
                <a :href="project.github" target="_blank" class="bi bi-github"></a>
            </span>
            <span v-if="project.demo">
                <a :href="project.demo" target="_blank" class="bi bi-box-arrow-up-right"></a>
            </span>
        </div>
        <div class="tags">
            <template v-for="tag in project.tags" v-bind:key="tag">
                <TagComponent :tag="tag" />
            </template>
        </div>
    </div>
</template>
<style lang="less" scoped>
.project {
    display: flex;
    flex-direction: column;
    gap: 10px;

    * + & {
        border-top: 1px solid var(--color-text);
        margin-top: 20px;
        padding-top: 10px;
    }
}

.name {
    font-size: 1.5em;
    font-weight: bold;
}

.description {
    font-size: 1.2em;
}

.links {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
}
</style>
