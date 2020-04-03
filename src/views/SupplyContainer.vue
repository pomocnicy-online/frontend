<template>
    <v-col md="12" class="pa-0">
        <medical-card title="Maseczki">
            <template v-slot:icon>
                <maskIcon />
            </template>
            <template v-slot:usageTypes>
                <UsageTypes
                    brand="mask"
                    :usageTypes="usageTypes"
                    :types="styles"
                    :updateSupplies="updateSupplies"
                />
            </template>
            <template v-slot:additionalDesc>
                <AdditionalDesc :description.sync="supplies.mask.description" />
            </template>
        </medical-card>

        <medical-card title="Rękawiczki">
            <template v-slot:icon>
                <glovesIcon />
            </template>
            <template v-slot:usageTypes>
                <UsageTypes
                    brand="glove"
                    :usageTypes="gloveTypes"
                    :types="sizes"
                    :updateSupplies="updateSupplies"
                />
            </template>
            <template v-slot:addType>
                <AddType :types="material" :usageTypes.sync="gloveTypes" />
            </template>
            <template v-slot:additionalDesc>
                <AdditionalDesc :description.sync="supplies.glove.description" />
            </template>
        </medical-card>

        <medical-card title="środki do dezynfekcji">
            <template v-slot:icon>
                <disinfectantsIcon />
            </template>
            <template v-slot:usageTypes>
                <AddTypeWithInput
                    v-for="index in disinfectantCount"
                    :key="index"
                    brand="disinfectant"
                    :usageTypes="usageTypes"
                    :types="sizes"
                    :updateSupplies="updateSupplies"
                    :deleteSupplies="deleteSupplies"
                />
            </template>
            <template v-slot:addType>
                <AddInputForType :typesCount.sync="disinfectantCount" />
            </template>
        </medical-card>

        <medical-card title="Kombinezony">
            <template v-slot:icon>
                <overallsIcon />
            </template>
            <template v-slot:usageTypes>
                <UsageTypes
                    brand="suit"
                    :usageTypes="overallTypes"
                    :types="sizes"
                    :updateSupplies="updateSupplies"
                />
            </template>
            <template v-slot:additionalDesc>
                <AdditionalDesc :description.sync="supplies.suit.description" />
            </template>
        </medical-card>

        <medical-card title="Inne środki czystości">
            <template v-slot:icon>
                <cleaningProductsIcon />
            </template>
            <template v-slot:usageTypes>
                <AddTypeWithInput
                    v-for="index in cleaningCount"
                    :key="index"
                    brand="cleaning"
                    :usageTypes="usageTypes"
                    :types="sizes"
                    :updateSupplies="updateSupplies"
                    :deleteSupplies="deleteSupplies"
                />
            </template>
            <template v-slot:addType>
                <AddInputForType :typesCount.sync="cleaningCount" />
            </template>
        </medical-card>

        <medical-card title="Wsparcie psychologiczne">
            <template v-slot:icon>
                <psychologicalSupportIcon />
            </template>
            <template v-slot:additionalDesc>
                <AdditionalDesc :description.sync="supplies.psychologicalSupport.description" />
            </template>
        </medical-card>

        <medical-card title="Artykuły spozywcze">
            <template v-slot:icon>
                <cleaningProductsIcon />
            </template>
            <template v-slot:usageTypes>
                <AddTypeWithInput
                    v-for="index in groceryCount"
                    :key="index"
                    brand="grocery"
                    :usageTypes="usageTypes"
                    :types="sizes"
                    :updateSupplies="updateSupplies"
                    :deleteSupplies="deleteSupplies"
                />
            </template>
            <template v-slot:addType>
                <AddInputForType :typesCount.sync="groceryCount" />
            </template>
        </medical-card>

        <medical-card title="Materiały do szycia">
            <template v-slot:icon>
                <sewingSuppliesIcon />
            </template>
            <template v-slot:additionalDesc>
                <AdditionalDesc :description.sync="supplies.psychologicalSupport.sewingMaterial" />
            </template>
        </medical-card>

        <medical-card title="Druk 3D" class="print-card">
            <template v-slot:icon>
                <printIcon />
            </template>
            <template v-slot:usageTypes>
                <Types
                    class="print-card__types"
                    v-for="type in printType"
                    :key="type"
                    brand="print"
                    justifyTypes="start"
                    justifyCounter="end"
                    :usageTyps="type"
                    :type="type"
                    :updateSupplies="updateSupplies"
                />
            </template>
            <template v-slot:additionalDesc>
                <AdditionalDesc :description.sync="supplies.print.description" />
            </template>
        </medical-card>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import MedicalCard from "@/components/MedicalCard.vue";
import AdditionalDesc from "@/components/AdditionalDesc.vue";
import AddType from "@/components/AddType.vue";
import UsageTypes from "@/components/UsageTypes.vue";
import Types from "@/components/Types.vue";
import AddTypeWithInput from "@/components/AddTypeWithInput.vue";
import AddInputForType from "@/components/AddInputForType.vue";

import maskIcon from "@/components/icons/mask.vue";
import printIcon from "@/components/icons/print.vue";
import glovesIcon from "@/components/icons/gloves.vue";
import disinfectantsIcon from "@/components/icons/disinfectants.vue";
import overallsIcon from "@/components/icons/overalls.vue";
import psychologicalSupportIcon from "@/components/icons/psychological-support.vue";
import cleaningProductsIcon from "@/components/icons/cleaning-products.vue";
import groceriesIcon from "@/components/icons/groceries.vue";
import sewingSuppliesIcon from "@/components/icons/sewing-supplies.vue";

import { Step } from "@/views/Necessitous/Step";
import { Supply } from "@/views/Supply";

@Component({
    components: {
        maskIcon,
        glovesIcon,
        overallsIcon,
        disinfectantsIcon,
        cleaningProductsIcon,
        groceriesIcon,
        psychologicalSupportIcon,
        sewingSuppliesIcon,
        MedicalCard,
        AdditionalDesc,
        AddType,
        UsageTypes,
        Types,
        AddTypeWithInput,
        AddInputForType,
        printIcon
    }
})
export default class SupplyContainer extends Vue {
    @Prop() supplies!: Step.DemandData;
    @Prop() updateSupplies!: any;
    @Prop() deleteSupplies!: any;
    @Prop() description!: string;

    disinfectantCount = 1;
    groceryCount = 1;
    cleaningCount = 1;

    private readonly styles: Supply.Style[] = Object.values(Supply.Style);
    private readonly sizes: Supply.Size[] = Object.values(Supply.Size);
    private readonly usageTypes: Supply.UsageType[] = Object.values(Supply.UsageType);
    private readonly material: Supply.Material[] = Object.values(Supply.Material);
    private readonly printType: Supply.PrintType[] = Object.values(Supply.PrintType);

    private overallTypes: string[] = [Supply.UsageType.Disposable];
    private gloveTypes: string[] = [Supply.Material.Latex];
}
</script>
<style lang="scss">
.print-card {
    &__types {
        .medical-type__title {
            padding-left: 0.75rem;
        }

        .counter {
            padding-right: 0.75rem;
        }
    }
}
</style>
