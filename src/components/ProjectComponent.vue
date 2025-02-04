<script setup lang="ts">
import type { Project } from "@/projects"
import { computed } from "vue"
import TagComponent from "@/components/TagComponent.vue"
import ProjectImageComponent from "@/components/ProjectImageComponent.vue"
import { useI18n } from "vue-i18n"
import { formatDate } from "@/localizer/dates"
import { localize, currentLocale } from "@/localizer"

const props = defineProps<{
    project: Project
}>()

const { t } = useI18n()

const timeframeText = computed(() => {
    const { start, end } = props.project.timeframe ?? {}

    let includeYear = true

    if (typeof end != "string" && end && start) {
        includeYear = start.getFullYear() != end.getFullYear()
    }

    const startString = formatDate(start, currentLocale.value, false, false, true, includeYear)
    const endString =
        end == "present" || end == "maintenance"
            ? t("projects.present")
            : formatDate(end, currentLocale.value, false, false, true, true)

    if (start && end && end != "present") {
        return startString + " - " + endString
    } else if (start && !end) {
        return startString
    } else if (start) {
        return startString + " - " + t("projects.present")
    }

    return ""
})

const isMaintenance = computed(() => props.project.timeframe?.end == "maintenance")

const projectName = computed(() => {
    if (typeof props.project.name === "string") {
        return props.project.name
    }

    return localize(props.project.name)
})
</script>

<template>
    <component
        :is="project.url ? 'a' : 'div'"
        class="project no-external-icon"
        :href="project.url"
        target="_blank"
        :id="project.id"
    >
        <ProjectImageComponent :project="project" />
        <div class="vertical-stack">
            <div class="name">
                {{ projectName }}
            </div>
            <div v-if="project.description" class="description">
                {{ localize(project.description) }}
            </div>
            <ul class="links">
                <li v-for="iconLink in [...(project.iconLinks ?? [])].sort((a, b) => a.bootstrapIcon.localeCompare(b.bootstrapIcon))" :key="iconLink.bootstrapIcon">
                    <a
                        :title="$t(iconLink.ariaLabel, { name: projectName })"
                        :href="iconLink.url"
                        :aria-label="$t(iconLink.ariaLabel, { name: projectName })"
                        target="_blank"
                        class="bi"
                        :class="'bi bi-' + iconLink.bootstrapIcon + ' big no-external-icon'"
                    />
                </li>
                <li v-for="tag in project.tags" :key="tag" class="tag">
                    <TagComponent :tag="tag" />
                </li>
            </ul>
            <div v-if="project.timeframe" class="timeframe">
                {{ timeframeText }}
                <template v-if="isMaintenance">
                    (<abbr :title="$t('projects.maintenance-note')"> {{ $t("projects.maintenance") }} </abbr>)
                </template>
            </div>
        </div>
    </component>
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

    :deep(.image-wrapper) {
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

    text-decoration: initial;
    cursor: default;
    &[href]:hover {
        outline: 1px solid var(--color-primary-button);
        filter: brightness(1.1);
        transform: scale(1.01);
        cursor: pointer;
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

.timeframe {
    font-family: Code;
}
</style>
