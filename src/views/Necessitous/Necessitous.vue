<template>
    <router-view
        @nextStep="onNextStep"
        @prevStep="onPrevStep"
        @sendData="onSendData"
        :steps="steps"
    ></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Step } from "./Step";
import { Necessitous } from "../Necessitious";

@Component
export default class NecessitousView extends Vue {
    steps = {} as Step.Dict;

    onNextStep(step: Step) {
        this.steps[step.type] = step;
        this.$router.push({ path: Step.nextPath(step) });
    }

    onPrevStep(step: Step) {
        this.$router.push({ path: Step.prevPath(step) });
    }

    onSendData(data: Necessitous.Request) {
        Necessitous.send(data).then(() => {
            //  redirect to home, show thank you modal
        });
    }
}
</script>
