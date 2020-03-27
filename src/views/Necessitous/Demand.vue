<template>
    <div class="step-main">
        <article class="step-desc">
            <h2>Wybierz zapotrzebowanie</h2>
            <p>
                Określ czego potrzebujesz i w jakiej ilości. Pamiętaj, żeby podać w opisie jak najwięcej szczegółowych
                informacji zeby wolontariusz mógł szybko poznać Twoje realne zapotrzebowanie!
            </p>
            <img class="step-img" src="@/assets/need-help.svg" alt />
        </article>
        <section>
            <v-container class="pa-2">
                <step-header name="Szczegóły zapotrzebowania" current="2" outOf="3" />
                <supply-container :supplies="demand.supplies" :updateSupplies="updateSupplies" />
                <v-row class="step-nav">
                    <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
                    <v-btn color="primary" @click="onNext">Przejdź dalej</v-btn>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script lang="ts">
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import { Component, Vue, Emit } from "vue-property-decorator";

import voiceIcon from "@/components/icons/voice.vue";
import StepHeader from "@/components/StepHeader.vue";
import SupplyContainer from "@/views/SupplyContainer.vue";

import { Step } from "./Step";
import { Supply } from "../Supply";

@Component({
    components: {
        voiceIcon,
        StepHeader,
        SupplyContainer
    }
})
export default class NecessitousDemand extends Vue {
    demand: Step.DemandData = {
        supplies: {
            mask: {
                positions: [],
                description: ""
            },
            glove: {
                positions: [],
                description: ""
            },
            suit: {
                positions: [],
                description: ""
            },
            disinfectant: {
                positions: [],
                description: ""
            },
            cleaning: {
                positions: [],
                description: ""
            },
            other: {
                positions: [],
                description: ""
            },
            grocery: {
                positions: [],
                description: ""
            },
            sewingMaterial: {
                positions: [],
                description: ""
            },
            psychologicalSupport: {
                positions: [],
                description: ""
            },
            print: {
                positions: [],
                description: ""
            }
        } as Step.Supplies
    };

    @Emit("nextStep")
    onNext(): Step.Demand {
        return this.step();
    }

    @Emit("prevStep")
    onPrev(): Step.Demand {
        return this.step();
    }

    private updateSupplies(type: keyof Step.Supplies, position: any) {
        pipe(
            O.fromNullable(this.demand.supplies),
            O.map(supplies => supplies[type]),
            O.map((supply: any) => {
                supply.positions = supply.positions
                    .filter((item: any) =>
                        item.style === position.style && item.type === position.type ? false : true
                    )
                    .filter((item: any) => item.quantity !== 0);

                supply.positions.push(position);
            })
        );
    }

    private step = () => Step.Demand({ ...this.demand });
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;
</style>
