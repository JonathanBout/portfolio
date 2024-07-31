<script setup lang="ts">
import projectsData from "@/projects"
import GitHubStatsComponent from "@/components/GitHubStatsComponent.vue"
import ProjectComponent from "@/components/ProjectComponent.vue"
</script>
<template>
    <div class="page-root">
        <p class="intro">{{ $t("projects.intro") }}</p>
        <ProjectComponent :project="project" v-for="project in projectsData.projects" :key="project.id" />

        <div class="see-more">
            <a href="https://github.com/jonathanbout?tab=repositories">{{ $t("projects.see-more") }}</a>
        </div>
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

        transition: font-size 0.3s;
        
        &:hover {
            font-size: 1.2em;
        }
    }
}

.page-root {
    animation: scale-in 0.5s;

    &> :not(:last-child) {
        margin-bottom: 2em;
    }
}

@keyframes scale-in {
    from {
        transform: scale(0.9);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
