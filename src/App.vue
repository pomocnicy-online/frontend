<template>
    <v-app class="app">
        <Navbar />
        <router-view />
    </v-app>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
    name: "App",
    components: {
        Navbar
    }
};
</script>

<style>
:root {
    --text-primary: #4a577b;
    --input-background: rgba(74, 87, 123, 0.06);
    --screen-medium: 578px;
}

#app {
    @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,600&display=swap");
    font-family: "IBM Plex Sans", sans-serif;
    color: var(--text-primary);
}

.app {
    margin: 1rem auto;
    max-width: 80rem;
}

a,
u {
    text-decoration: none;
}
</style>