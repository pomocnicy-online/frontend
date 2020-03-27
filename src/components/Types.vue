<template>
    <v-row align="start" justify="center">
        <v-col cols="6" class="pa-4">
            <v-row align="center" justify="center">
                <h3 class="body-1 medical-type__title">{{ type }}</h3>
            </v-row>
        </v-col>
        <v-col cols="6" class="pa-2">
            <Counter :quantity="quantity" :plus="plus" :minus="minus" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Counter from "@/components/Counter.vue";

@Component({
    components: {
        Counter
    }
})
export default class Types extends Vue {
    @Prop() readonly type!: string;
    @Prop() readonly usageType!: string;
    @Prop() readonly updateSupplies!: any;
    @Prop() readonly brand!: string;

    quantity = 0;

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
            type: this.usageType,
            quantity: this.quantity
        };
    }
}
</script>

<style lang="scss" scoped>
.medical-type {
    &__title {
        color: var(--text-primary);
    }
}
</style>
