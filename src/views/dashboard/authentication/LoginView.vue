<script setup lang="ts">
import { ref } from 'vue';

import auth from '@/server/auth';
import { useRouter } from 'vue-router';

const input = ref({ username: '', password: '' });

const state = ref({ error: '', success: false, loading: false });

const router = useRouter();

function beginLogin() {
    state.value.error = '';
    state.value.success = false;
    state.value.loading = true;

    if (input.value.username && input.value.password) {
        auth.login(input.value.username, input.value.password).then((response) => {
            if (response) {
                state.value.success = true;
                state.value.error = '';

                // Redirect to dashboard
                router.push('/dash');
            } else {
                state.value.success = false;
                state.value.error = 'Invalid username or password';
            }
        }).finally(() => {
            state.value.loading = false;
        });
    } else {
        state.value.loading = false;
        state.value.success = false;
        state.value.error = 'Please enter a username and password';
    }
}
</script>
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="beginLogin" >
            <input type="text" placeholder="Username" v-model="input.username" autocomplete="username" />
            <input type="password" placeholder="Password" v-model="input.password" autocomplete="current-password" />
            <p v-if="state.error">{{ state.error }}</p>
            <button type="submit" :disabled="state.loading">Login</button>
        </form>
    </div>
</template>