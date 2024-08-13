<template>
    <div class="spinner-root">
        <template v-for="n in 10" v-bind:key="n">
            <div :style="'--animation-delay: ' + (n - 1) * 0.06 + 's'" class="no-load-animation"></div>
        </template>
    </div>
</template>

<style lang="less" scoped>
@element-height: 20px;

.spinner-root {
    :deep(*) {
        --element-height: @element-height;
    }
    width: 100%;
    height: @element-height;

    display: flex;
    justify-content: center;
    align-items: center;

    div {
        width: @element-height;
        height: @element-height;
        background-color: var(--color-text);
        border-radius: 10px;
        animation: loader 0.5s linear infinite;
        animation-delay: var(--animation-delay, 1s);
    }

    @keyframes loader {
        0% {
            transform: translateX(-5px);
        }
        10% {
            transform: translateX(@element-height);
            background-color: var(--color-accent);
        }
        100% {
            transform: translateX(-5px);
        }
    }
}
</style>
