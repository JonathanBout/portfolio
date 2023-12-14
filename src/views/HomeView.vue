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
  animation: rainbow-colors 60s linear infinite;
  transition: color 10s ease-in-out;

  &:not(:hover) {
    color: var(--color-text) !important;
  }
}

@keyframes rainbow-colors {
  0% {
    color: #ff0000;
  }
  10% {
    color: #ff8000;
  }
  20% {
    color: #ffff00;
  }
  30% {
    color: #80ff00;
  }
  40% {
    color: #00ff00;
  }
  50% {
    color: #00ff80;
  }
  60% {
    color: #00ffff;
  }
  70% {
    color: #0080ff;
  }
  80% {
    color: #0000ff;
  }
  90% {
    color: #8000ff;
  }
  100% {
    color: #ff0000;
  }
}
</style>
