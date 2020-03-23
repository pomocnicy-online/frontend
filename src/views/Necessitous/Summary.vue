<template>
    <div class="main">
        <article>
            <voice-icon />
            <h2>Twoje podsumowanie</h2>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium
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
                <v-row>
                    <v-btn
                        text
                        color="primary"
                        @click="onPrev"
                        class="go-next-btn"
                        >Wstecz</v-btn
                    >
                    <v-btn color="primary" @click="onNext" class="go-next-btn"
                        >Potiwerdź Zgłoszenie</v-btn
                    >
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script lang="ts">
import voiceIcon from "@/components/icons/heart.vue";

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

.main {
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem;

    @include at(medium) {
        margin-top: 8rem;
        grid-template-columns: 1fr 442px;
    }

    h2 {
        font-weight: 600;
        font-size: 24px;
        line-height: 31px;
    }

    p {
        font-weight: 300;
        font-size: 16px;
        line-height: 30px;
    }
}
</style>
