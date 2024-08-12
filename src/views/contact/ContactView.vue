<script setup lang="ts">
import { ref, watch } from "vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import TextAreaInput from "@/components/TextAreaInput.vue"

const WEB3FORMS_PUBLIC_KEY = "e1930f85-db30-440e-93a5-c8d64e0bd133"

const infoData = { email: `<a href="mailto:me@jonathanbout.com">me@jonathanbout.com</a>` }

const input = ref({ name: "", email: "", message: "", honey: "" })
const error = ref({ name: false, email: false, message: false })

// 0 = initial, 1 = sending, 2 = sent, 3 = error
const phase = ref(0)

watch(
    input,
    () => {
        localStorage.setItem("contact-form-entry", JSON.stringify(input.value))
    },
    { deep: true }
)

watch(phase, () => {
    if (phase.value === 0) {
        error.value = { name: false, email: false, message: false }
    } else if (phase.value === 2) {
        input.value = { name: "", email: "", message: "", honey: "" }
        sessionStorage.setItem("contact-form", Date.now().toString())
    }
})

const stored = localStorage.getItem("contact-form-entry")

if (stored) {
    Object.assign(input.value, JSON.parse(stored))
}

async function submitForm() {
    error.value = { name: false, email: false, message: false }

    let valid = true

    if (!input.value.name || input.value.name.length < 3) {
        error.value.name = true
        valid = false
    }

    if (!input.value.email || !input.value.email.match(/.+@.+/) || input.value.email.length < 3) {
        error.value.email = true
        valid = false
    }

    if (!input.value.message || input.value.message.length < 10 || input.value.message.length > 4096) {
        error.value.message = true
        valid = false
    }

    if (!valid) {
        return
    }

    if (input.value.honey) {
        input.value.message = `!! This message was likely sent by a bot !!
        
        Honey:
        ${input.value.honey}

        Original message:
        ${input.value.message}`
    }

    phase.value = 1

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_PUBLIC_KEY,
            subject: `New contact request from ${location.hostname}`,
            ...input.value
        })
    })

    const result = await response.json()

    if (result.success) {
        console.log(result)
        phase.value = 2
    } else {
        console.error(result)
        phase.value = 3
    }
}

function resetForm() {
    input.value = { name: "", email: "", message: "", honey: "" }
    error.value = { name: false, email: false, message: false }
    phase.value = 0
}
</script>

<template>
    <div class="page-root">
        <h1>{{ $t("contact.title") }}</h1>
        <template v-if="phase === 0 || phase === 3">
            <div v-if="phase === 3" class="error">{{ $t("contact.error") }}</div>
            <p v-html="$t('contact.description', infoData)"></p>
            <form @submit.prevent="submitForm" @reset.prevent="resetForm">
                <div class="form-body">
                    <label for="name">
                        <span>
                            {{ $t("contact.name") }}
                        </span>
                        <input type="text" name="name" v-model="input.name" />
                        <span class="error" v-if="error.name">{{ $t("contact.name-error") }}</span>
                    </label>
                    <label for="email"
                        ><span>
                            {{ $t("contact.email") }}
                        </span>
                        <input type="text" name="email" v-model="input.email" />
                        <span class="error" v-if="error.email">{{ $t("contact.email-error") }}</span>
                    </label>
                    <label for="message">
                        <span>
                            {{ $t("contact.message") }}
                        </span>
                        <text-area-input v-model="input.message" :max-characters="4096" :min-characters="10" />
                        <span class="error" v-if="error.message">{{ $t("contact.message-error") }}</span>
                    </label>
                    <label for="the-yummy-honey" class="yummy-honey">
                        <span>
                            Do you want some yummy honey, little bot? 🍯 I have it right here for you, fresh from the
                            hive! Don't forget to include it in your message! 🐝
                        </span>
                        <input
                            type="text"
                            name="the-yummy-honey"
                            tabindex="-1"
                            autocomplete="off"
                            v-model="input.honey"
                        />
                    </label>
                </div>
                <div class="buttons">
                    <button type="reset" id="reset-button" class="danger">
                        {{ $t("contact.clear") }} <i class="bi bi-trash"></i>
                    </button>
                    <button type="submit" id="submit-button" class="primary">
                        {{ $t("contact.submit") }} <i class="bi bi-send"></i>
                    </button>
                </div>
            </form>
        </template>
        <template v-else-if="phase === 1">
            <p>{{ $t("contact.sending") }}</p>
            <loading-spinner />
        </template>
        <template v-else-if="phase === 2">
            <p>{{ $t("contact.sent") }}</p>
            <loading-spinner />
        </template>
    </div>
</template>

<style lang="less" scoped>
form {
    margin-top: 1.5em;
    display: flex;
    flex-direction: column;

    width: 100%;

    align-items: center;

    container-type: inline-size;

    .form-body {
        border: 1px solid #cccc;
        border-radius: 1em;
        padding: 2em;
        width: 100%;
        height: 100%;

        margin-bottom: 2em;
    }

    label {
        &:not(:last-of-type) {
            margin-bottom: 1rem;
        }
        display: grid;

        width: 100%;

        grid-template-columns: 1fr 3fr;

        align-items: center;

        :last-child {
            display: block;
        }
    }

    input,
    :deep(textarea) {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        background-color: var(--color-background);
    }

    .character-count {
        grid-column: span 2;
        text-align: right;
        font-size: 0.75rem;
        color: #666;
        position: absolute;
        bottom: 0;
        scrollbar-gutter: stable;
        z-index: 10000;
        width: fit-content;
        justify-self: end;
    }

    :deep(textarea) {
        resize: vertical;
        min-height: 12em;
        overflow-y: scroll;
    }

    button {
        grid-column: span 2;
        padding: 0.5rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;

        :first-child {
            margin-inline-start: 1ch;
        }
    }

    .error {
        grid-column: span 2;
        margin-top: 0;
        color: var(--color-error);
    }

    .buttons {
        display: flex;
        justify-content: space-evenly;
        gap: 1ch;
    }

    .yummy-honey {
        position: fixed;
        top: -1000px;
        left: -1000px;
        height: 1px;
        width: 1px;
        color: transparent;
        overflow: hidden;
        background-color: transparent;
    }

    @media (width < @breakpoint) {
        label {
            grid-template-columns: auto;
            grid-template-rows: auto auto;
        }
    }
}
</style>
