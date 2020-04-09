<template>
  <div class="nav">
    <v-app-bar color="white" elevation="0" light class="nav__bar" app>
      <v-toolbar-title>
        <router-link to="/" class="nav__title">Pomocnicy</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="nav__icon" />

      <v-toolbar-title v-for="item in navigationList" :key="item.name" class="nav__toolbar body-1">
        <router-link
          :to="item.route"
          class="nav__link"
          exact-active-class="nav__link--active"
          exact
        >{{ item.name }}</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer class="nav__drawer" v-model="drawer" app top right temporary>
      <v-list nav dense>
        <v-list-item v-for="item in navigationList" :key="item.name">
          <router-link
            class="nav__link"
            exact-active-class="nav__link--active"
            exact
            :to="item.route"
          >{{ item.name }}</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  private drawer = false;
  private readonly navigationList = [
    {
      name: "Potrzebujący",
      route: "/potrzebujacy/1"
    },
    {
      name: "Pomagający",
      route: "/pomagajacy/1"
    },
    {
      name: "Materiały",
      route: "/materialy"
    },
    {
      name: "Instrukcja szycia",
      route: "/instrukcja"
    },
    {
      name: "Kontakt",
      route: "/kontakt"
    }
  ];
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.nav {
  &__bar {
    margin: 0 auto;
    max-width: 80rem;
    background-color: white;

    @include at(medium) {
      padding-left: 1.8rem;
    }
  }

  &__icon {
    @include at(medium) {
      display: none;
    }
  }

  &__toolbar {
    display: none;

    @include at(medium) {
      display: initial;
    }
  }

  &__link {
    position: relative;
    color: var(--text-primary);
    margin-right: 3.4rem;
    padding-bottom: 1px;
    line-height: 21px;
    font-style: normal;
    font-weight: normal;

    &:hover,
    &:focus,
    &--active {
        border-bottom: 1px solid var(--text-primary);
    }
  }

  &__title {
    color: var(--text-primary);
    font-weight: 600;
  }
}
</style>
