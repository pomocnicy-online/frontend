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
import * as O from "fp-ts/es6/Option";
import { AppStore, Actions } from "@/state";
import { Component, Vue, Inject } from "vue-property-decorator";
import { Step } from "./Step";
import { Necessitous } from "../Necessitious";

@Component
export default class NecessitousView extends Vue {
    @Inject("rxstore") public readonly rxStore!: AppStore;

    steps = {} as Partial<Step.Dict>;

    onNextStep(step: Step) {
        this.steps[step.type] = step;

        console.log("steps", this.steps);

        const path = pipe(Step.nextPath(step), O.toUndefined);
        path && this.$router.push({ path });
    }

    onPrevStep(step: Step) {
        const path = pipe(Step.prevPath(step), O.toUndefined);
        path && this.$router.push({ path });
    }

    onSendData() {
        // TODO: move this whole flow to effect(s)
        pipe({ ...this.steps }, Necessitous.createRequest, TE.fromEither, TE.chain(Necessitous.send))().then(() => {
            this.rxStore.action$.next(Actions.SHOW_THANK_YOU_MODAL());
            this.$router.push({ path: "/" });
        });
    }
}
</script>
