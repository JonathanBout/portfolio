<template>
        <div class="icons">
            <a
                href="https://github.com/jonathanbout"
                class="bi bi-github"
                :aria-label="$t('homePage.github')"
            >
            </a>
            <a
                href="https://linkedin.com/in/jonathanbout"
                class="bi bi-linkedin"
                :aria-label="$t('homePage.linkedin')"
            >
            </a>
        </div>
</template>

<style scoped lang="less">
.icons .bi {
    font-size: 3rem;
    line-height: 3rem;
    display: block;
    transition: all 500ms ease-in-out;
    color: white;
}

.bi-github {
    animation: rainbow-hover 60s linear infinite;

    &:not(:hover) {
        color: var(--color-text) !important;
    }
}

.bi-linkedin:hover {
    color: #0077b5;
    &:after {
        position: absolute;
        inset: 10px;
        background-color: white;
    }
}

.icons {
    display: flex;
    flex-direction: row;

    gap: 20px;
}
</style>
