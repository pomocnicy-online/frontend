<template>
    <v-col md="12" class="pa-0">
        <medical-card-header v-for="supply in supplies" :title="supply.title" :key="supply.title" class="summary">
            <template v-slot:icon>
                <Component :is="supply.icon" />
            </template>
            <template v-slot:desc>
                <v-row class="summary__quantity">
                    <span v-if="supply.quantity">{{ supply.quantity }} szt</span>
                </v-row>
            </template>
        </medical-card-header>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import MedicalCardHeader from "@/components/MedicalCardHeader.vue";

// TODO: make one generic icon component
import maskIcon from "@/components/icons/mask.vue";
import gloveIcon from "@/components/icons/gloves.vue";
import disinfectantIcon from "@/components/icons/disinfectants.vue";
import suitIcon from "@/components/icons/overalls.vue";
import psychologicalSupportIcon from "@/components/icons/psychological-support.vue";
import cleaningIcon from "@/components/icons/cleaning-products.vue";
import printIcon from "@/components/icons/print.vue";
import groceryIcon from "@/components/icons/groceries.vue";
import sewingMaterialIcon from "@/components/icons/sewing-supplies.vue";
import transportIcon from "@/components/icons/transport.vue";
import otherIcon from "@/components/icons/other.vue";

import { Step } from "@/views/Necessitous/Step";

@Component({
    components: {
        maskIcon,
        gloveIcon,
        otherIcon,
        disinfectantIcon,
        cleaningIcon,
        groceryIcon,
        psychologicalSupportIcon,
        sewingMaterialIcon,
        suitIcon,
        printIcon,
        transportIcon,
        MedicalCardHeader
    }
})
export default class SupplyContainer extends Vue {
    @Prop() supplies?: Step.Supplies.SummaryViewData;
}
</script>

<style lang="scss" scoped>
.summary {
    margin-bottom: 0.5rem;
    height: 4rem;

    &__quantity {
        justify-content: flex-end;
        padding-right: 2rem;
    }
}
</style>
