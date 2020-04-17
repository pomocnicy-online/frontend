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
        <v-form ref="form">
          <div class="summary__contact">
            <article v-if="address$">
              <h2>Kontakt do Ciebie:</h2>
              <Address :contact="address$" />
            </article>
            <article v-else>
              <h2 class="warn">Brak danych kontaktowych</h2>
              <p>
                by je dodać wróć do
                <router-link to="/pomagajacy/1">kroku pierwszego</router-link>
              </p>
            </article>
          </div>

          <div class="summary__outlet">
            <article v-if="outlet$">
              <h2>Placówka czekająca na Twoją pomoc:</h2>
              <Address :contact="outlet$" />
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
            <article v-if="suppliesSummary$.length > 0">
              <h2>Produkty, które zdecydowałeś się przekazać:</h2>
              <supply-summary :supplies="suppliesSummary$" />

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
                by je dodać wróć do
                <router-link to="/pomagajacy/3">poprzedniego kroku</router-link>
              </p>
            </article>
          </div>

          <div class="summary__other">
            <div>
              <label>
                <h2>Dodaj komentarz</h2>
                <v-row>
                  <v-text-field :value="comment$" @input="onCommentUpdate" label="Komentarz..." filled></v-text-field>
                </v-row>
              </label>

              <terms-checkbox :isChecked.sync="isTermsOfServiceAccepted" />

              <v-row class="step-nav">
                <v-btn text color="primary" v-stream:click="prev$" class="go-next-btn">Wstecz</v-btn>
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
import { select } from "@rxsv/core";
import { Component, Vue, Inject, Prop } from "vue-property-decorator";
import { Observable, merge } from "rxjs";
import { pluck, filter, map, withLatestFrom, startWith } from "rxjs/operators";
import * as O from "fp-ts/es6/Option";
import * as A from "fp-ts/es6/Array";
import { flow } from "fp-ts/es6/function";

import { AppStore } from "@/root";
import Address from "@/components/Address.vue";
import TermsCheckbox from "@/components/TermsCheckBox.vue";
import { toSummary } from "@/modules/Supply/Supply";
import SupplySummary from "@/modules/Supply/SupplySummary.vue";
import { Lenses as SupplyLenses, SupplyListId } from "@/modules/Supply/state";

import { Step } from "./Step";
import { Actions, Lenses } from "./state";

type VForm = Vue & { validate: () => boolean };

@Component<CanHelpSummary>({
  components: {
    Address,
    SupplySummary,
    TermsCheckbox
  },
  domStreams: ["prev$"],
  subscriptions() {
    const { state$, action$ } = this.rxStore;

    const commentUpdate$: Observable<string> = this.$createObservableMethod("onCommentUpdate");
    const submit$: Observable<void> = this.$createObservableMethod("onSubmit");
    const address$ = state$.pipe(select(Lenses.stepsFromRoot.get), pluck("Contact"));
    const comment$ = state$.pipe(
      select(Lenses.stepsFromRoot.get),
      pluck("Summary"),
      map(a => a?.comment ?? "")
    );
    const suppliesSummary$ = state$.pipe(
      select(SupplyLenses.suppliesPerTypeByListId(this.suppliesListId)),
      map(toSummary)
    );

    const outlet$ = this.rxStore.state$.pipe(
      select(Lenses.stepsFromRoot.get),
      map(x => x.Outlet?.request),
      map(flow(O.fromNullable, O.chain(A.head), O.toUndefined))
    );

    const summaryAction$ = merge(
      submit$.pipe(
        filter(() => this.form.validate()),
        map(Actions.CAN_HELP_REQUEST_STARTED)
      ),
      commentUpdate$.pipe(
        startWith(""),
        map(comment => ({ comment, willDeliverTheSupplies: false })),
        map(Step.Summary),
        map(Actions.SET_CAN_HELP_STEP)
      ),
      this.prev$.pipe(
        withLatestFrom(comment$),
        map(([, comment]) => ({ comment, willDeliverTheSupplies: false })),
        map(Step.Summary),
        map(Actions.PREV_CAN_HELP_STEP)
      )
    );

    this.$subscribeTo(summaryAction$, a => action$.next(a));

    return {
      suppliesSummary$,
      address$,
      comment$,
      outlet$
    };
  }
})
export default class CanHelpSummary extends Vue {
  @Inject("rxstore") public readonly rxStore!: AppStore;
  @Prop() private readonly suppliesListId!: SupplyListId;
  private readonly prev$!: Observable<void>;

  isTermsOfServiceAccepted = false;

  get form(): VForm {
    return this.$refs.form as VForm;
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
