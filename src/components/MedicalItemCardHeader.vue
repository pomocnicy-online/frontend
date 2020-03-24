<template>
    <v-card-actions class="medical-card-header__title-container pa-3">
        <v-col class="pa-2">
            <v-row justify="start" align="center">
                <slot name="icon"></slot>
                <v-card-title class="medical-card-header__title pa-2">{{title}}</v-card-title>
            </v-row>
        </v-col>
        <v-checkbox v-model="checkbox1"></v-checkbox>
    </v-card-actions>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class MedicalItemCardHeader extends Vue {
    @Prop() readonly title!: string;

    private readonly checkbox1: boolean = false;
}
</script>

<style lang="scss" scoped>
.medical-card-header {
    &__title-container {
        background-color: var(--header-card-background);
        height: 5rem;
    }
    &__title {
        color: var(--text-primary);
    }
}
</style>