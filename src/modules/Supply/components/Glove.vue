<template>
  <medical-card title="Rękawiczki">
    <template v-slot:icon>
      <glovesIcon />
    </template>
    <template v-slot:usageTypes>
      <UsageTypes
        :usageTypes="usageTypes"
        :types="types"
        :getPos="getPos"
        @update:pos="updateSupplies"
      />
    </template>
    <template v-slot:addType>
      <AddType :types="availableTypes" @update:types="onTypeAdd" />
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
import AddType from "@/components/AddType.vue";
import UsageTypes from "@/components/UsageTypes.vue";
import { AppStore } from "@/root";

import glovesIcon from "@/components/icons/gloves.vue";

import { Supply, Size, Material, SupplyListId, Supplies, SupplyCaseOf } from "../Supply";
import { Actions } from "../state";

@Component({
  components: {
    glovesIcon,
    MedicalCard,
    AdditionalDesc,
    AddType,
    UsageTypes
  }
})
export default class GloveCard extends Vue {
  @Prop() readonly item!: Supplies["Glove"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  private readonly types: Size[] = Object.values(Size);
  private readonly availableTypes: Material[] = Object.values(Material);

  get usageTypes(): Material[] {
    return Array.from(
      this.item.positions.reduce((acc, curr) => acc.add(curr.supply.material), new Set([Material.Latex]))
    );
  }

  getPos(material: Material, size: Size) {
    return pipe(
      this.item.positions,
      A.findFirst(a => a.supply.material === material && a.supply.size === size),
      O.map(a => a.supply),
      O.getOrElse(() => Supply.Glove({ size, material, quantity: 0 }))
    );
  }

  onTypeAdd(material: Material) {
    if (this.usageTypes.includes(material)) {
      return;
    }

    this.rxStore.action$.next(
      Actions.ADD_SUPPLY_INTENT({
        listId: this.suppliesListId,
        supply: Supply.Glove({ size: Size.XS, material, quantity: 0 })
      })
    );
  }

  modifyDesc(text: string) {
    this.rxStore.action$.next(Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Glove" }));
  }

  updateSupplies(pos: SupplyCaseOf<"Glove">) {
    const listId = this.suppliesListId;
    const supply = Supply.Glove(pos);

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.size === pos.size && a.supply.material === pos.material),
      O.map(({ id }) => Actions.UPDATE_SUPPLY({ id, listId, supply })),
      O.getOrElse<Actions>(() => Actions.ADD_SUPPLY_INTENT({ listId, supply }))
    );

    this.rxStore.action$.next(action);
  }
}
</script>
