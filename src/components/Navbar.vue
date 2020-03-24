<template>
    <div class="nav">
        <v-app-bar color="transparent" elevation="0" light class="nav__bar">
            <v-toolbar-title>
                <router-link to="/" class="nav__title">HelMed</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-title
                v-for="item in navigationList"
                :key="item.name"
                class="body-1"
            >
                <router-link :to="item.route" class="nav__link">
                    {{ item.name }}
                </router-link>
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    private readonly navigationList = [
        {
            name: "Potrzebujący",
            route: "/potrzebujacy/1"
        },
        {
            name: "Pomagający",
            route: "/pomagajacy"
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
.nav {
    padding: 2rem;
    &__bar {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    &__link {
        color: var(--text-primary);
        padding-right: 3.4rem;
    }
    &__title {
        color: var(--text-primary);
        font-weight: 600;
    }
}
</style>
