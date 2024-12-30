<script setup lang="ts">
import projectsData from "@/projects"
import ProjectComponent from "@/components/ProjectComponent.vue"
</script>
<template>
    <div class="page-root">
        <p class="intro">
            {{ $t("projects.intro") }}
        </p>
        <div class="projects-list custom-animation">
            <ProjectComponent v-for="project in projectsData.projects" :key="project.id" :project="project" />
        </div>

        <div class="see-more">
            <a href="https://github.com/jonathanbout?tab=repositories">{{ $t("projects.see-more") }}</a>
        </div>
        <p class="maintenance-note">* {{ $t("projects.maintenance-note") }}</p>
    </div>
</template>
<style lang="less" scoped>
.intro {
    text-align: center;
    font-size: 1.1em;
    margin-block-end: 1em;
}
.see-more {
    font-weight: bold;
    font-size: 1.3em;

    a {
        background: linear-gradient(90deg, #ff8a00, rgb(198, 148, 245));
        background-clip: text !important;
        -webkit-text-fill-color: transparent;

        transition: transform 0.3s;
        transform-origin: left center;
        display: inline-block;
        margin-inline: 20px;
        text-align: center;

        &:hover {
            transform: scale(1.1);
        }
    }
}

.page-root {
    & > :not(:last-child) {
        margin-bottom: 2em;
    }

    .projects-list {
        animation: slide-in .1s linear reverse;
    }

    .projects-list > * {
        @supports (animation-timeline: view()) {
            animation: slight-scale linear both;
            transform-origin: top left;
            animation-timeline: view();
            animation-range: 0vh 25vh;

            @media (width < @breakpoint) {
                transform-origin: top center;
            }
        }

        & + * {
            margin-top: 20px;
        }
    }
}

.maintenance-note {
    font-size: 0.8em;
    text-align: center;
}

@keyframes slight-scale {
    from {
        transform: scale(0.5);
    }
}
</style>
