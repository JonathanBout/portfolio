<template>
  <main>
    <h1 class="error-code">404</h1>
    <a href="/">{{ $t("errorPage.back") }}</a>
    <a href="/">{{ $t("home") }}</a>
  </main>
</template>
<style lang="less">
.error-code {
  font-family: "Cascadia Code", "Cascadia Mono", "Consolas", monospace;
}
</style>
