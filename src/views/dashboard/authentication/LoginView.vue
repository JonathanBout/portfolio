<script setup lang="ts">
import { ref } from "vue"

import auth from "@/server/auth"
import { useRouter } from "vue-router"

const input = ref({ username: "", password: "" })

const state = ref({ error: false, usernameError: false, passwordError: false, success: false, loading: false })

const router = useRouter()

function beginLogin() {
    state.value.error = true
    state.value.usernameError = false
    state.value.passwordError = false
    state.value.success = false
    state.value.loading = true

    if (!input.value.username || !input.value.username.match(/^[^@]*@.*[^.]$/)) {	
        state.value.loading = false
        state.value.usernameError = true
    }

    if (!input.value.password) {
        state.value.loading = false
        state.value.passwordError = true
    }

    if (!state.value.loading) {
        state.value.error = false
        return
    }

    if (input.value.username && input.value.password) {
        auth.login(input.value.username, input.value.password)
            .then((response) => {
                if (response) {
                    state.value.success = true
                    state.value.error = false

                    // Redirect to dashboard
                    router.push("/dash")
                } else {
                    state.value.success = false
                    state.value.error = true
                }
            })
            .finally(() => {
                state.value.loading = false
            })
    } else {
        state.value.loading = false
        state.value.success = false
        state.value.error = true
    }
}
</script>
<template>
    <div class="page-root">
        <h1>{{ $t("dashboard.login.title") }}</h1>
        <p class="form-description">{{ $t("dashboard.login.description") }}</p>
        <form novalidate @submit.prevent="beginLogin">
            <div class="form-body">
                <label>
                    <span>{{ $t("dashboard.login.username") }}</span>
                    <input type="text" v-model="input.username" autocomplete="username" />
                    <span class="error" :class="state.usernameError ? 'visible' : 'hidden'">
                        {{ $t("dashboard.login.name-error") }}
                    </span>
                </label>
                <label>
                    <span>{{ $t("dashboard.login.password") }}</span>
                    <input type="password" v-model="input.password" autocomplete="current-password" />
                    <span class="error" :class="state.passwordError ? 'visible' : 'hidden'">
                        {{ $t("dashboard.login.password-error") }}
                    </span>
                </label>
                <p v-if="state.error" class="error no-load-animation">{{ $t('dashboard.login.error') }}</p>
            </div>
            <button type="submit" :disabled="state.loading">
                {{ state.loading ? $t("dashboard.login.loading") : $t("dashboard.login.submit") }}
            </button>
        </form>
    </div>
</template>
