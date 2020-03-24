<template>
    <v-row align="center" justify="center">
        <v-btn icon @click="minus" color="primary">
            <v-icon>$backArrow</v-icon>
        </v-btn>

        <v-col cols="3" class="pa-0">
            <v-text-field
                hide-details
                dense
                class="pa-0 centered-input"
                color="primary"
                v-model="counter"
            ></v-text-field>
        </v-col>

        <v-btn icon color="primary" @click="plus">
            <v-icon>$nextArrow</v-icon>
        </v-btn>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Counter extends Vue {
    private counter = 0;

    private plus() {
        this.counter = Number(this.counter) + 1;
    }

    private minus() {
        if (this.counter >= 1) {
            this.counter = Number(this.counter) - 1;
        }
    }
}
</script>

<style scoped>
.centered-input >>> input {
    text-align: center;
}
</style>
