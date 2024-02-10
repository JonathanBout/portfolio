<script setup lang="ts">
import { inject } from "vue"
import { RouterView } from "vue-router"

const creditsYear = new Date().getFullYear()

const locale = inject("locale")
</script>

<template>
  <header>
    <a href="/"> Jonathan Bout </a>
    <a href="/test"> Jonathan Bout </a>
    <a href="/"> Jonathan Bout </a>
  </header>
  <RouterView />
  <footer>
    <p class="credits">&copy; {{ creditsYear }} Jonathan Bout</p>
    <p class="language-display">
      <button :class="locale === 'en' ? 'current' : ''" @click="$updateLocale('en')">
        {{ $t("language.en") }}
      </button>
      <button :class="locale === 'nl' ? 'current' : ''" @click="$updateLocale('nl')">
        {{ $t("language.nl") }}
      </button>
    </p>
  </footer>
</template>

<style scoped lang="less">
.credits,
.language-display {
  font-family: "Cascadia Code", "Cascadia Mono", "Consolas", monospace;
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
