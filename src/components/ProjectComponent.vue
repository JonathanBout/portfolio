<script setup lang="ts">
import type { Project } from "@/projects"
import { computed, inject } from "vue"
import TagComponent from "@/components/TagComponent.vue"
import { useI18n } from "vue-i18n"
import { formatDate } from "@/localizer/dates"
import type { Locale } from "@/localizer"

const props = defineProps<{
    project: Project
}>()

const {
    t,
    locale: { value: lang }
} = useI18n()

const locale = inject("locale") as string

const timeframeText = computed(() => {
    const { start, end } = props.project.timeframe ?? {}

    const startString = formatDate(start, lang as Locale, false, false)
    const endString = end == "present" ? t("projects.present") : formatDate(end, lang as Locale, false, false)

    if (start && end && end != "present") {
        return startString + " - " + endString
    } else if (start && !end) {
        return startString
    } else if (start) {
        return startString + " - " + t("projects.present")
    }

    return ""
})

const projectName = computed(() => {
    if (typeof props.project.name === "string") {
        return props.project.name
    }

    return (props.project.name as any)[locale]
})
</script>

<template>
    <a class="project no-external-icon" :href="project.url" target="_blank">
        <div class="image-wrapper">
            <img class="image" v-if="project.image" :src="project.image" alt="Project preview" />
        </div>
        <div class="vertical-stack">
            <div class="name">{{ projectName }}</div>
            <div class="description" v-if="project.description">
                {{ (project.description as any)[locale] }}
            </div>
            <ul class="links">
                <li v-if="project.github">
                    <a
                        :href="project.github"
                        :aria-label="$t('projects.view-on-gh', { name: projectName })"
                        target="_blank"
                        class="bi bi-github big no-external-icon"
                    ></a>
                </li>
                <li v-if="project.demo">
                    <a
                        :href="project.demo"
                        :aria-label="$t('projects.view-demo', { name: projectName })"
                        target="_blank"
                        class="bi bi-box-arrow-up-right big no-external-icon"
                    ></a>
                </li>
                <li v-if="project.playStore">
                    <a
                        :href="project.playStore"
                        :aria-label="$t('projects.view-on-play-store', { name: projectName })"
                        target="_blank"
                        class="bi bi-google-play big no-external-icon"
                    ></a>
                </li>
                <li v-for="tag in project.tags" class="tag" v-bind:key="tag">
                    <TagComponent :tag="tag" />
                </li>
            </ul>
            <div class="timeframe" v-if="project.timeframe">
                {{ timeframeText }}
            </div>
        </div>
    </a>
</template>
<style lang="less" scoped>
.project {
    display: flex;
    align-items: stretch;
    flex-direction: row;

    & > .vertical-stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    & > .image-wrapper {
        height: fit-content;
        align-self: center;
        max-width: 25%;
        border-radius: 10px;

        & > img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
    }

    gap: 10px;
    border-radius: 30px;

    padding: 20px;

    @media (width > @breakpoint) {
        &:nth-child(2n) {
            flex-direction: row-reverse;
        }
    }

    @media (width <= @breakpoint) {
        flex-direction: column;
        border: 1px solid @border-color;

        & > .image-wrapper {
            align-self: center;
            display: flex;
            align-items: start;
            max-width: 300px;
            flex-grow: 1;
            overflow-y: visible;
            max-height: 200px;
        }

        & > .vertical-stack {
            background: linear-gradient(
                to bottom,
                transparent,
                rgb(from var(--color-background) r g b / 0.5) 5%,
                var(--color-background) 25%
            );
        }
    }

    * + & {
        border-top: 1px solid var(--color-text);
        margin-top: 20px;
        padding-top: 10px;
    }

    &:hover {
        outline: 1px solid var(--color-primary-button);
        filter: brightness(1.1);
        text-decoration: initial;
        transform: scale(1.01);
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
        display: flex;
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

.timeframe {
    font-family: Code;
}
</style>
