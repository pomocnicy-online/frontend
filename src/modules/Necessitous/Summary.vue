<template>
  <div class="step-main">
    <article class="step-desc">
      <h2>Twoje podsumowanie</h2>
      <p>
        Już prawie kończymy! Sprawdź tylko czy Twoje zgłoszenie się zgadza. Pamietaj, że stawka jest wysoka, wspólnie
        ratujemy zdrowie i życie ludzkie. To dobrze, że prosisz o pomoc!
      </p>
      <img class="step-img" src="@/assets/need-help.svg" alt />
    </article>
    <div class="summary">
      <v-container>
        <v-form ref="form">
          <div class="summary__contact">
            <article v-if="address$">
              <h2>Twoja placówka czekająca na pomoc:</h2>
              <Address :contact="address$" />
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
            <article v-if="suppliesSummary$.length > 0">
              <h2>Produkty, których potrzebujesz</h2>
              <supply-summary :supplies="suppliesSummary$" />
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
              <v-btn text color="primary" v-stream:click="prev$" class="go-next-btn">Wstecz</v-btn>
              <v-btn color="primary" @click="onSubmit" class="go-next-btn">Potwierdź Zgłoszenie</v-btn>
            </v-row>
          </div>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { select } from "@rxsv/core";
import { Component, Vue, Watch, Inject, Prop } from "vue-property-decorator";
import { Observable } from "rxjs";
import { pluck, filter, map } from "rxjs/operators";
import { Observables } from "vue-rx";

import { AppStore } from "@/root";
import voiceIcon from "@/components/icons/voice.vue";
import Address from "@/components/Address.vue";
import TermsCheckbox from "@/components/TermsCheckBox.vue";
import { toSummary } from "@/modules/Supply/Supply";
import SupplySummary from "@/modules/Supply/SupplySummary.vue";
import { Lenses as SupplyLenses, SupplyListId } from "@/modules/Supply/state";

import { Step } from "./Step";
import { Actions, Lenses } from "./state";

type VForm = Vue & { validate: () => boolean };

@Component<NecessitousSummary>({
  components: {
    voiceIcon,
    Address,
    SupplySummary,
    TermsCheckbox
  },
  domStreams: ["prev$"],
  subscriptions(): Observables {
    const { state$ } = this.rxStore;

    return {
      suppliesSummary$: state$.pipe(select(SupplyLenses.suppliesPerTypeByListId(this.suppliesListId)), map(toSummary)),
      address$: state$.pipe(select(Lenses.stepsFromRoot.get), pluck("Contact"))
    };
  }
})
export default class NecessitousSummary extends Vue {
  private comment = "";
  private isTermsOfServiceAccepted = false;

  private readonly prev$!: Observable<void>;
  @Inject("rxstore") public readonly rxStore!: AppStore;
  @Prop() private readonly suppliesListId!: SupplyListId;

  get form(): VForm {
    return this.$refs.form as VForm;
  }

  onSubmit() {
    if (this.form.validate()) {
      this.rxStore.action$.next(Actions.REQUEST_STARTED());
    }
  }

  created() {
    const { state$, action$ } = this.rxStore;

    // this.$subscribeTo(
    //   state$.pipe(
    //     select(Lenses.stepsFromRoot.get),
    //     pluck("Summary"),
    //     pluck("comment"),
    //     filter(c => !!c && this.comment !== "")
    //   ) as Observable<string>,
    //   c => (this.comment = c)
    // );

    this.$subscribeTo(
      this.prev$.pipe(map(() => Actions.PREV_NECESSITOUS_STEP(Step.Summary({ comment: this.comment })))),
      a => action$.next(a)
    );
  }

  @Watch("comment")
  onCommentChange(comment: string) {
    this.rxStore.action$.next(Actions.SET_NECESSITOUS_STEP(Step.Summary({ comment })));
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
