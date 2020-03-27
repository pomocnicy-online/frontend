<template>
    <v-card class="mx-auto ma-5" outlined>
        <v-card-actions class="medical-card-header__title-container pa-3">
            <v-row justify="start" align="center">
                <v-col cols="1">
                    <slot name="icon"></slot>
                </v-col>
                <v-col cols="10" class="ml-3">
                    <v-card-title class="medical-card-header__title body-1 pa-0 ">{{ title }}</v-card-title>
                </v-col>
            </v-row>
            <v-checkbox v-model="isChecked"></v-checkbox>
        </v-card-actions>
        <v-expand-transition>
            <v-container v-show="isChecked">
                <slot name="usageTypes"></slot>
                <slot name="addType"></slot>
                <slot name="additionalDesc"></slot>
            </v-container>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class MedicalCard extends Vue {
    @Prop() readonly title!: string;

    private readonly isChecked: boolean = false;
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
