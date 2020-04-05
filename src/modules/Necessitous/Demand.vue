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
          <v-btn text color="primary" @click="onPrev" class="go-next-btn">Wstecz</v-btn>
          <v-btn color="primary" @click="onNext">Przejdź dalej</v-btn>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Inject } from "vue-property-decorator";

import { AppStore } from "@/root";
import StepHeader from "@/components/StepHeader.vue";
import SupplyContainer from "@/modules/Supply/SupplyContainer.vue";
import { Actions } from "@/modules/Supply/state";

@Component<NecessitousDemand>({
  components: {
    StepHeader,
    SupplyContainer
  }
})
export default class NecessitousDemand extends Vue {
  @Inject("rxstore") public readonly rxStore!: AppStore;

  suppliesListId = "necessitous-demand";

  created() {
    this.rxStore.action$.next(Actions.ADD_SUPPLY_LIST_ID(this.suppliesListId));
  }

  @Emit("nextStep")
  onNext() {
    // return this.step();
  }

  @Emit("prevStep")
  onPrev() {
    // return this.step();
  }

  // TODO: getting to previous step doesn't work properly
  // need to refactor `updateSupplies` and the components first

  // @Prop()
  // steps!: Step.Dict;

  // @Watch("steps", { immediate: true })
  // onStepsChange(steps: Partial<Step.Dict>) {
  //     if (steps.demand) {
  //         // this.$set(this.demand, "supplies", (steps.demand.data as Step.DemandData).supplies);
  //         this.demand = steps.demand.data as Step.DemandData;
  //     }
  // }

  // TODO: this function is a mess, refactor it and type properly
  //   private updateSupplies(type: keyof Step.Supplies, position: any) {
  //     pipe(
  //       O.fromNullable(this.demand.supplies),
  //       O.map(supplies => supplies[type]),
  //       O.map((supply: any) => {
  //         supply.positions = supply.positions
  //           .filter((item: any) => (item.style === position.style && item.type === position.type ? false : true))
  //           .filter((item: any) => item.quantity !== 0);

  //         supply.positions.push(position);
  //       })
  //     );
  //   }

  //   private deleteSupplies(type: keyof Step.Supplies, itemType: string) {
  //     pipe(
  //       O.fromNullable(this.demand.supplies),
  //       O.mapNullable(supplies => supplies[type]),
  //       O.map((supply: any) => {
  //         supply.positions = supply.positions.filter((item: any) => item.type !== itemType);
  //       })
  //     );
  //   }

  //   private step = () => Step.Demand({ ...this.demand });
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

@include step-main;
@include step-nav;
@include step-desc;
</style>
