<template>
  <main>
    <span>
      <a href="https://github.com/jonathanbout" class="bi bi-github no-color fun-thing"> </a>
    </span>
  </main>
</template>

<style scoped lang="less">
.fun-thing {
  font-size: 3rem;
  line-height: 3rem;
  display: block;
  animation: rainbow-hover 60s linear infinite;
  transition: color 10s ease-in-out;

  &:not(:hover) {
    color: var(--color-text) !important;
  }
}
</style>
