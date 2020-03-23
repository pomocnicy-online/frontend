<template>
    <div class="step-main">
        <article class="step-desc">
            <voice-icon />
            <h2>Twoje podsumowanie</h2>
            <p>
                Już prawie kończymy! Sprawdź tylko czy Twoje zgłoszenie się
                zgadza. Pamietaj, że stawka jest wysoka, wspólnie ratujemy
                zdrowie i życie ludzkie. To dobrze, że prosisz o pomoc!
            </p>
            <div>Picture placeholder</div>
        </article>
        <div>
            <v-container>
                <article>
                    <h2>Twoja placówka czekająca na pomoc:</h2>
                    <address>
                        <!-- todo: address from steps data -->
                    </address>
                </article>
                <article>
                    <h2>Produkty, które zdecydowałeś się przekazać:</h2>
                    <ul>
                        <!-- todo: compute supply items count and render here -->
                    </ul>
                </article>
                <v-row>
                    <v-text-field
                        v-model="comment"
                        label="Komentarz"
                        filled
                    ></v-text-field>
                </v-row>
                <v-row class="step-nav">
                    <v-btn
                        text
                        color="primary"
                        @click="onPrev"
                        class="go-next-btn"
                        >Wstecz</v-btn
                    >
                    <v-btn color="primary" @click="onNext" class="go-next-btn"
                        >Potwierdź Zgłoszenie</v-btn
                    >
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script lang="ts">
import voiceIcon from "@/components/icons/voice.vue";

import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { Step } from "./Step";
import { Necessitous } from "../Necessitious";

@Component({
    components: {
        voiceIcon
    }
})
export default class NecessitousSummary extends Vue {
    @Prop()
    steps!: Step.Dict;

    summary: Step.SummaryData = {};
    comment = "";

    @Emit("sendData")
    onNext(): Necessitous.Request {
        return Necessitous.createRequest({ ...this.steps });
    }

    @Emit("prevStep")
    onPrev(): Step.Summary {
        return this.step();
    }

    private step = () => Step.Summary({ ...this.summary });
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;
</style>
