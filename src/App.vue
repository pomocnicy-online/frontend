<template>
    <v-app :class="['app', { modalOpened: showThankYouModal$ }]">
        <Navbar />
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
        <thank-you v-if="showThankYouModal$" class="thank-you-modal" />
    </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import ThankYou from "@/components/ThankYou.vue";

import { Component, Vue, Provide } from "vue-property-decorator";
import { Observables } from "vue-rx";
import { select } from "@rxsv/core";

import { rootStore, AppStore } from "@/state";

@Component<App>({
    components: { Navbar, ThankYou },
    subscriptions(): Observables {
        const { state$ } = this.rxStore;

        return {
            showThankYouModal$: state$.pipe(select(a => a.showThankYouModal))
        };
    }
})
export default class App extends Vue {
    showThankYouModal$ = true;
    @Provide("rxstore")
    private get rxStore(): AppStore {
        return rootStore();
    }
}
</script>

<style lang="scss" scoped>
.thank-you-modal {
    position: absolute;
}
</style>

<style lang="scss">
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

    &.modalOpened {
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
        }
    }
}

a,
u {
    text-decoration: none;
}
</style>
