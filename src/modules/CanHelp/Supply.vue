<template>
  <div class="step-main">
    <article class="step-desc">
      <h2>To super, że pomagasz!</h2>
      <p>
        Określ co możesz przekazać i w jakiej ilości. Pamietaj, że pomagać możesz wiele razy, dlatego liczbę materiałów
        wybieraj realnie do swoich możliwości na daną chwilę.
      </p>
      <img class="step-img" src="@/assets/offer-help.svg" alt />
    </article>
    <section>
      <v-container>
        <step-header name="Jak możesz pomóc?" current="3" outOf="4" />
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

@Component<CanHelpSupply>({
  components: {
    StepHeader,
    SupplyContainer
  },
  domStreams: ["next$", "prev$"]
})
export default class CanHelpSupply extends Vue {
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
          map(([, supplies]) => NecessitousActions.NEXT_CAN_HELP_STEP(Step.Supply({ supplies })))
        ),
        this.prev$.pipe(
          withLatestFrom(supplies$),
          map(([, supplies]) => NecessitousActions.PREV_CAN_HELP_STEP(Step.Supply({ supplies })))
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
