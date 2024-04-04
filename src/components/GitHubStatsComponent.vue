<script setup lang="ts">
import { Stats, TopLanguage, getStats } from "@/stats"
import { ref } from "vue"

const stats = ref(new Stats())

getStats().then((s) => {
    stats.value = s
})

let _totalSize: number | null = null

function getTotalSize() {
    return (_totalSize ??= stats.value.topLanguages.totalSize())
}

function getCSS(topLanguage: TopLanguage) {
    return `--lang-size: ${topLanguage.size}; --lang-color: rgb(${topLanguage.color.values.join(
        ", "
    )}); --lang-contrast-color: ${topLanguage.textColor.toCSSColorString()};`
}

function getPercentageString(topLanguage: TopLanguage) {
    return ((topLanguage.size / getTotalSize()) * 100).toString().slice(0, 4) + "%"
}

function getTotalSizeCSS() {
    const size = getTotalSize()
    return `--total-lang-size: ${size};`
}
</script>

<template>
    <div class="github-stats">
        <template v-if="stats.topLanguages.length > 0">
            <h3>{{ $t("projects.github-stats.top-languages") }}</h3>
            <div class="percentage-bar" :style="getTotalSizeCSS()">
                <div
                    :style="getCSS(stat)"
                    v-for="stat in stats.topLanguages"
                    :key="stat.name"
                    :data-lang-name="stat.name"
                    :data-lang-percentage="getPercentageString(stat)"
                    tabindex="0"
                >
                    <span>{{ stat.name }}</span>
                    <span>{{ getPercentageString(stat) }}</span>
                </div>
            </div>
        </template>
        <template v-else-if="stats.error">
            <div>{{ $t("projects.github-stats.error") }}</div>
        </template>
        <template v-else>
            <div>{{ $t("projects.github-stats.loading") }}</div>
        </template>
    </div>
</template>
<style lang="less">
.percentage-bar {
    width: 100%;
    height: 20px;
    display: flex;

    div {
        color: var(--lang-contrast-color);
        transition: height 0.3s, transform 0.3s;
        height: 100%;
        flex-basis: calc(var(--lang-size) / var(--total-lang-size) * 100%);
        background-color: var(--lang-color);
    }

    @media (width <= 600px) or (hover: none) {
        height: max-content;
        flex-direction: column;
        position: relative;
        overflow-x: auto;
        margin: auto;
        max-width: 500px;
        div {
            flex-basis: calc(20px + var(--lang-size) / var(--total-lang-size) * 100px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-inline: 20px;
            min-width: fit-content;

            &:first-child {
                border-radius: 5px 5px 0 0;
            }

            &:last-child {
                border-radius: 0 0 5px 5px;
            }

            span::after {
                content: " - " calc(var(--lang-size) / var(--total-lang-size));
            }
        }
    }

    @media (width > 600px) and (hover: hover) {
        div {
            span {
                display: none;
            }

            &::before,
            &::after {
                transform-origin: bottom center;
                position: absolute;
                right: 0;
                background-color: var(--lang-color);
                opacity: 0;
            }

            &::after {
                content: attr(data-lang-name) " - " attr(data-lang-percentage);
                top: calc(-100% - 10px);
                height: fit-content;
                width: fit-content;
                padding-inline: 5px;
                text-align: center;
                text-wrap: nowrap;
                border-radius: 5px;
            }

            &::before {
                content: "";
                top: -100%;
                width: 100%;
                height: 100%;
                max-width: 10px;
            }

            &:hover,
            &:focus-visible {
                filter: brightness(1.2);
                z-index: 100;

                &::after,
                &::before {
                    animation: slide-up 0.3s;
                    opacity: 1;
                }
            }
        }
    }
    @keyframes slide-up {
        from {
            opacity: 0;
            transform: translateY(100%) scaleY(0);
        }
        to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
        }
    }
}
</style>
