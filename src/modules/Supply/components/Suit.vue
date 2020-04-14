<template>
  <medical-card title="Kombinezony">
    <template v-slot:icon>
      <suitIcon />
    </template>
    <template v-slot:usageTypes>
      <UsageTypes
        :usageTypes="usageTypes"
        :types="types"
        :getPos="getPos"
        @update:pos="updateSupplies"
      />
    </template>
    <template v-slot:additionalDesc>
      <AdditionalDesc :description.sync="item.description" @update:description="modifyDesc" />
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
import UsageTypes from "@/components/UsageTypes.vue";
import suitIcon from "@/components/icons/overalls.vue";
import { AppStore } from "@/root";

import { Supply, Size, UsageType, Supplies, SupplyListId, SupplyCaseOf } from "../Supply";
import { Actions } from "../state";

@Component({
  components: {
    suitIcon,
    MedicalCard,
    AdditionalDesc,
    UsageTypes
  }
})
export default class SuitCard extends Vue {
  @Prop() readonly item!: Supplies["Suit"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  private readonly types: Size[] = Object.values(Size);
  private readonly usageTypes: string[] = [UsageType.Disposable];

  modifyDesc(text: string) {
    this.rxStore.action$.next(Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Suit" }));
  }

  getPos(type: UsageType, size: Size) {
    return pipe(
      this.item.positions,
      A.findFirst(a => a.supply.size === size && a.supply.type === type),
      O.map(a => a.supply),
      O.getOrElse(() => Supply.Suit({ size, type, quantity: 0 }))
    );
  }

  updateSupplies(pos: SupplyCaseOf<"Suit">) {
    const listId = this.suppliesListId;
    const supply = Supply.Suit(pos);

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.size === pos.size && a.supply.type === pos.type),
      O.map(({ id }) => Actions.UPDATE_SUPPLY({ id, listId, supply })),
      O.getOrElse<Actions>(() => Actions.ADD_SUPPLY_INTENT({ listId, supply }))
    );

    this.rxStore.action$.next(action);
  }
}
</script>