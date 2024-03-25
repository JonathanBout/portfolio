<script setup lang="ts">
import projectsData from "@/assets/projects"
import ProjectComponent from "@/components/ProjectComponent.vue"
</script>
<template>
    <div class="page-root">
        <h1>{{ $t("projects.title") }}</h1>
        <div class="intro">{{ $t("projects.intro") }}</div>
        <ProjectComponent :project="project" v-for="project in projectsData.projects" :key="project.id" />
        <div class="see-more">
            <a href="https://github.com/jonathanbout">{{ $t("projects.see-more") }}</a>
        </div>
    </div>
</template>
<style lang="less" scoped>
.intro {
    text-align: center;
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
