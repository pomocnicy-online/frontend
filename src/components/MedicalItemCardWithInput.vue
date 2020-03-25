<template>
    <v-expand-transition>
        <v-container v-show="isChecked">
            <v-row class="ma-4">
                <v-col md="8" class="pa-0">
                    <v-row align="center" justify="center">
                        <v-text-field
                            :value="description"
                            @input="$emit('update:description', $event)"
                            label="Rodzaj"
                            filled
                            hide-details
                        ></v-text-field>
                    </v-row>
                </v-col>
                <v-col md="3" offset-md="1" class="pa-2">
                    <Counter />
                </v-col>
            </v-row>

            <v-row align="center" class="pa-2">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed v-on="on" class="mx-2" fab dark x-small color="primary">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <h3 class="body-1 medical-card__title">DODAJ INNY RODZAJ</h3>
            </v-row>
        </v-container>
    </v-expand-transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Counter from "@/components/Counter.vue";

@Component({
    components: {
        Counter
    }
})
export default class MedicalItemCardWithInput extends Vue {
    @Prop() readonly items!: any[];
    @Prop() readonly isChecked!: boolean;
    @Prop() readonly description!: string;
}
</script>

<style lang="scss" scoped>
.medical-card {
    &__title {
        color: var(--text-primary);
    }
}
</style>