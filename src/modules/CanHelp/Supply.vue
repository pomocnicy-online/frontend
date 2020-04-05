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
        <supply-container :supplies="supplies$" />
        <v-row class="step-nav">
          <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
          <v-btn color="primary" @click="onNext">Przejdź dalej</v-btn>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import { Component, Vue, Emit, Inject } from "vue-property-decorator";
import { Observables } from "vue-rx";
import { select } from "@rxsv/core";

import StepHeader from "@/components/StepHeader.vue";
import SupplyContainer from "@/modules/Supply/SupplyContainer.vue";
import { AppStore } from "@/root";
import { Lenses } from "@/modules/Supply/state";

import { Step } from "./Step";
import { Step as NecessitousStep } from "../Necessitous/Step";

// TODO: this whole thing is almost 1:1 copy of `Demand.vue`, refactor it later

@Component<CanHelpSupply>({
  components: {
    StepHeader,
    SupplyContainer
  },
  subscriptions(): Observables {
    return {
      supplies$: this.rxStore.state$.pipe(select(Lenses.suppliesPerTypeByListId("canHelp-supplies")))
    };
  }
})
export default class CanHelpSupply extends Vue {
  @Inject("rxstore") public readonly rxStore!: AppStore;

  //   @Emit("nextStep")
  //   onNext(): Step.Supply {
  //     return this.step();
  //   }

  //   @Emit("prevStep")
  //   onPrev(): Step.Supply {
  //     return this.step();
  //   }

  //   private updateSupplies(type: keyof NecessitousStep.Supplies, position: any) {
  //     pipe(
  //       O.fromNullable(this.supply.supplies),
  //       O.map(supplies => supplies[type]),
  //       O.map((supply: any) => {
  //         supply.positions = supply.positions
  //           .filter((item: any) => (item.style === position.style && item.type === position.type ? false : true))
  //           .filter((item: any) => item.quantity !== 0);

  //         supply.positions.push(position);
  //       })
  //     );
  //   }

  //   private step = () => Step.Supply({ ...this.supply });
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;
</style>
