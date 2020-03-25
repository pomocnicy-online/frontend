<template>
    <v-expand-transition>
        <v-container v-show="isChecked">
            <v-row class="pa-4">
                <v-col cols="12">
                    <v-textarea
                        :value="description"
                        @input="$emit('update:description', $event)"
                        filled
                        height="136"
                        name="description"
                        no-resize
                        label="Opis / inny rodzaj (Opcjonalnie)"
                        v-model="description"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-container>
    </v-expand-transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class MedicaItemCardDesc extends Vue {
    @Prop() readonly isChecked!: boolean;
    @Prop() readonly description!: string;
}
</script>

