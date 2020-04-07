<template>
    <div class="main">
        <div>
            <article class="desc">
                <h2>{{outletDetails.medicalCentreCity}}</h2>
                <h3>{{outletDetails.medicalCentreName}}</h3>

            </article>
            <img class="img" src="@/assets/offer-help.svg" alt />
        </div>
        <div>
            <article class="desc">
                <h2>Zapotrzebowanie</h2>
                <medical-card title="Maseczki">
                    <template v-slot:icon>
                        <maskIcon />
                    </template>
                    <!-- <template v-slot:usageTypes>
                        <UsageTypes
                            brand="mask"
                            :usageTypes="usageTypes"
                            :types="styles"
                            :updateSupplies="updateSupplies"
                        />
                    </template>
                    <template v-slot:additionalDesc>
                        <AdditionalDesc :description.sync="supplies.mask.description" />
                    </template> -->
                </medical-card>
            </article>
        </div>
    </div>
</template>

<script>
    import { Component, Vue, Prop } from "vue-property-decorator";
    import MedicalCard from "@/components/MedicalCard.vue";

    import maskIcon from "@/components/icons/mask.vue";
    import otherIcon from "@/components/icons/other.vue";
    import printIcon from "@/components/icons/print.vue";
    import glovesIcon from "@/components/icons/gloves.vue";
    import disinfectantsIcon from "@/components/icons/disinfectants.vue";
    import overallsIcon from "@/components/icons/overalls.vue";
    import psychologicalSupportIcon from "@/components/icons/psychological-support.vue";
    import cleaningProductsIcon from "@/components/icons/cleaning-products.vue";
    import groceriesIcon from "@/components/icons/groceries.vue";
    import sewingSuppliesIcon from "@/components/icons/sewing-supplies.vue";

    @Component({
        components: {
            MedicalCard,
            maskIcon,
            otherIcon,
            glovesIcon,
            overallsIcon,
            disinfectantsIcon,
            cleaningProductsIcon,
            groceriesIcon,
            psychologicalSupportIcon,
            sewingSuppliesIcon,
            printIcon
        }
    })
    export default class Outlet extends Vue {
        outletDetails = {}
        path = '/api/requests'

        async mounted() {
            this.outletDetails = await this.getOutletDetails(this.$route.params.id);
        }

        getOutletDetails(id) {
            return fetch(`${this.path}/${id}` , {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .catch(error => {
                console.log("coś tam wyjebalo")
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/styles.scss";

    .main {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        grid-gap: 3rem;
        margin-top: 2rem;

        img {
            display: block;
            width: 100%;
        }

        @include at(small) {
            margin-top: 5rem;
        }

        @include at(medium) {
            margin-top: rem;
            grid-template-columns: minmax(auto, 1fr) 1fr;
            padding: 2rem;
        }

        h2 {
            font-weight: 600;
            font-size: 24px;
            line-height: 31px;
        }

        p {
            font-weight: 300;
            font-size: 16px;
            line-height: 30px;
        }
    }

    .desc {
        max-width: 31rem;

        h2 {
            margin-bottom: 1rem;
        }
    }
</style>
