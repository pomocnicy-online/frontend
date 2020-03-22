<template>
    <div class="nav">
        <v-app-bar color="transparent" :elevation="0" light>
            <v-toolbar-title class="nav__title">HelMed</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-title v-for="item in navigationList" :key="item.name" class="body-1">
                <router-link :to="item.route" class="nav__link">
                    {{
                    item.name
                    }}
                </router-link>
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    private readonly navigationList: any = [
        {
            name: "Potrzebujący",
            route: "/b"
        },
        {
            name: "Pomagający",
            route: "/a"
        },
        {
            name: "Instrukcja szycia",
            route: "/d"
        },
        {
            name: "Kontakt",
            route: "/e"
        }
    ];
}
</script>

<style lang="scss" scoped>
.nav {
    padding-top: 3.2rem;
    padding-bottom: 3.2rem;
    &__link {
        color: #4a577b;
        padding-right: 3.4rem;
    }
    &__title {
        color: #4a577b;
    }
}
</style>