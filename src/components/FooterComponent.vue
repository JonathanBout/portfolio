<script setup lang="ts">
const creditsYear = new Date().getFullYear()
</script>

<template>
  <footer>
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
