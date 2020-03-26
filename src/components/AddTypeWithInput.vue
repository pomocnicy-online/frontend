<template>
    <v-row class="ma-4">
        <v-col md="7" class="pa-0">
            <v-row align="center" justify="center">
                <v-text-field v-model="kind" label="Rodzaj" filled hide-details></v-text-field>
            </v-row>
        </v-col>
        <v-col md="4" offset-md="1" class="pa-2">
            <Counter :quantity="quantity" :plus="plus" :minus="minus" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Counter from "@/components/Counter.vue";

@Component({
    components: {
        Counter
    }
})
export default class AddTypeWithInput extends Vue {
    @Prop() readonly updateSupplies!: any;
    @Prop() readonly type!: string;
    @Prop() readonly usageType!: string;
    @Prop() readonly brand!: string;
    @Prop() description!: string[];

    quantity = 0;
    kind = "";

    private plus() {
        this.quantity = Number(this.quantity) + 1;
        this.updateSupplies("mask", this.preparePosition());
    }

    private minus() {
        if (this.quantity >= 1) {
            this.quantity = Number(this.quantity) - 1;
            this.updateSupplies("mask", this.preparePosition());
        }
    }

    private preparePosition() {
        return {
            __brand: this.brand,
            style: this.type,
            type: this.kind,
            quantity: this.quantity
        };
    }
}
</script>