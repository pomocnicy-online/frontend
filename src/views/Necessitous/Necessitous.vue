<template>
    <router-view
        @nextStep="onNextStep"
        @prevStep="onPrevStep"
        @sendData="onSendData"
        :steps="steps"
    ></router-view>
</template>

<script lang="ts">
import * as TE from "fp-ts/es6/TaskEither";
import { pipe } from "fp-ts/es6/pipeable";
import { Component, Vue } from "vue-property-decorator";
import { Step } from "./Step";
import { Necessitous } from "../Necessitious";

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
            { ...this.steps },
            Necessitous.createRequest,
            TE.fromEither,
            TE.chain(Necessitous.send)
        )().then(() => {
            /** side effect: navigate to thank you page */
        });
    }
}
</script>
