<template>
    <v-app>
        <div id="app">
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </div>
            <router-view />
        </div>
    </v-app>
</template>

<style lang="scss">
:root {
    --text-primary: #4a577b;
    --screen-medium: 578px;
}

#app {
    @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,600&display=swap");
    font-family: "IBM Plex Sans", sans-serif;
    color: var(--text-primary);
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
