<template>
    <div class="step-main">
        <article class="step-desc">
            <h2>Twoje podsumowanie</h2>
            <p>
                Już prawie konczymy! Sprawdź tylko czy Twoje zgłoszenie się zgadza. Pamietaj, że stawka jest wysoka-
                pomagasz ratować zdrowie i zycie ludzkie. Jak dobrze, że mamy Ciebie!
            </p>
            <img class="step-img" src="@/assets/offer-help.svg" alt />
        </article>
        <div class="summary">
            <v-container>
                <div class="summary__contact">
                    <article>
                        <h2>Kontakt do Ciebie:</h2>dane kontaktowe podane na pierwszym stepie
                    </article>
                </div>

                <div class="summary__outlet">
                    <article>
                        <h2>Placówka czekająca na Twoją pomoc:</h2>
                    </article>
                </div>

                <div class="summary__supply">
                    <article>
                        <h2>Produkty, które zdecydowałeś się przekazać:</h2>
                    </article>
                </div>

                <div class="summary__other">
                    <label>
                        <h2>Dodaj komentarz</h2>
                        <v-row>
                            <v-text-field v-model="comment" label="Komentarz..." filled></v-text-field>
                        </v-row>
                        <v-row class="step-nav">
                            <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
                            <v-btn
                                color="primary"
                                @click="onSubmit"
                                class="go-next-btn"
                            >Potwierdź Zgłoszenie</v-btn>
                        </v-row>
                    </label>
                </div>
            </v-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";
import heartIcon from "@/components/icons/heart.vue";
import Address from "@/components/Address.vue";
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";

import { Step } from "./Step";

const isObjEmpty = <T extends object>(obj: T) => Object.keys(obj).length === 0 && obj.constructor === Object;

@Component({
    components: {
        Address
    }
})
export default class CanHelpSummary extends Vue {
    @Prop()
    steps!: Partial<Step.Dict>;

    comment = "";
    willDeliverTheSupplies = false;

    @Emit("prevStep")
    onPrev(): Step.Summary {
        return this.step;
    }
    @Watch("steps", { immediate: true })
    onStepsChange(steps: Partial<Step.Dict>) {
        this.comment = (steps.summary?.data as Step.SummaryData).comment ?? this.comment;
    }

    onSubmit() {
        this.$emit("nextStep", this.step);
        this.$emit("sendData");
    }

    private get step() {
        return Step.Summary({ willDeliverTheSupplies: this.willDeliverTheSupplies, comment: this.comment });
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;

.summary {
    h2 {
        font-size: 16px;
        line-height: 21px;
        font-weight: 400;
        margin-bottom: 1.2rem;
    }

    &__other {
        padding: 10px;

        h2 {
            font-weight: bold;
            margin-left: -10px;
        }

        .other-field {
            margin-bottom: 1rem;
        }

        .step-nav {
            margin-left: -10px;
            margin-right: -10px;
        }
    }

    &__contact,
    &__supply {
        h2 {
            color: var(--text-primary-light);
            margin-bottom: 1.2rem;
        }

        article {
            margin-bottom: 2.8rem;
        }
    }
}
</style>
