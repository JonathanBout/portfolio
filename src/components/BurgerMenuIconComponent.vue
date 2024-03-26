<script setup lang="ts">
defineProps<{
    open: boolean
    animationDuration: string
}>()
</script>

<template>
    <div
        :style="'--animation-duration: ' + (animationDuration ?? '.3s')"
        :class="'toggle-root' + (open ? ' open' : '')"
    >
        <div class="bar a"></div>
        <div class="bar b"></div>
        <div class="bar c"></div>
    </div>
</template>
<style lang="less" scoped>
.toggle-root {
    position: absolute;
    inset: 10px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .bar {
        transition: all var(--animation-duration) linear;
        transform-origin: left;
        width: 100%;
        background-color: var(--color-text);
        flex: 1 1 auto;
        border-radius: 100px;

        &.b {
            transform-origin: center;
        }
    }
}

.toggle-root.open {
    .bar {
        &.a {
            transform: translateX(3px) rotate(45deg) scaleX(1.14);
        }

        &.b {
            transform: scaleX(0);
            opacity: 0;
        }

        &.c {
            transform: translateX(3px) rotate(-45deg) scaleX(1.14);
        }
    }
}
</style>
