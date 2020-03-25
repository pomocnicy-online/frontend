<template>
    <v-row>
        <v-col md="6">
            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader title="Maseczki">
                    <template v-slot:icon>
                        <maskIcon />
                    </template>
                </MedicalItemCardHeader>
                <MedicalCardTypes
                    :items="masks.items"
                    :isChecked="masks.isChecked"
                    :types="styles"
                />
            </v-card>

            <!-- <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="gloves.title">
                    <template v-slot:icon>
                        <glovesIcon />
                    </template>
                </MedicalItemCardHeader>
                <MedicalCardTypes :items="gloves.items" :isChecked="gloves.isChecked" />
            </v-card>

            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="disinfectants.title">
                    <template v-slot:icon>
                        <disinfectantsIcon />
                    </template>
                </MedicalItemCardHeader>

                <MedicalItemCardWithInput
                    :items="disinfectants.items"
                    :isChecked="disinfectants.isChecked"
                />
            </v-card>

            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="overalls.title">
                    <template v-slot:icon>
                        <overallsIcon />
                    </template>
                </MedicalItemCardHeader>
                <MedicalCardTypes :items="overalls.items" :isChecked="overalls.isChecked" />
            </v-card>

            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="cleaningProducts.title">
                    <template v-slot:icon>
                        <cleaningProductsIcon />
                    </template>
                </MedicalItemCardHeader>

                <MedicalItemCardWithInput
                    :items="cleaningProducts.items"
                    :isChecked="cleaningProducts.isChecked"
                />
            </v-card>

            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="psychologicalSupport.title">
                    <template v-slot:icon>
                        <psychologicalSupportIcon />
                    </template>
                </MedicalItemCardHeader>
                <v-expand-transition>
                    <MedicaItemCardDesc
                        :description.sync="psychologicalSupport.desc"
                        :isChecked="psychologicalSupport.isChecked"
                    />
                </v-expand-transition>
            </v-card>

            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="groceries.title">
                    <template v-slot:icon>
                        <groceriesIcon />
                    </template>
                </MedicalItemCardHeader>
                <v-expand-transition>
                    <MedicalItemCardWithInput
                        :items="groceries.items"
                        :isChecked="groceries.isChecked"
                    />
                </v-expand-transition>
            </v-card>

            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="sewingSupplies.title">
                    <template v-slot:icon>
                        <sewingSuppliesIcon />
                    </template>
                </MedicalItemCardHeader>
                <v-expand-transition>
                    <MedicaItemCardDesc
                        :description.sync="sewingSupplies.desc"
                        :isChecked="sewingSupplies.isChecked"
                    />
                </v-expand-transition>
            </v-card>-->
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import MedicalItemCardHeader from "@/components/MedicalItemCardHeader.vue";
import MedicalCardTypes from "@/components/MedicalCardTypes.vue";
import MedicalItemCardWithInput from "@/components/MedicalItemCardWithInput.vue";
import MedicaItemCardDesc from "@/components/MedicaItemCardDesc.vue";

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
        MedicalItemCardWithInput,
        MedicaItemCardDesc,
        MedicalItemCardHeader,
        MedicalCardTypes,
        maskIcon,
        glovesIcon,
        overallsIcon,
        disinfectantsIcon,
        cleaningProductsIcon,
        groceriesIcon,
        psychologicalSupportIcon,
        sewingSuppliesIcon
    }
})
export default class SupplyContainer extends Vue {
    @Prop() supplies!: Step.DemandData;

    private readonly styles: Supply.Style[] = Object.values(Supply.Style);
    private readonly sizes: Supply.Size[] = Object.values(Supply.Size);

    private readonly masks = {
        items: [
            {
                typeName: "Jednorazowe",
                types: "",
                count: 0
            },
            {
                typeName: "Wielorazowe",
                types: "",
                count: 0
            }
        ],
        isChecked: true
    };

    private readonly gloves = {
        title: "Rękawiczki",
        items: [
            {
                typeName: "Lateksowe",
                types: ["XS", "S", "M", "L", "XL"]
            }
        ],
        isChecked: true
    };

    private readonly overalls = {
        title: "Kombinezony",
        items: [
            {
                typeName: "Jednorazowe",
                types: ["XS", "S", "M", "L", "XL"]
            }
        ],
        isChecked: true
    };

    private readonly disinfectants = {
        title: "środki do dezynfekcji",
        items: [],
        isChecked: true
    };

    private readonly cleaningProducts = {
        title: "Inne środki czystości",
        items: [],
        isChecked: true
    };

    private readonly psychologicalSupport = {
        title: "Wsparcie psychologiczne",
        desc: "",
        isChecked: true
    };

    private readonly groceries = {
        title: "Artykuły spozywcze",
        items: [],
        isChecked: true
    };

    private readonly sewingSupplies = {
        title: "Materiały do szycia",
        desc: "",
        isChecked: true
    };
}
</script>

<style lang="scss" scoped>
</style>
