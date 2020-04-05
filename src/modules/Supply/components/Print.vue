<template>
  <medical-card title="Druk 3D" class="print-card">
    <template v-slot:icon>
      <printIcon />
    </template>
    <template v-slot:usageTypes>
      <Types
        class="print-card__types"
        v-for="type in printType"
        :key="type"
        justifyTypes="start"
        justifyCounter="end"
        :usageType="type"
        :type="type"
        :updateSupplies="updateSupplies"
      />
    </template>
    <template v-slot:additionalDesc>
      <AdditionalDesc :description="item.description" @update:description="modifyDesc" />
    </template>
  </medical-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import * as A from "fp-ts/es6/Array";
import * as O from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";

import MedicalCard from "@/components/MedicalCard.vue";
import AdditionalDesc from "@/components/AdditionalDesc.vue";
import Types from "@/components/Types.vue";
import printIcon from "@/components/icons/print.vue";

import { PrintType, Supplies, SupplyListId, Supply } from "../Supply";
import { AppStore } from "@/root";
import { Actions } from "../state";

@Component({
  components: {
    MedicalCard,
    AdditionalDesc,
    Types,
    printIcon
  }
})
export default class PrintCard extends Vue {
  @Prop() readonly item!: Supplies["Print"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  private readonly printType: PrintType[] = Object.values(PrintType);

  modifyDesc(text: string) {
    this.rxStore.action$.next(Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Print" }));
  }

  updateSupplies(quantity: number, printType: PrintType) {
    const listId = this.suppliesListId;
    const supply = Supply.Print({ printType, quantity });

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.printType === printType),
      O.map(({ id }) => Actions.UPDATE_SUPPLY({ id, listId, supply })),
      O.getOrElse<Actions>(() => Actions.ADD_SUPPLY_INTENT({ listId, supply }))
    );

    this.rxStore.action$.next(action);
  }
}
</script>

<style lang="scss" scoped>
.usage-type {
  &__title {
    color: var(--text-primary);
  }
}
</style>
<style lang="scss">
.print-card {
  &__types {
    .medical-type__title {
      padding-left: 0.75rem;
    }

    .counter {
      padding-right: 0.75rem;
    }
  }
}
</style>
