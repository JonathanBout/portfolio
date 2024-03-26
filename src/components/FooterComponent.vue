<script setup lang="ts">
import { inject } from "vue"
const creditsYear = new Date().getFullYear()

defineProps<{
    inert: boolean
}>()

const locale = inject("locale")
</script>

<template>
    <footer class="monospace" :inert="inert">
        <p class="language-display">
            <!-- @vue-expect-error property does not exist on type ... -->
            <button :class="'link' + (locale === 'en' ? ' current' : '')" @click="$updateLocale('en')">
                {{ $t("language.en") }}
            </button>
            <!-- @vue-expect-error -->
            <button :class="'link' + (locale === 'nl' ? ' current' : '')" @click="$updateLocale('nl')">
                {{ $t("language.nl") }}
            </button>
        </p>
        <p class="links separated">
            <span>&copy; {{ creditsYear }} Jonathan Bout</span>
            <span>
                <a :aria-label="$t('footer.projectGitHub')" href="https://github.com/jonathanbout/portfolio">
                    {{ $t("footer.view-on-gh") }}
                </a>
            </span>
        </p>
    </footer>
</template>

<style scoped lang="less">
footer {
    background: linear-gradient(180deg, transparent, #0005);
}

.credits,
.language-display,
.links {
    text-align: center;
    font-size: 0.9em;
}

.links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.language-display {
    font-size: 0.6em;

    button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1.5em;
        margin-inline: 5px;

        &.current {
            display: none;
        }
    }
}
</style>
