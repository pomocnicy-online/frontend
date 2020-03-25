<template>
    <router-view @nextStep="onNextStep" @prevStep="onPrevStep" @sendData="onSendData" :steps="steps"></router-view>
</template>

<script lang="ts">
import * as TE from "fp-ts/es6/TaskEither";
import { pipe } from "fp-ts/es6/pipeable";
import { Component, Vue } from "vue-property-decorator";
import { Step } from "./Step";
import { Necessitous } from "../Necessitious";
import { Supply } from "../Supply";

@Component
export default class NecessitousView extends Vue {
    steps = {} as Partial<Step.Dict>;

    onNextStep(step: Step) {
        this.steps[step.type] = step;
        this.$router.push({ path: Step.nextPath(step) });
    }

    onPrevStep(step: Step) {
        this.$router.push({ path: Step.prevPath(step) });
    }

    onSendData() {
        pipe(
            // { ...this.steps }, TODO: conenct to forms,
            {
                contact: Step.Contact({
                    street: "Mikołaja Kopernika",
                    building: "1",
                    name: "Szpital Jakiś",
                    city: "Kraków",
                    apartment: "",
                    email: "halko@gg.pl",
                    phone: "123"
                }),
                demand: Step.Demand({
                    supplies: {
                        mask: {
                            positions: [
                                {
                                    type: Supply.UsageType.Reusable,
                                    style: Supply.Style.Male
                                } as Supply.Mask
                            ]
                        }
                    }
                }),
                summary: Step.Summary({
                    comment: "ASAP plz"
                })
            },
            Necessitous.createRequest,
            TE.fromEither,
            TE.chain(Necessitous.send)
        )().then(ek => {
            /** side effect: navigate to thank you page */
        });
    }
}
</script>
