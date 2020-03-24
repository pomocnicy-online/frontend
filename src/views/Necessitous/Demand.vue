<template>
    <div class="step-main">
        <article class="step-desc">
            <voice-icon />
            <h2>Wybierz zapotrzebowanie</h2>
            <p>
                Określ czego potrzebujesz i w jakiej ilości. Pamiętaj, żeby
                podać w opisie jak najwięcej szczegółowych informacji zeby
                wolontariusz mógł szybko poznać Twoje realne zapotrzebowanie!
            </p>
            <div>Picture placeholder</div>
        </article>
        <section>
            <v-container>
                <step-header
                    name="Szczegóły zapotrzebowania"
                    current="2"
                    outOf="3"
                />
                <!-- render list of supplies here @seba -->
                <v-row class="step-nav">
                    <v-btn
                        text
                        color="primary"
                        @click="onPrev"
                        class="go-next-btn"
                        >Wstecz</v-btn
                    >
                    <v-btn color="primary" @click="onNext">Przejdź dalej</v-btn>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script lang="ts">
import voiceIcon from "@/components/icons/voice.vue";
import StepHeader from "@/components/StepHeader.vue";

import { Component, Vue, Emit } from "vue-property-decorator";
import { Step } from "./Step";
import { Supply } from "../Supply";

@Component({
    components: {
        voiceIcon,
        StepHeader
    }
})
export default class NecessitousDemand extends Vue {
    demand: Step.DemandData = {
        supplies: {} as Partial<Step.Supplies>
    };

    @Emit("nextStep")
    onNext(): Step.Demand {
        return this.step();
    }

    @Emit("prevStep")
    onPrev(): Step.Demand {
        return this.step();
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
