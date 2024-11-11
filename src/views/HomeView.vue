<script setup lang="ts">
import GitHubStatsComponent from "@/components/GitHubStatsComponent.vue"
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import server from "@/server";

const { t } = useI18n()

let intro = t("home.intro")

// for some reason the page scrolled to the center after reload. This is a workaround to fix that
setTimeout(() => {
    scrollTo(0, 0)
}, 200)

const highlight = (_: unknown, b: unknown) =>
    `<span class="highlight hi${Math.round(Math.random() * 5) + 1}">${b}</span>`

const theme = computed(() => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))

intro = intro.replace(/%(.*?)%/gi, highlight)

const clickCount = ref(0)
const lastClick = ref(Date.now())

const originalUrl = server.getPath("/api/users/jonathan-bout/image", { size: 200 });
const imageUrl = ref(originalUrl)

let resetTimeout: number | null = null

const heading = ref<HTMLHeadingElement>()

const letters = "abcdefghijklmnopqrstuvwxyz0123456789"

const randomString = (length: number) => {
    let result = ""
    for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    return result
}

const fillRandom = (text: string) => {
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") {
            text = text.slice(0, i) + randomString(1) + text.slice(i + 1)
        }
    }
    return text
}

const timeouts: number[] = []

onMounted(() => {
    const text = t("home.greeting")

    // if prefers-reduced-motion is set to reduce, don't animate the heading
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heading.value!.innerText = text
        return
    }

    // animate the heading
    for (let i = 0; i <= text.length * 5; i++) {
        const id = setTimeout(
            () => {
                const slice = text.slice(0, i / 5)
                // add a random highlight to random characters to fill the rest of the text
                // add a <wbr> after each character to allow for word breaks
                const left = fillRandom(text.slice(i / 5)).replace(/([^ ])/g, (a, b) => highlight(a, b))
                heading.value!.innerHTML = slice + left
                // remove from timeouts array
                timeouts.splice(timeouts.indexOf(id), 1)
            },
            i * 7.5 + 250
        )
        timeouts.push(id)
    }
})

onUnmounted(() => {
    if (resetTimeout) {
        clearTimeout(resetTimeout)
    }

    timeouts.forEach((id) => clearTimeout(id))
})

function jump() {
    if (Date.now() - lastClick.value < 1000) {
        clickCount.value += 1
    } else {
        clickCount.value = 1
    }

    lastClick.value = Date.now()

    const img = document.querySelector(".me-image img") as HTMLImageElement
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

    if (clickCount.value > 10 || resetTimeout) {
        imageUrl.value = "/images/ugh.png"

        if (resetTimeout) {
            clearTimeout(resetTimeout)
        }

        resetTimeout = setTimeout(() => {
            imageUrl.value = originalUrl
            resetTimeout = null
        }, 2000)

        clickCount.value = 0
    }
}

function showActualImage() {
    const img = document.querySelector(".me-image img") as HTMLImageElement
    img.style.display = "block"
    ;(img.nextElementSibling! as HTMLElement).style.display = "none"
}

function getSkilliconUrl(skill: string) {
    return server.getPath(`/api/skill-icons/${skill}`, { theme: theme.value })
}
</script>

<template>
    <div class="page-root grow-in custom-animation">
        <div class="stack">
            <div class="me-image" draggable="false">
                <img
                    rel="prefetch"
                    :src="imageUrl"
                    alt="Jonathan Bout"
                    style="display: none"
                    @click="jump"
                    @load="showActualImage"
                />
                <img src="/images/placeholder.svg" />
            </div>
            <div class="me-info">
                <span class="location-marker">
                    <i class="bi bi-geo-alt" />
                    {{ $t("home.country") }}
                    <span class="fi fi-nl" />
                </span>
                <h1 ref="heading" :aria-label="$t('home.greeting')" />
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p class="intro" v-html="intro" />
            </div>
        </div>
        <div class="quick-overview">
            <h2>{{ $t("home.quick-overview.expertise") }}</h2>
            <div class="icons">
                <label>
                    <img alt="C#" :src="getSkilliconUrl(`cs`)" />
                    <span>C#</span>
                </label>
                <label>
                    <img alt="Python" :src="getSkilliconUrl(`py`)" />
                    <span>Python</span>
                </label>
                <label>
                    <img alt="TypeScript" :src="getSkilliconUrl(`ts`)" />
                    <span>Typescript</span>
                </label>
                <label>
                    <img alt="Vue" :src="getSkilliconUrl(`vue`)" />
                    <span>Vue</span>
                </label>
                <label>
                    <img alt="HTML" :src="getSkilliconUrl(`html`)" />
                    <span>HTML</span>
                </label>
                <label>
                    <img alt="CSS" :src="getSkilliconUrl(`css`)" />
                    <span>CSS</span>
                </label>
                <label>
                    <img alt="React" :src="getSkilliconUrl(`react`)" />
                    <span>React</span>
                </label>
            </div>

            <h2>{{ $t("home.quick-overview.toolchain-and-software") }}</h2>
            <div class="icons">
                <label>
                    <img alt="Visual Studio Code" :src="getSkilliconUrl(`vscode`)" />
                    <span>VS&nbsp;Code</span>
                </label>
                <label>
                    <img alt="Visual Studio" :src="getSkilliconUrl(`visualstudio`)" />
                    <span>Visual&nbsp;Studio</span>
                </label>
                <label>
                    <img alt="Docker" :src="getSkilliconUrl(`docker`)" />
                    <span>Docker</span>
                </label>
                <label>
                    <img alt="Git" :src="getSkilliconUrl(`git`)" />
                    <span>Git</span>
                </label>
                <label>
                    <img alt="GitHub" :src="getSkilliconUrl(`github`)" />
                    <span>GitHub</span>
                </label>
                <label>
                    <img alt="Nginx reverse proxy" :src="getSkilliconUrl(`nginx`)" />
                    <span>Nginx</span>
                </label>
                <label>
                    <img alt="Debian linux distro" :src="getSkilliconUrl(`debian`)" />
                    <span>Debian</span>
                </label>
                <label>
                    <img alt="Ubuntu linux distro" :src="getSkilliconUrl(`ubuntu`)" />
                    <span>Ubuntu</span>
                </label>
            </div>
            <h2>
                {{ $t("home.quick-overview.top-langs") }}
            </h2>
            <div class="top-langs">
                <GitHubStatsComponent />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
h1 {
    text-align: start;
    font-family: Code;
    max-width: 100%;
    overflow: hidden;
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

    .location-marker {
        font-size: 0.9em;
    }

    .fi-nl {
        width: 2em;
    }
}

h2 {
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
        gap: 3em;
        margin-top: 1em;

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 3em;
            height: fit-content;

            img {
                width: 3em;
                height: 3em;

                transition: transform 0.3s;

                &:hover {
                    z-index: 100;
                    transform: scale(2);
                }
            }
        }
    }
    .top-langs {
        width: 100%;
        text-align: center;

        animation: slide-y 0.6s ease-out;
    }

    h2:not(:first-child) {
        margin-top: 2em;
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
