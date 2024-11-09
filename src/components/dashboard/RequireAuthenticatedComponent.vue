<script setup lang="ts">
import { type RouteLocationAsPathGeneric, type RouteLocationAsRelativeGeneric } from "vue-router"

import { useRouter } from "vue-router"
import auth from "@/server/auth"
import { onMounted, ref } from "vue"

enum stateType {
    loading,
    authenticated,
    unauthenticated
}

const state = ref(stateType.loading)

const props = defineProps<{
    redirectTo: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}>()

const router = useRouter()

onMounted(() => {
    auth.isAuthenticated()
        .then((isAuthenticated) => {
            if (!isAuthenticated) {
                console.warn("User is not authenticated, redirecting to login page")
                state.value = stateType.unauthenticated
                router.push(props.redirectTo)
            } else {
                state.value = stateType.authenticated
            }
        })
        .catch((error) => {
            console.error("Error checking if user is authenticated", error)
            state.value = stateType.unauthenticated
            router.push(props.redirectTo)
        })
})
</script>
<template>
    <template v-if="state === stateType.loading">
        <p>Authenticating...</p>
    </template>
    <template v-else-if="state === stateType.authenticated">
        <slot />
    </template>
    <template v-else>
        <p>Not authenticated</p>
    </template>
</template>
