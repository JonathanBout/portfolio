<script setup lang="ts">
import type { Project } from "@/assets/projects"
import { inject, ref } from "vue"
import TagComponent from "@/components/TagComponent.vue"

const props = defineProps<{
    project: Project
}>()

const locale = inject("locale") as string

const showPreview = ref(false)
</script>

<template>
    <div class="project">
        <div class="preview" v-if="showPreview && project.demo && project.allowPreview">
            <div class="preview-backdrop"></div>
            <button @click="showPreview = !showPreview" class="bi bi-x"></button>
            <iframe :src="project.demo" frameborder="0"></iframe>
        </div>

        <div class="name" v-if="typeof project.name == 'string'">{{ project.name }}</div>
        <div class="name" v-else>{{ (project.name as any)[locale] }}</div>
        <div class="description" v-if="project.description">
            {{ (project.description as any)[locale] }}
        </div>
        <div class="links">
            <span v-if="project.github">
                <a :href="project.github" target="_blank" class="bi bi-github"></a>
            </span>
            <span v-if="project.demo">
                <a :href="project.demo" target="_blank" class="bi bi-box-arrow-up-right"></a>
            </span>
            <span v-if="project.demo">
                <button class="link" v-if="project.allowPreview" @click="showPreview = !showPreview">
                    {{ $t("projects.open-preview") }}
                </button>
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
