<script setup lang="ts">
import type { Project } from '@/projects';

defineProps<{
    project: Project
}>()


</script>

<template>
    <div
        class="image-wrapper"
        :style="'--image-count: ' + (project.image ? 1 : project.images ? project.images.length : 0).toString()"
    >
        <img v-if="project.image" class="image" :src="project.image" alt="Project preview" />
        <img v-for="image in project.images" v-else :key="image" class="image" :src="image" alt="Project preview" />
    </div>
</template>

<style lang="less" scoped>
    .image-wrapper {
        overflow: hidden !important;
    }

        /* select an image-wrapper which has at least two children */
        .image-wrapper:has(:not(img:first-child:last-child)):not(:empty) {
            display: flex;
            flex-direction: row;
            overflow: hidden;
            width: fit-content;
            align-items: center;
    
            & > img {
                animation: step infinite steps(calc(var(--image-count)));
                animation-duration: calc(var(--image-count) * 4s);
    
                @media (prefers-reduced-motion: reduce) {
                    animation-duration: 6s;
                }
            }
    
            @keyframes step {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(calc(-100% * var(--image-count)));
                }
            }
        }
</style>