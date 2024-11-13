<script setup lang="ts">
import AuthorizedImage from "@/components/AuthorizedImage.vue"
import RequireAuthenticatedComponent from "@/components/dashboard/RequireAuthenticatedComponent.vue"
import server from "@/server"
import auth from "@/server/auth"
import { useRouter } from "vue-router"

const router = useRouter()

function logout() {
    auth.logout()
        .then(() => {
            console.log("Logged out")
            router.push("/")
        })
        .catch((error) => {
            router.push("/")
            console.error("Error logging out", error)
        })
}
</script>
<template>
    <div class="page-root custom-animation">
        <RequireAuthenticatedComponent redirect-to="/dash/auth/login">
            <aside>
                <nav>
                    <ul>
                        <li><router-link to="/dash">Dashboard</router-link></li>
                        <div class="flex-filler"></div>
                        <li>
                            <router-link to="/dash/user/settings">User Settings</router-link>
                            <AuthorizedImage src="/api/users/me/image?size=24" alt="User Image" />
                        </li>
                        <li @click="logout">Logout</li>
                    </ul>
                </nav>
            </aside>
            <div class="dashboard-root">
                <router-view />
            </div>
        </RequireAuthenticatedComponent>
    </div>
</template>
<style scoped lang="less">
.page-root {
    position: relative;
    left: 0;
    right: 0;
    flex-grow: 1;
    margin: 0;
    min-width: 100cqw;
    scrollbar-gutter: stable;
}

.dashboard-root {
    display: flex;
    flex-grow: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: start;
}

aside,
nav {
    display: contents;
    width: 100%;

    ul {
        background-color: red;
        width: 100%;
        list-style-type: none;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0;
        margin: 0;
    }

    ul > li {
        padding: 0.5rem;
        margin: 0.5rem;
        background-color: blue;
        border-radius: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.flex-filler {
    flex-grow: 1;
}
</style>
