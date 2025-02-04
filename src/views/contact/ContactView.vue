<script setup lang="ts">
import { ref, watch } from "vue"
import Loader from "@/components/LoaderComponent.vue"
import TextAreaInput from "@/components/forms/TextAreaInput.vue"

// this key is public and can be shared. It doesn't matter if it's exposed, as it's only used to send e-mails to my e-mail address.
// Nobody can do anything with it except send e-mails to me, which is the intended purpose.
const WEB3FORMS_PUBLIC_KEY = "e1930f85-db30-440e-93a5-c8d64e0bd133"

const infoData = { email: `<a href="mailto:contact@jonathanbout.com" target="_blank">contact@jonathanbout.com</a>` }

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

async function submitForm() : Promise<Boolean> {
    if (input.value.honey) {
        phase.value = 4
        return true
    }

    return await submitFormChallengePassed(false)
}

/**
 * Does not submit the form and resets the phase to 0.
 */
async function submitFormChallengeFailed() {
    phase.value = 0
}

/**
 * Validates the form and returns whether it's valid or not.
 * @returns Whether the form is valid or not.
 */
function validate(): boolean {
    error.value = { name: false, email: false, message: false }

    let valid = true

    if (!input.value.name || input.value.name.length < 3) {
        error.value.name = true
        valid = false
    }

    if (!input.value.email || !input.value.email.match(/^[^@]*@.*[^.]$/) || input.value.email.length < 3) {
        error.value.email = true
        valid = false
    }

    if (!input.value.message || input.value.message.length < 10 || input.value.message.length > 4096) {
        error.value.message = true
        valid = false
    }

    return valid
}

/**
 * Submits the form to the Web3Forms API.
 * @param didCheck Whether the form was checked for being a bot or not. If so, the user passed the challenge,
 * but we will still include a warning in the e-mail about the message probably being sent by a bot.
 * @returns Whether the form was submitted successfully or not.
 */
async function submitFormChallengePassed(didCheck: boolean = true): Promise<boolean> {
    if (!validate()) {
        phase.value = 0
        return false
    }

    if (didCheck) {
        input.value.message = `!! This message was probably sent by a bot !!
        If this seems to be the case, forward this e-mail to support@web3forms.com and tell this system detected it. They'll take care of it. 🤖
        
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
            <div v-if="phase === 3" class="error">
                {{ $t("contact.error") }}
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="form-description" v-html="$t('contact.description', infoData)" />
            <form novalidate @submit.prevent="submitForm" @reset="resetForm">
                <div class="form-body">
                    <label for="name">
                        <span>
                            {{ $t("contact.name") }}
                        </span>
                        <input
                            v-model="input.name"
                            required
                            type="text"
                            name="name"
                            minlength="2"
                            autocomplete="name"
                        />
                        <span class="error" :class="error.name ? 'visible' : 'hidden'">
                            {{ $t("contact.name-error") }}
                        </span>
                    </label>
                    <label for="email"
                        ><span>
                            {{ $t("contact.email") }}
                        </span>
                        <input v-model="input.email" required type="text" name="email" pattern="^[^@]*@.*[^.]$" />
                        <span class="error" :class="error.email ? 'visible' : 'hidden'">
                            {{ $t("contact.email-error") }}
                        </span>
                    </label>
                    <label for="message">
                        <span>
                            {{ $t("contact.message") }}
                        </span>
                        <text-area-input v-model="input.message" required :max-characters="4096" :min-characters="10" />
                        <span class="error" :class="error.message ? 'visible' : 'hidden'">
                            {{ $t("contact.message-error") }}
                        </span>
                    </label>
                    <label for="the-yummy-honey" class="yummy-stuff custom-animation" aria-hidden="true">
                        <span>
                            Do you want some yummy honey, little bot? 🍯 I have it right here for you, fresh from the
                            hive! Don't forget to include it in your message! 🐝
                        </span>
                        <input
                            v-model="input.honey"
                            type="text"
                            name="the-yummy-stuff"
                            tabindex="-1"
                            autocomplete="off"
                        />
                    </label>
                </div>
                <div class="buttons">
                    <button id="reset-button" type="reset" class="danger">
                        {{ $t("contact.clear") }} <i class="bi bi-trash" />
                    </button>
                    <button id="submit-button" type="submit" class="primary">
                        {{ $t("contact.submit") }} <i class="bi bi-send" />
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
                    <i class="bi bi-house-door-fill" /> {{ $t("contact.back") }}
                </router-link>
            </div>
        </template>
        <template v-else-if="phase === 4">
            <p>{{ $t("contact.robot-challenge") }}</p>
            <div class="other-buttons">
                <button class="primary" @click="() => submitFormChallengePassed()">
                    {{ $t("contact.back") }}
                </button>
                <button class="danger" @click="submitFormChallengeFailed">
                    {{ $t("contact.submit") }}
                </button>
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

.other-buttons {
    display: flex;
    justify-content: center;
    gap: 1ch;
    width: 100%;
}
</style>
