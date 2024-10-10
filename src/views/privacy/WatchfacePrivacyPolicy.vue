<template>
    <div class="page-root custom-animation">
        <h2>
            {{ $t("privacy.message") }}
        </h2>
        <img src="/images/projects/programmer-watchface.png">
    </div>
</template>

<style scoped lang="less">
.page-root {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    text-align: center;
    margin: 1ch;
}

img {
    max-width: 100%;

    border-radius: 100%;
}
</style>
