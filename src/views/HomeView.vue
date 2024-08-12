<script setup lang="ts">
import GitHubStatsComponent from "@/components/GitHubStatsComponent.vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

let intro = t("home.intro")

// for some reason the page scrolled to the center after reload. This is a workaround to fix that
setTimeout(() => {
    scrollTo(0, 0)
}, 200)

const highlight = (_: any, b: any) => `<span class="highlight hi${Math.round(Math.random() * 5) + 1}">${b}</span>`

intro = intro
.replace(/%(.*?)%/gi, highlight)

const clickCount = ref(0)
const lastClick = ref(Date.now())

function jump() {
    const img = document.querySelector(".me-image img") as HTMLImageElement

    if (Date.now() - lastClick.value < 1000) {
        clickCount.value += 1
    } else {
        clickCount.value = 1
    }

    lastClick.value = Date.now()

    // animate a jump
    img.animate(
        [
            { transform: "translateY(0) rotate(-10deg)" },
            { transform: "translateY(-50px) rotate(10deg)" },
            { transform: "translateY(0)" },
            { transform: "translateY(-40px)" },
            { transform: "translateY(0) rotate(5deg)" },
            { transform: "translateY(-30px)" },
            { transform: "translateY(0) rotate(0)" }
        ],
        {
            duration: 500,
            easing: "ease-out",
            iterations: 1
        }
    )

    if (clickCount.value > 10) {
        const originalUrl = img.src
        img.src = "/images/ugh.png"

        setTimeout(() => {
            img.src = originalUrl
        }, 2000)

        clickCount.value = 0
    }
}

function showActualImage() {
    const img = document.querySelector(".me-image img") as HTMLImageElement
    img.style.display = "block"
    ;(img.nextElementSibling! as HTMLElement).style.display = "none"
}
</script>

<template>
    <div class="page-root grow-in">
        <div class="stack">
            <div class="me-image" draggable="false">
                <img
                    rel="prefetch"
                    @click="jump"
                    src="https://gravatar.com/avatar/be19bd79a37e5f322b7a1898a1147127?size=512"
                    alt="Jonathan Bout"
                    v-on:load="showActualImage"
                    style="display: none"
                />
                <img src="/images/placeholder.svg" />
            </div>
            <div class="me-info">
                <h2><i class="bi bi-geo-alt"></i> {{ $t("home.country") }} <span class="fi fi-nl"></span></h2>
                <h1>{{ $t("home.greeting") }}</h1>
                <p class="intro" v-html="intro"></p>
            </div>
        </div>
        <div class="quick-overview">
            <h3>{{ $t("home.quick-overview") }}</h3>
            <div class="icons">
                <label>
                    <img src="https://skillicons.dev/icons?i=cs" />
                    <span>C#</span>
                </label>
                <label>
                    <img src="https://skillicons.dev/icons?i=py" />
                    <span>Python</span>
                </label>
                <label>
                    <img src="https://skillicons.dev/icons?i=ts" />
                    <span>Typescript</span>
                </label>
                <label>
                    <img src="https://skillicons.dev/icons?i=vue" />
                    <span>Vue</span>
                </label>
                <label>
                    <img src="https://skillicons.dev/icons?i=html" />
                    <span>HTML</span>
                </label>
                <label>
                    <img src="https://skillicons.dev/icons?i=css" />
                    <span>CSS</span>
                </label>
            </div>
        </div>
        <div class="top-langs">
            <h2 class="top-langs-text">{{ $t("home.top-langs-title") }}</h2>
            <GitHubStatsComponent />
        </div>
    </div>
</template>

<style scoped lang="less">


h1 {
    text-align: start;
}

.page-root {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.me-image {
    @media (width > @breakpoint) {
        animation: image-horizontal 0.5s ease-in-out;
    }

    @media (width <= @breakpoint) {
        animation: image-vertical 0.5s ease-in-out;
    }
    img {
        border-radius: 100vmax;
        margin: 0 auto;
        display: block;

        aspect-ratio: 1;
        width: 200px;

        user-select: none;

        -webkit-user-drag: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
}

.me-info {
    &,
    * {
        width: fit-content;
    }

    &:deep(.highlight) {
        .text-gradient(@from, @to) {
            background-clip: text !important;
            -webkit-text-fill-color: transparent;
            background: linear-gradient(90deg, @from, @to);
        }

        @media (prefers-color-scheme: dark) {
            &.hi1 {
                .text-gradient(#f9d423, #ff7577);
            }
            &.hi2 {
                .text-gradient(#ee82ff, #95f8ff);
            }
            &.hi3 {
                .text-gradient(#a8ff78, #78ffd6);
            }
            &.hi4 {
                .text-gradient(rgb(255, 130, 213), #ff4e50);
            }

            &.hi5 {
                .text-gradient(#dabeef, #faa);
            }

            &.hi6 {
                .text-gradient(#ea00ff, #acce55);
            }
        }

        @media (prefers-color-scheme: light) {
            &.hi1 {
                .text-gradient(#837220, #9c2729);
            }
            &.hi2 {
                .text-gradient(#ad24c2, #339aa1);
            }
            &.hi3 {
                .text-gradient(#53992e, #309174);
            }
            &.hi4 {
                .text-gradient(rgb(199, 0, 133), #a7282a);
            }

            &.hi5 {
                .text-gradient(#553b69, rgb(121, 93, 93));
            }

            &.hi6 {
                .text-gradient(#451349, #0c4b0f);
            }
        }
    }

    .bi-geo-alt {
        margin-right: 0.5ch;
    }

    h2 {
        font-size: 0.9em;
    }

    .fi-nl {
        width: 2em;
    }
}

h3 {
    font-size: 1.6em;
    text-align: center;
}

.stack {
    gap: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 2em;

    animation: scale-xy 0.5s;

    @media (width >= @breakpoint) {
        flex-direction: row;
    }
}

.quick-overview {
    animation: slide-y 0.5s ease-out;
    animation-fill-mode: forwards;

    .icons {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1em;
        margin-top: 1em;

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5em;

            img {
                width: 3em;
                height: 3em;

                transition: transform 0.3s;

                &:hover {
                    transform: scale(1.3);
                }
            }
        }
    }
}

.top-langs {
    width: 100%;
    text-align: center;

    animation: slide-y 0.6s ease-out;

    .top-langs-text {
        margin-top: 1em;
    }
}

@keyframes scale-xy {
    from {
        scale: 0;
    }
    to {
        scale: 1;
    }
}

@keyframes slide-y {
    from {
        transform: translateY(100dvh);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes image-horizontal {
    from {
        transform: translateX(-50vw);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes image-vertical {
    from {
        transform: translateY(-50vh);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
