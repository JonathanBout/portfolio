<script setup lang="ts">
import projectsData from "@/projects"
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

        transition: transform 0.3s;
        transform-origin: left center;
        display: inline-block;
        margin-left: 20px;
        
        &:hover {
            transform: scale(1.1);
        }
    }
}

.page-root {
    animation: scale-in 0.5s;

    * {
        animation: slide-in 0.5s ease-in-out;
    }

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

@keyframes slide-in {
    from {
        transform: translateY(50dvh);
    }

    to {
        transform: translateY(0);
    }
}
</style>
