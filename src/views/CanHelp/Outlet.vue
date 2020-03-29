<template>
    <div class="step-main">
        <article class="step-desc">
            <h2>Wybierz placówkę</h2>
            <p>
                Wybierz komu możesz i chcesz pomóc! Pamietaj żeby określić ilość produktów, które przekażesz
                potrzebującemu, żeby inni wolontariusze widzieli ile jeszcze pozostało. Jeśli będziesz dostarczał
                materiały osobiście lub przez kierowcę, wybierz potrzebującego w swoim rejonie. Pozostałym możesz też
                wysłać paczkę na wskazany adres!
            </p>
            <img class="step-img" src="@/assets/offer-help.svg" alt />
        </article>
        <section>
            <v-container>
                <step-header name="Lokalizacja" current="2" outOf="4" />
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
import StepHeader from "@/components/StepHeader.vue";

import { Component, Vue, Emit } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        StepHeader
    }
})
export default class CanHelpOutlet extends Vue {
    outlet: Step.OutletData = {
        request: [
            {
                requestId: 35,
                name: "XD"
            }
        ]
    };

    @Emit("nextStep")
    onNext(): Step.Outlet {
        return this.step();
    }

    @Emit("prevStep")
    onPrev(): Step.Outlet {
        return this.step();
    }

    private step = () => Step.Outlet({ ...this.outlet });
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;
</style>
