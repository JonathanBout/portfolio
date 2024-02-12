<script setup lang="ts">
import { inject } from "vue"
const creditsYear = new Date().getFullYear()

const locale = inject("locale")
</script>

<template>
    <p class="credits">&copy; {{ creditsYear }} Jonathan Bout</p>
    <p class="language-display">
        <!-- @vue-expect-error property does not exist on type ... -->
        <button :class="locale === 'en' ? 'current' : ''" @click="$updateLocale('en')">
            {{ $t("language.en") }}
        </button>
        <!-- @vue-expect-error -->
        <button :class="locale === 'nl' ? 'current' : ''" @click="$updateLocale('nl')">
            {{ $t("language.nl") }}
        </button>
    </p>
</template>

<style scoped lang="less">
.credits,
.language-display {
    text-align: center;
    font-size: 1em;
}

.language-display {
    font-size: 0.6em;

    button {
        border: none;
        background: none;
        cursor: pointer;

        &.current {
            font-weight: bold;
        }

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
