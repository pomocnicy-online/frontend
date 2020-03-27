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
                :value="quantity"
                @input="$emit('update:quantity', $event)"
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
    @Prop() quantity!: number;
    @Prop() plus!: any;
    @Prop() minus!: any;
}
</script>

<style scoped>
.centered-input >>> input {
    text-align: center;
}
</style>
