<script setup lang="ts">
import { ref, watch } from "vue"
import Loader from "@/components/LoaderComponent.vue"
import TextAreaInput from "@/components/forms/TextAreaInput.vue"

// this key is public and can be shared. It doesn't matter if it's exposed, as it's only used to send e-mails to my e-mail address.
// Nobody can do anything with it except send e-mails to me, which is the intended purpose.
const WEB3FORMS_PUBLIC_KEY = "e1930f85-db30-440e-93a5-c8d64e0bd133"

const infoData = { email: `<a href="mailto:contact@jonathanbout.com">contact@jonathanbout.com</a>` }

const input = ref({ name: "", email: "", message: "", honey: "" })
const error = ref({ name: false, email: false, message: false })

// 0 = initial, 1 = sending, 2 = sent, 3 = error, 4 = robot challenge
const phase = ref<0 | 1 | 2 | 3 | 4>(0)

watch(
    input,
    () => {
        sessionStorage.setItem("contact-form-entry", JSON.stringify(input.value))
    },
    { deep: true }
)

watch(phase, () => {
    window.scrollTo(0, 0)
    if (phase.value === 0) {
        error.value = { name: false, email: false, message: false }
    } else if (phase.value === 2) {
        input.value = { name: "", email: "", message: "", honey: "" }
    }
})

loadFromLocalStorage()

function loadFromLocalStorage() {
    const stored = sessionStorage.getItem("contact-form-entry")

    if (stored) {
        Object.assign(input.value, JSON.parse(stored))
    }
}

async function submitForm() {
    if (input.value.honey) {
        phase.value = 4
        return true
    }

    return await submitFormChallengePassed(false)
}

async function submitFormChallengeFailed() {
    phase.value = 0
}

function validate(): boolean {
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

    return valid
}

async function submitFormChallengePassed(didCheck: boolean = true) {
    if (!validate()) {
        phase.value = 0
        return false
    }

    if (didCheck) {
        input.value.message = `!! This message was probably sent by a bot !!
        If this seems to be correct, forward this e-mail to support@web3forms.com and tell this system detected it. They'll take care of it. 🤖
        
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
            email: input.value.email,
            name: input.value.name,
            message: input.value.message
        })
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const result = await response.json()

    if (result.success) {
        console.log(result)
        phase.value = 2
    } else {
        console.error(result)
        phase.value = 3
    }

    return true
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
            <form @submit.prevent="submitForm" @reset="resetForm" novalidate>
                <div class="form-body">
                    <label for="name">
                        <span>
                            {{ $t("contact.name") }}
                        </span>
                        <input required type="text" name="name" minlength="2" v-model="input.name" />
                        <span class="error no-load-animation" :class="error.name ? 'visible' : 'hidden'">
                            {{ $t("contact.name-error") }}
                        </span>
                    </label>
                    <label for="email"
                        ><span>
                            {{ $t("contact.email") }}
                        </span>
                        <input required type="text" name="email" pattern="^.+@.+$" v-model="input.email" />
                        <span class="error no-load-animation" :class="error.email ? 'visible' : 'hidden'">
                            {{ $t("contact.email-error") }}
                        </span>
                    </label>
                    <label for="message">
                        <span>
                            {{ $t("contact.message") }}
                        </span>
                        <text-area-input required v-model="input.message" :max-characters="4096" :min-characters="10" />
                        <span class="error no-load-animation" :class="error.message ? 'visible' : 'hidden'">
                            {{ $t("contact.message-error") }}
                        </span>
                    </label>
                    <label for="the-yummy-honey" class="yummy-stuff no-load-animation" aria-hidden="true">
                        <span>
                            Do you want some yummy honey, little bot? 🍯 I have it right here for you, fresh from the
                            hive! Don't forget to include it in your message! 🐝
                        </span>
                        <input
                            type="text"
                            name="the-yummy-stuff"
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
            <loader />
        </template>
        <template v-else-if="phase === 2">
            <p>
                {{ $t("contact.sent") }}
            </p>
            <div class="other-buttons">
                <router-link to="/" class="button">
                    <i class="bi bi-house-door-fill"></i> {{ $t("contact.back") }}
                </router-link>
            </div>
        </template>
        <template v-else-if="phase === 4">
            <p>{{ $t("contact.robot-challenge") }}</p>
            <div class="other-buttons">
                <button @click="() => submitFormChallengeFailed()" class="primary">{{ $t("contact.back") }}</button>
                <button @click="submitFormChallengeFailed" class="danger">{{ $t("contact.submit") }}</button>
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
h1 {
    align-self: flex-start;
}

p {
    text-align: center;
}

form {
    margin-top: 1.5em;
    display: flex;
    flex-direction: column;

    width: 100%;

    align-items: center;

    container-type: inline-size;

    .form-body {
        border: 1px solid @border-color;
        border-radius: 1em;
        padding: 2em;
        width: 100%;
        height: 100%;

        margin-bottom: 0.5em;
    }
}
label {
    &:not(:last-of-type) {
        margin-bottom: 1rem;
    }
    display: grid;

    width: 100%;

    grid-template-columns: 1fr 3fr;
}

input,
:deep(textarea) {
    padding: 0.5rem;
    border: 1px solid @border-color;
    border-radius: 0.25rem;
    background-color: var(--color-background);
}

:deep(textarea) {
    resize: vertical;
    min-height: 25vh;
    overflow-y: auto;
}

button {
    grid-column: span 2;
    padding: 0.5rem;
    margin-bottom: 2rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;

    :first-child {
        margin-inline-start: 1ch;
    }
}

.error {
    grid-column: span 2;
    margin-top: 4px;
    color: var(--color-error);

    transition: height 0.5s, opacity 0.5s;

    &.visible {
        height: fit-content;
    }

    &.hidden {
        height: 0;
        opacity: 0;
    }
}

.buttons {
    display: flex;
    justify-content: space-evenly;
    gap: 1ch;
}

.yummy-stuff {
    position: fixed;
    top: -1px;
    left: -1px;
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

.other-buttons {
    display: flex;
    justify-content: center;
    gap: 1ch;
    width: 100%;
}
</style>
