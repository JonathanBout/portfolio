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
        <div class="language-display" translate="no">
            <span>{{ $t("language.availableLocaleMessage") }}</span>
            <br />
			<ul>
				<li>
					<!-- @vue-expect-error property does not exist on type ... -->
					<button :class="'link no-external-icon' + (locale === 'en' ? ' current' : '')" @click="$updateLocale('en')">
					{{ $t("language.en") }}
					</button>
				</li>
				<li>
					<!-- @vue-expect-error -->
					<button :class="'link no-external-icon' + (locale === 'nl' ? ' current' : '')" @click="$updateLocale('nl')">
						{{ $t("language.nl") }}
					</button>
				</li>
			</ul>
        </div>
        <div class="links separated">
            <span>&copy; {{ creditsYear }} Jonathan Bout</span>
            <span>
                <a href="https://github.com/jonathanbout/portfolio">
                    {{ $t("footer.view-on-gh") }}
                </a>
            </span>
        </div>
    </footer>
</template>

<style scoped lang="less">
.credits,
.language-display > button,
.links {
    text-align: center;
    font-size: 0.9em;

    @media (pointer: coarse) {
        line-height: 48px;
    }
}

.links {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    justify-content: safe center;

    --padding-size: 20px;

    padding-inline: var(--padding-size);
    * {
        text-wrap: nowrap;
    }

    &::before {
        position: sticky;
        content: "_";
        color: transparent;
        left: calc(var(--padding-size) * -1);
        top: 0;
        width: var(--padding-size);
        height: 100%;
        z-index: 10;
        background: linear-gradient(90deg, var(--color-background) 0%, transparent 100%);
    }

    &::after {
        position: sticky;
        content: "_";
        color: transparent;
        right: calc(var(--padding-size) * -1);
        top: 0;
        width: var(--padding-size);
        height: 100%;
        z-index: 10;
        background: linear-gradient(-90deg, var(--color-background) 0%, transparent 100%);
    }
}

.language-display {
	ul, li {
		list-style: none;
		padding: 0;
	}
    button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 0.9em;
        margin-inline: 5px;
    }
}
.version {
    position: absolute;
    bottom: 0;
    right: 0;
    width: fit-content;
    margin: 0;
    padding: 0;
    font-size: 0.6em;
    text-align: end;
}

footer {
    padding-block: 3em;
    border-top: 1px solid #8888;
	@media (prefers-color-scheme: light) {
		--color-background: white;
		--color-text: black;
	}
	@media (prefers-color-scheme: dark) {
		--color-background: #161611;
		--color-text: white;
	}
	color: var(--color-text);
	background-color: var(--color-background);
}
</style>
