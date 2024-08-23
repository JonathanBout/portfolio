<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    label: string
    isPassword?: boolean
    type?:
        | "text"
        | "email"
        | "password"
        | "number"
        | "tel"
        | "url"
        | "search"
        | "date"
        | "time"
        | "datetime-local"
        | "month"
        | "week"
        | "color"
    placeholder?: string
    validate?: (value?: string) => boolean
    error: string
}>()

const model = defineModel<string>("")

function validateInput() {
    isValid.value = props.validate ? props.validate(model.value) : true

    return isValid.value
}

const isValid = ref(true)
</script>
<template>
    <label>
        <span>{{ props.label }}</span>
        <input :type="type" v-model="model" @input="validateInput" />
        <span class="error" :class="validateInput() ? 'hidden' : 'visible'">{{ props.error }}</span>
    </label>
</template>
