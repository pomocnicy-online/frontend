<template>
    <div class="step-main">
        <article class="step-desc">
            <h2>To super, że pomagasz!</h2>
            <p>
                Określ co możesz przekazać i w jakiej ilości. Pamietaj, że pomagać możesz wiele razy, dlatego liczbę
                materiałów wybieraj realnie do swoich możliwości na daną chwilę.
            </p>
            <img class="step-img" src="@/assets/offer-help.svg" alt />
        </article>
        <section>
            <v-container>
                <step-header name="Jak możesz pomóc?" current="3" outOf="4" />
                <supply-container :supplies="supply.supplies" :updateSupplies="updateSupplies" />
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

import StepHeader from "@/components/StepHeader.vue";
import SupplyContainer from "@/views/SupplyContainer.vue";

import { Step } from "./Step";
import { Step as NecessitousStep } from "../Necessitous/Step";

// TODO: this whole thing is almost 1:1 copy of `Demand.vue`, refactor it later

@Component({
    components: {
        StepHeader,
        SupplyContainer
    }
})
export default class CanHelpSupply extends Vue {
    supply: Step.SupplyData = {
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
        }
    };

    @Emit("nextStep")
    onNext(): Step.Supply {
        return this.step();
    }

    @Emit("prevStep")
    onPrev(): Step.Supply {
        return this.step();
    }
    private updateSupplies(type: keyof NecessitousStep.Supplies, position: any) {
        pipe(
            O.fromNullable(this.supply.supplies),
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

    private step = () => Step.Supply({ ...this.supply });
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;
</style>
