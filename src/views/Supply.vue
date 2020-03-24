<template>
    <div>
        <v-col md="6">
            <v-card class="mx-auto ma-5" outlined>
                <MedicalItemCardHeader :title="masks.title">
                    <template v-slot:icon>
                        <maskIcon />
                    </template>
                </MedicalItemCardHeader>
                <MedicalCardTypes :items="masks.items" :isChecked="masks.isChecked" />
            </v-card>

            <v-card class="mx-auto ma-5" outlined>
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
                        :description="psychologicalSupport.desc"
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
                        :description="sewingSupplies.desc"
                        :isChecked="sewingSupplies.isChecked"
                    />
                </v-expand-transition>
            </v-card>
        </v-col>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MedicalItemCardHeader from "@/components/MedicalItemCardHeader";
import MedicalCardTypes from "@/components/MedicalCardTypes";
import MedicalItemCardWithInput from "@/components/MedicalItemCardWithInput";
import MedicaItemCardDesc from "@/components/MedicaItemCardDesc";

import maskIcon from "@/components/icons/mask";
import glovesIcon from "@/components/icons/gloves";
import disinfectantsIcon from "@/components/icons/disinfectants";
import overallsIcon from "@/components/icons/overalls";
import psychologicalSupportIcon from "@/components/icons/psychological-support";
import cleaningProductsIcon from "@/components/icons/cleaning-products";
import groceriesIcon from "@/components/icons/groceries";
import sewingSuppliesIcon from "@/components/icons/sewing-supplies";

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
export default class Supply extends Vue {
    private readonly masks = {
        title: "Maseczki",
        items: [
            {
                typeName: "Jednorazowe",
                types: ["damskie", "męskie", "dziecięce"]
            },
            {
                typeName: "Wielorazowe",
                types: ["damskie", "męskie", "dziecięce"]
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
