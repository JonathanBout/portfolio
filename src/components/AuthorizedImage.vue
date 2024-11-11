<script setup lang="ts">
import type { Route } from "@/server"
import server from "@/server"
import axios from "axios"
import { defineProps, ref, type ImgHTMLAttributes, type Ref, type VNodeRef } from "vue"

const props = defineProps<{
    src: Route
    alt: string
}>()

const image = ref<HTMLImageElement>()

server.getBlob(props.src).then((blob) => {
    if (!image.value) {
        return
    }
    image.value.src = blob
})
</script>

<template>
    <img ref="image" />
</template>
