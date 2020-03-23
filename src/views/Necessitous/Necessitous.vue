<template>
    <router-view @nextStep="onNextStep" @prevStep="onPrevStep" @sendData="onSendData"></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Step } from "./Step";

@Component
export default class Necessitous extends Vue {
    steps = {} as Record<Step["type"], Step>;

    onNextStep(step: Step) {
        this.setStep(step);
        this.$router.push({ path: Step.nextPath(step) });
    }

    onPrevStep(step: Step) {
        this.setStep(step);
        this.$router.push({ path: Step.prevPath(step) });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSendData() {}

    private setStep(step: Step) {
        this.steps[step.type] = step;
    }
}
</script>
