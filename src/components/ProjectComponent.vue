<script setup lang="ts">
import type { Project } from "@/projects"
import { inject } from "vue"
import TagComponent from "@/components/TagComponent.vue"

defineProps<{
    project: Project
}>()

const locale = inject("locale") as string
</script>

<template>
    <div class="project">
        <div class="name" v-if="typeof project.name == 'string'">{{ project.name }}</div>
        <div class="name" v-else>{{ (project.name as any)[locale] }}</div>
        <div class="description" v-if="project.description">
            {{ (project.description as any)[locale] }}
        </div>
        <ul class="links">
            <li v-if="project.github">
                <a :href="project.github" :aria-label="$t('projects.view-on-gh', { name: project.name })" target="_blank" class="bi bi-github big no-external-icon"></a>
            </li>
            <li v-if="project.demo">
                <a :href="project.demo" :aria-label="$t('projects.view-demo', { name: project.name })" target="_blank" class="bi bi-box-arrow-up-right big no-external-icon"></a>
            </li>
            <li v-for="tag in project.tags" class="tag" v-bind:key="tag">
                <TagComponent :tag="tag" />
            </li>
        </ul>
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
    .big {
        font-size: 1.5em;
    }
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0;

    .tag {
        display: contents;
    }
}

.preview {
    --inset: 10%;
    .preview-backdrop {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    button {
        position: fixed;
        top: calc(var(--inset) / 4);
        right: calc(var(--inset) / 4);
        z-index: 1000;
    }

    iframe {
        position: fixed;
        width: calc(100% - var(--inset) * 2);
        height: calc(100% - var(--inset) * 2);
        top: var(--inset);
        left: var(--inset);
        z-index: 1000;
        box-shadow: 0 0 10px 10px #000;
    }
}
</style>
