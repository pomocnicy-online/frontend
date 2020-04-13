<template>
  <medical-card title="Rękawiczki">
    <template v-slot:icon>
      <glovesIcon />
    </template>
    <template v-slot:usageTypes>
      <UsageTypes brand="Glove" :usageTypes="gloveTypes" :types="sizes" :updateSupplies="updateSupplies" />
    </template>
    <template v-slot:addType>
      <AddType :types="material" :usageTypes.sync="gloveTypes" />
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
import Types from "@/components/Types.vue";
import { AppStore } from "@/root";

import glovesIcon from "@/components/icons/gloves.vue";

import { Supply, Size, Material, SupplyListId, Supplies } from "../Supply";
import { Actions } from "../state";

@Component({
  components: {
    glovesIcon,
    MedicalCard,
    AdditionalDesc,
    AddType,
    UsageTypes,
    Types
  }
})
export default class GloveCard extends Vue {
  @Prop() item!: Supplies["Glove"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  private readonly sizes: Size[] = Object.values(Size);
  private readonly material: Material[] = Object.values(Material);
  private readonly gloveTypes: string[] = [Material.Latex];

  modifyDesc(text: string) {
    this.rxStore.action$.next(Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Glove" }));
  }

  updateSupplies(quantity: number, size: Size, material: Material) {
    const listId = this.suppliesListId;
    const supply = Supply.Glove({ size, material, quantity });

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.size === size && a.supply.material === material),
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
