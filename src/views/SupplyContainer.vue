<template>
    <div>
        <v-col md="6">
            <medical-card title="Maseczki">
                <template v-slot:icon>
                    <maskIcon />
                </template>
                <template v-slot:usageTypes>
                    <UsageTypes
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
                        :usageTypes="usageTypes"
                        :types="sizes"
                        :updateSupplies="updateSupplies"
                    />
                </template>
                <template v-slot:addType>
                    <AddType :types="material" />
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
                        :usageTypes="usageTypes"
                        :types="sizes"
                        :updateSupplies="updateSupplies"
                    />
                </template>
                <template v-slot:addType>
                    <AddType :types="material" />
                </template>
            </medical-card>

            <medical-card title="Kombinezony">
                <template v-slot:icon>
                    <overallsIcon />
                </template>
                <template v-slot:usageTypes>
                    <UsageTypes
                        :usageTypes="overallTypes"
                        :types="sizes"
                        :updateSupplies="updateSupplies"
                    />
                </template>
                <template v-slot:additionalDesc>
                    <AdditionalDesc :description.sync="description" />
                </template>
            </medical-card>

            <medical-card title="Inne środki czystości">
                <template v-slot:icon>
                    <cleaningProductsIcon />
                </template>
                <template v-slot:usageTypes>
                    <AddTypeWithInput
                        :usageTypes="usageTypes"
                        :types="sizes"
                        :updateSupplies="updateSupplies"
                    />
                </template>
                <template v-slot:addType>
                    <AddType :types="material" />
                </template>
            </medical-card>

            <medical-card title="Wsparcie psychologiczne">
                <template v-slot:icon>
                    <psychologicalSupportIcon />
                </template>
                <template v-slot:additionalDesc>
                    <AdditionalDesc :description.sync="description" />
                </template>
            </medical-card>

            <medical-card title="Artykuły spoywcze">
                <template v-slot:icon>
                    <cleaningProductsIcon />
                </template>
                <template v-slot:usageTypes>
                    <AddTypeWithInput
                        :usageTypes="usageTypes"
                        :types="sizes"
                        :updateSupplies="updateSupplies"
                    />
                </template>
                <template v-slot:addType>
                    <AddType :types="material" />
                </template>
            </medical-card>

            <medical-card title="Materiały do szycia">
                <template v-slot:icon>
                    <sewingSuppliesIcon />
                </template>
                <template v-slot:additionalDesc>
                    <AdditionalDesc :description.sync="description" />
                </template>
            </medical-card>
        </v-col>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import MedicalCard from "@/components/MedicalCard.vue";
import AdditionalDesc from "@/components/AdditionalDesc.vue";
import AddType from "@/components/AddType.vue";
import UsageTypes from "@/components/UsageTypes.vue";
import AddTypeWithInput from "@/components/AddTypeWithInput.vue";

import maskIcon from "@/components/icons/mask.vue";
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
        AddTypeWithInput
    }
})
export default class SupplyContainer extends Vue {
    @Prop() supplies!: Step.DemandData;
    @Prop() updateSupplies!: any;
    @Prop() description!: string;

    private readonly styles: Supply.Style[] = Object.values(Supply.Style);
    private readonly sizes: Supply.Size[] = Object.values(Supply.Size);
    private readonly usageTypes: Supply.UsageType[] = Object.values(Supply.UsageType);
    private readonly material: Supply.Material[] = Object.values(Supply.Material);

    private overallTypes: string[] = [Supply.UsageType.Disposable];
}
</script>

<style lang="scss" scoped></style>
