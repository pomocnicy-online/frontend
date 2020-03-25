<template>
    <v-app class="app">
        <Navbar />
        <router-view />
        <div v-if="showThankYouModal$">Thx</div>
    </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";

import { Component, Vue, Provide } from "vue-property-decorator";
import { Observables } from "vue-rx";
import { select } from "@rxsv/core";

import { rootStore, AppStore } from "@/state";

@Component<App>({
    components: { Navbar },
    subscriptions(): Observables {
        const { state$ } = this.rxStore;

        return {
            showThankYouModal$: state$.pipe(select(a => a.showThankYouModal))
        };
    }
})
export default class App extends Vue {
    @Provide("rxstore")
    private get rxStore(): AppStore {
        return rootStore();
    }
}
</script>

<style>
:root {
    --text-primary: #4a577b;
    --text-primary-light: rgba(74, 87, 123, 0.54);
    --screen-medium: 578px;
}

#app {
    @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,600&display=swap");
    font-family: "IBM Plex Sans", sans-serif;
    color: var(--text-primary);
}

.app {
    margin: 0 auto;
    max-width: 80rem;
}

a,
u {
    text-decoration: none;
}
</style>
