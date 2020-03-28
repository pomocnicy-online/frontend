<template>
    <v-card class="mx-auto ma-5" outlined>
        <medical-card-header showCheckBox="true" :title="title" :isChecked.sync="isChecked">
            <template v-slot:icon>
                <slot name="icon"></slot>
            </template>
        </medical-card-header>
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
import MedicalCardHeader from "@/components/MedicalCardHeader.vue";

@Component({
    components: {
        MedicalCardHeader
    }
})
export default class MedicalCard extends Vue {
    @Prop() readonly title!: string;

    private isChecked = false;
}
</script>
