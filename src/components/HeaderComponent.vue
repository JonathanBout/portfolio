<script setup lang="ts">
import { ref } from "vue"

let menuOpen = ref(false)

function toggleMenu() {
    menuOpen.value = !menuOpen.value
}
</script>
<template>
    <nav>
        <button class="menu-toggle" v-on:click="toggleMenu">Menu</button>
        <a href="/" class="site-title"> Jonathan Bout </a>
        <ul :class="menuOpen ? 'opened' : 'closed'">
            <li>
                <a href="/projects">{{ $t("header.projects") }}</a>
            </li>
        </ul>
    </nav>
</template>
<style lang="less" scoped>
nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    text-align: center;
}

ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;

    align-items: safe center;
    justify-content: safe center;
    flex-wrap: wrap;
}
.menu-toggle {
    display: none;
}

@media (height < 600px) {
    ul {
        transition: transform 0.3s ease-in-out;
        &.opened {
            transform: translateY(0px);
        }

        &.closed {
            transform: translateY(-100vh);
        }
    }
    .menu-toggle {
        display: block;
    }
}

.site-title {
    font-size: 1.5em;
}

li {
    display: flex;
    align-items: center;
}
</style>
