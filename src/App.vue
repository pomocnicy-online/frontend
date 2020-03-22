<template>
    <v-app>
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
a,
u {
    text-decoration: none;
}
</style>