<template>
    <div class="step-main">
        <article class="step-desc">
            <h2>Twoje podsumowanie</h2>
            <p>
                Już prawie kończymy! Sprawdź tylko czy Twoje zgłoszenie się zgadza. Pamietaj, że stawka jest wysoka,
                wspólnie ratujemy zdrowie i życie ludzkie. To dobrze, że prosisz o pomoc!
            </p>
            <img class="step-img" src="@/assets/need-help.svg" alt />
        </article>
        <div class="summary">
            <v-container>
                <v-form ref="form">
                    <div class="summary__contact">
                        <article v-if="address">
                            <h2>Twoja placówka czekająca na pomoc:</h2>
                            <Address :contact="address" />
                        </article>
                        <article v-else>
                            <h2 class="warn">Brak wybranej placówki!</h2>
                            <p>
                                by ją wybrać wróć do
                                <router-link to="/potrzebujacy/1">kroku pierwszego</router-link>
                            </p>
                        </article>
                    </div>

                    <div class="summary__demand">
                        <article v-if="supplies.length > 0">
                            <h2>Produkty, których potrzebujesz</h2>
                            <supply-summary :supplies="supplies" />
                        </article>
                        <article v-else>
                            <h2 class="warn">Nie masz wybranych żadnych produktów!</h2>
                            <p>
                                by je dodać wróć
                                <router-link to="/potrzebujacy/2">poprzedniego kroku</router-link>
                            </p>
                        </article>
                    </div>

                    <div class="summary__other">
                        <h2>Dodaj komentarz</h2>
                        <v-row>
                            <v-text-field v-model="comment" label="Komentarz..." filled></v-text-field>
                        </v-row>

                        <terms-checkbox :isChecked.sync="isTermsOfServiceAccepted" />

                        <v-row class="step-nav">
                            <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
                            <v-btn
                                color="primary"
                                @click="onSubmit"
                                class="go-next-btn"
                            >Potwierdź Zgłoszenie</v-btn>
                        </v-row>
                    </div>
                </v-form>
            </v-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";
import voiceIcon from "@/components/icons/voice.vue";
import Address from "@/components/Address.vue";
import SupplySummary from "../SupplySummary.vue";

import TermsCheckbox from "@/components/TermsCheckBox.vue";

import { Step } from "./Step";

type VForm = Vue & { validate: () => boolean };

@Component({
    components: {
        voiceIcon,
        Address,
        SupplySummary,
        TermsCheckbox
    }
})
export default class NecessitousSummary extends Vue {
    @Prop()
    steps!: Partial<Step.Dict>;

    comment = "";
    isTermsOfServiceAccepted = false;

    @Emit("prevStep")
    onPrev(): Step.Summary {
        return this.step;
    }
    @Watch("steps", { immediate: true })
    onStepsChange(steps: Partial<Step.Dict>) {
        this.comment = (steps.summary?.data as Step.SummaryData).comment ?? this.comment;
    }

    get form(): VForm {
        return this.$refs.form as VForm;
    }

    onSubmit() {
        if (this.form.validate()) {
            this.$emit("nextStep", this.step);
            this.$emit("sendData");
        }
    }

    private get supplies() {
        console.log(this.steps);
        return Step.Supplies.toSummary((this.steps?.demand as Step.Demand | undefined)?.data.supplies);
    }

    private get address() {
        return this.steps.contact?.data;
    }

    private get step() {
        return Step.Summary(this.comment === "" ? {} : { comment: this.comment });
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
    &__demand {
        h2 {
            color: var(--text-primary-light);
            margin-bottom: 1.2rem;
        }

        article {
            margin-bottom: 2.8rem;
        }

        .warn {
            color: #edbf56;
            font-weight: bold;
        }
    }
}
</style>
