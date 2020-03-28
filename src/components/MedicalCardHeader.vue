<template>
    <v-card-actions class="medical-card-header__title-container pa-3">
        <v-row justify="start" align="center">
            <v-col cols="1">
                <slot name="icon"></slot>
            </v-col>
            <v-col cols="10" class="ml-3">
                <v-card-title class="medical-card-header__title body-1 pa-0">{{ title }}</v-card-title>
            </v-col>
        </v-row>
        <slot name="desc"></slot>
        <v-checkbox v-if="showCheckBox" v-model="isCheckedModel"></v-checkbox>
    </v-card-actions>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class MedicalCardHeader extends Vue {
    @Prop() readonly title!: string;

    @Prop({ default: false }) readonly showCheckBox!: boolean;

    @Prop() readonly isChecked!: boolean;

    get isCheckedModel() {
        return this.isChecked;
    }

    set isCheckedModel(val: boolean) {
        this.$emit("update:isChecked", val);
    }
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
