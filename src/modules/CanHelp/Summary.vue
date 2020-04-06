<template>
  <div class="step-main">
    <article class="step-desc">
      <h2>Twoje podsumowanie</h2>
      <p>
        Już prawie konczymy! Sprawdź tylko czy Twoje zgłoszenie się zgadza. Pamietaj, że stawka jest wysoka- pomagasz
        ratować zdrowie i zycie ludzkie. Jak dobrze, że mamy Ciebie!
      </p>
      <img class="step-img" src="@/assets/offer-help.svg" alt />
    </article>
    <div class="summary">
      <v-container>
        <v-form v-model="valid" ref="form">
          <div class="summary__contact">
            <article v-if="contact">
              <h2>Kontakt do Ciebie:</h2>
              <Address :contact="contact" />
            </article>
            <article v-else>
              <h2 class="warn">Brak danych kontakowych</h2>
              <p>
                by je dodać wróć do
                <router-link to="/pomagajacy/1">kroku pierwszego</router-link>
              </p>
            </article>
          </div>

          <div class="summary__outlet">
            <article v-if="outlet">
              <h2>Placówka czekająca na Twoją pomoc:</h2>
              <Address :contact="outlet" />
              <br />
              <p>Szczegółowe dane kontaktowe placówki otrzymasz na maila po wysłaniu zgłoszenia.</p>
            </article>
            <article v-else>
              <h2 class="warn">Brak wybranej placówki</h2>
              <p>
                by ją wybrać wróc do
                <router-link to="/pomagajacy/2">kroku drugiego</router-link>
              </p>
            </article>
          </div>

          <div class="summary__supply">
            <article v-if="supplies.length > 0">
              <h2>Produkty, które zdecydowałeś się przekazać:</h2>
              <supply-summary :supplies="supplies" />

              <!-- not supported by backend -->
              <!-- <label>
                            <v-row class="summary__deliver-checkbox">
                                <v-checkbox v-model="willDeliverTheSupplies" />Dostarczę produkty
                            </v-row>
              </label>-->
            </article>
            <article v-else>
              <h2 class="warn">Nie masz wybranych żadnych produktów!</h2>
              <p>
                by je dodać wróć
                <router-link to="/pomagajacy/3">poprzedniego kroku</router-link>
              </p>
            </article>
          </div>

          <div class="summary__other">
            <div>
              <label>
                <h2>Dodaj komentarz</h2>
                <v-row>
                  <v-text-field v-model="comment" label="Komentarz..." filled></v-text-field>
                </v-row>
              </label>

              <terms-checkbox :isChecked.sync="isTermsOfServiceAccepted" />

              <v-row class="step-nav">
                <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
                <v-btn color="primary" @click="onSubmit" class="go-next-btn">Potwierdź Zgłoszenie</v-btn>
              </v-row>
            </div>
          </div>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";
import Address from "@/components/Address.vue";
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import * as A from "fp-ts/es6/Array";

import TermsCheckbox from "@/components/TermsCheckBox.vue";
import { toSummary } from "@/modules/Supply/Supply";
import SupplySummary from "@/modules/Supply/SupplySummary.vue";

import { StepDict, Step, OutletData } from "./Step";
import { Step as NecessitousStep } from "../Necessitous/Step";

type VForm = Vue & { validate: () => boolean };

@Component({
  components: {
    Address,
    SupplySummary,
    TermsCheckbox
  }
})
export default class CanHelpSummary extends Vue {
  @Prop()
  steps!: Partial<StepDict>;

  comment = "";
  willDeliverTheSupplies = false;
  isTermsOfServiceAccepted = false;

  //   @Emit("prevStep")
  //   onPrev(): Step.Summary {
  //     return this.step;
  //   }
  //   @Watch("steps", { immediate: true })
  //   onStepsChange(steps: Partial<StepDict>) {
  //     const summaryData = steps.summary?.data as Step.SummaryData | undefined;
  //     this.comment = summaryData?.comment ?? this.comment;
  //     this.willDeliverTheSupplies = summaryData?.willDeliverTheSupplies ?? false;
  //   }

  onSubmit() {
    if (this.form.validate()) {
      this.$emit("nextStep", this.step);
      this.$emit("sendData");
    }
  }

  get form(): VForm {
    return this.$refs.form as VForm;
  }

  private get supplies() {
    return toSummary(this.steps?.Supply?.supplies);
  }

  private get outlet() {
    return pipe(O.fromNullable(this.steps.Outlet?.request), O.chain(A.head), O.toUndefined);
  }

  private get contact() {
    return this.steps.Contact;
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

  &__deliver-checkbox {
    display: flex;
    align-items: center;
    padding-left: 1rem;
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

  &__outlet,
  &__contact,
  &__supply {
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