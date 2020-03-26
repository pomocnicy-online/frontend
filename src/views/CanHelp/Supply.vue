<template>
    <div class="step-main">
        <article class="step-desc">
            <heart-icon />
            <h2>To super, że pomagasz!</h2>
            <p>
                Określ co możesz przekazać i w jakiej ilości. Pamietaj, że pomagać możesz wiele razy, dlatego liczbę
                materiałów wybieraj realnie do swoich możliwości na daną chwilę.
            </p>
            <!-- <img class="step-img" src="@/assets/offer-help.svg" alt /> -->
        </article>
        <section>
            <v-container>
                <step-header name="Jak możesz pomóc?" current="3" outOf="4" />
                <!-- render list of supplies here @seba -->
                <v-row class="step-nav">
                    <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
                    <v-btn color="primary" @click="onNext">Przejdź dalej</v-btn>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script lang="ts">
import heartIcon from "@/components/icons/heart.vue";
import StepHeader from "@/components/StepHeader.vue";

import { Component, Vue, Emit } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        heartIcon,
        StepHeader
    }
})
export default class CanHelpSupply extends Vue {
    supply = { mock: "" };

    @Emit("nextStep")
    onNext(): Step.Supply {
        return this.step();
    }

    @Emit("prevStep")
    onPrev(): Step.Supply {
        return this.step();
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
