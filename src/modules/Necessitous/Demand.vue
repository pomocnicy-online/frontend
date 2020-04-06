<template>
  <div class="step-main">
    <article class="step-desc">
      <h2>Wybierz zapotrzebowanie</h2>
      <p>
        Określ czego potrzebujesz i w jakiej ilości. Pamiętaj, żeby podać w opisie jak najwięcej szczegółowych
        informacji zeby wolontariusz mógł szybko poznać Twoje realne zapotrzebowanie!
      </p>
      <img class="step-img" src="@/assets/need-help.svg" alt />
    </article>
    <section>
      <v-container class="pa-2">
        <step-header name="Szczegóły zapotrzebowania" current="2" outOf="3" />
        <supply-container :suppliesListId="suppliesListId" />
        <v-row class="step-nav">
          <v-btn text color="primary" v-stream:click="prev$" class="go-next-btn">Wstecz</v-btn>
          <v-btn color="primary" v-stream:click="next$">Przejdź dalej</v-btn>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop } from "vue-property-decorator";
import { select } from "@rxsv/core";
import { Observable, merge } from "rxjs";
import { withLatestFrom, map } from "rxjs/operators";

import { AppStore } from "@/root";
import StepHeader from "@/components/StepHeader.vue";
import SupplyContainer from "@/modules/Supply/SupplyContainer.vue";
import { Lenses, SupplyListId } from "@/modules/Supply/state";

import { Step } from "./Step";
import { Actions as NecessitousActions } from "./state";

@Component<NecessitousDemand>({
  components: {
    StepHeader,
    SupplyContainer
  },
  domStreams: ["next$", "prev$"]
})
export default class NecessitousDemand extends Vue {
  private readonly next$!: Observable<void>;
  private readonly prev$!: Observable<void>;
  @Inject("rxstore") public readonly rxStore!: AppStore;
  @Prop() private readonly suppliesListId!: SupplyListId;

  created() {
    const supplies$ = this.rxStore.state$.pipe(select(Lenses.suppliesPerTypeByListId(this.suppliesListId)));

    this.$subscribeTo(
      merge(
        this.next$.pipe(
          withLatestFrom(supplies$),
          map(([, supplies]) => NecessitousActions.NEXT_NECESSITOUS_STEP(Step.Demand({ supplies })))
        ),
        this.prev$.pipe(
          withLatestFrom(supplies$),
          map(([, supplies]) => NecessitousActions.PREV_NECESSITOUS_STEP(Step.Demand({ supplies })))
        )
      ),
      a => this.rxStore.action$.next(a)
    );
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;
</style>
