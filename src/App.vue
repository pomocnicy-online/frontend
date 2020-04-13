<template>
  <v-app>
    <nav-bar />
    <v-content>
      <v-container fluid class="content">
        <router-view />
      </v-container>
    </v-content>
    <thank-you :isOpen="showThankYouModal$" class="thank-you-modal" />
  </v-app>
</template>

<script lang="ts">
import NavBar from "@/components/Navbar.vue";
import ThankYou from "@/components/ThankYou.vue";

import { Component, Vue, Provide } from "vue-property-decorator";
import { Observables } from "vue-rx";
import { select } from "@rxsv/core";

import { rootStore, AppStore } from "@/root";

@Component<App>({
  components: { NavBar, ThankYou },
  subscriptions(): Observables {
    const { state$ } = this.rxStore;

    return {
      showThankYouModal$: state$.pipe(select(a => a.common.showThankYouModal))
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

<style lang="scss" scoped>
.thank-you-modal {
  position: absolute;
}
</style>

<style lang="scss">
:root {
  --text-primary: #4a577b;
  --header-card-background: rgba(74, 87, 123, 0.06);
  --text-primary-light: rgba(74, 87, 123, 0.54);
  --screen-medium: 578px;
}

#app {
  @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,600&display=swap");
  font-family: "IBM Plex Sans", sans-serif;
  color: var(--text-primary);
}

.content {
  margin: 0 auto;
  max-width: 80rem;
}

a,
u {
  text-decoration: none;
}
</style>
