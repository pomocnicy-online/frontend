<template>
    <v-row align="center" justify="center">
        <v-col cols="7" class="pa-0 pb-2">
            <v-text-field v-model="kind" label="Rodzaj" filled hide-details></v-text-field>
        </v-col>
        <v-col cols="4" class="pa-2">
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
        this.updateSupplies(this.brand, this.preparePosition());
    }

    private minus() {
        if (this.quantity >= 1) {
            this.quantity = Number(this.quantity) - 1;
            this.updateSupplies(this.brand, this.preparePosition());
        }
    }

    private preparePosition() {
        return {
            style: this.type,
            type: this.kind,
            quantity: this.quantity
        };
    }
}
</script>
