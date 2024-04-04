<script setup lang="ts">
import projectsData from "@/projects"
import GitHubStatsComponent from "@/components/GitHubStatsComponent.vue"
import ProjectComponent from "@/components/ProjectComponent.vue"
</script>
<template>
    <div class="page-root">
        <p class="intro">{{ $t("projects.intro") }}</p>
        <ProjectComponent :project="project" v-for="project in projectsData.projects" :key="project.id" />
        <br />
        <hr />
        <h2 class="github-stats-text">{{ $t("projects.github-stats.text") }}</h2>
        <GitHubStatsComponent />

        <div class="see-more">
            <a href="https://github.com/jonathanbout">{{ $t("projects.see-more") }}</a>
        </div>
    </div>
</template>
<style lang="less" scoped>
.intro {
    text-align: center;
    font-size: 1.1em;
}
.see-more {
    display: flex;
    justify-content: safe center;
    align-items: safe center;
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 1.3em;
}
</style>
