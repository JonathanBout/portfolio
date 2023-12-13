<script setup lang="ts"></script>

<template>
  <main>
    <span>
      <a href="https://github.com/jonathanbout" class="no-color fun-thing">
        <i class="bi bi-github"></i>
      </a>
    </span>
  </main>
</template>

<style scoped lang="less">
.fun-thing {
  font-size: 3rem;
  outline: 1px solid transparent;

  &:hover {
    /* animate to begin scaling up and down */
    animation: fun-thing 1s ease-in-out infinite;
  }
}

@keyframes fun-thing {
  0% {
    font-size: 3rem;
  }
  50% {
    font-size: 20rem;
  }
  100% {
    font-size: 3rem;
  }
}
</style>
