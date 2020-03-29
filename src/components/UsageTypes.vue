<template>
    <div>
        <v-row v-for="item in usageTypes" :key="item" align="start" justify="center">
            <v-col cols="4" justify="start" class="pa-7">
                <v-row align="center" justify="center">
                    <h3 class="body-1 usage-type__title">{{ $typeName(item) }}</h3>
                </v-row>
            </v-col>
            <v-col cols="8">
                <Types
                    v-for="type in types"
                    :key="type"
                    :type="type"
                    :updateSupplies="updateSupplies"
                    :usageType="item"
                    :brand="brand"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Types from "@/components/Types.vue";

@Component({
    components: {
        Types
    }
})
export default class UsageTypes extends Vue {
    @Prop() readonly types!: string[];
    @Prop() readonly usageTypes!: any[];
    @Prop() readonly updateSupplies!: any;
    @Prop() readonly brand!: string;
}
</script>

<style lang="scss" scoped>
.usage-type {
    &__title {
        color: var(--text-primary);
    }
}
</style>
