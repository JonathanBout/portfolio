<script setup lang="ts">
import { computed, ref, watch } from "vue"

const model = defineModel<string>()

const props = defineProps<{
    minCharacters?: number
    maxCharacters?: number
    required?: boolean
}>()

const characterCount = ref(0)

watch(model, updateCounter)

function updateCounter() {
    characterCount.value = model.value?.length ?? 0
}

const valid = computed(() => {
    if (props.minCharacters && characterCount.value < props.minCharacters) {
        return false
    }

    if (props.maxCharacters && characterCount.value > props.maxCharacters) {
        return false
    }

    return true
})

updateCounter()
</script>
<template>
    <div class="text-area-better" ::valid="valid" ::invalid="(!valid) ? '' : undefined">
        <textarea
            v-model="model"
            :required="required"
            :minlength="minCharacters || undefined"
            :maxlength="maxCharacters || undefined"
        />
        <div :class="valid ? '' : 'invalid'">
            {{ characterCount }}

            <template v-if="minCharacters && characterCount < minCharacters"> / {{ minCharacters }} </template>

            <template v-if="maxCharacters && !(minCharacters && characterCount < minCharacters)">
                / {{ maxCharacters }}
            </template>
        </div>
    </div>
</template>

<style scoped lang="less">
.text-area-better {
    textarea {
        position: relative;
        width: 100%;
    }

    div {
        text-align: right;
        font-size: 0.8em;
        color: #666;
        position: absolute;
        right: 0;
    }

    @media (prefers-color-scheme: dark) {
        ::-webkit-resizer {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-caret-down-fill' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
        }
    }
}

::-webkit-resizer {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-caret-down-fill' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    width: 100%;
}

.invalid.invalid {
    color: var(--color-error);
}
</style>
