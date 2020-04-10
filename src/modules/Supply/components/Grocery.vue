<template>
  <medical-card title="Artykuły spozywcze">
    <template v-slot:icon>
      <groceryIcon />
    </template>
    <template v-slot:usageTypes>
      <AddTypeWithInput
        v-for="index in groceryCount"
        :key="index"
        brand="Grocery"
        :updateSupplies="updateSupplies"
        :deleteSupplies="deleteSupplies"
      />
    </template>
    <template v-slot:addType>
      <AddInputForType :typesCount.sync="groceryCount" />
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
import AddTypeWithInput from "@/components/AddTypeWithInput.vue";
import AddInputForType from "@/components/AddInputForType.vue";
import groceryIcon from "@/components/icons/groceries.vue";

import { Supply, Supplies, SupplyListId } from "../Supply";
import { AppStore } from "@/root";
import { Actions } from "../state";

@Component({
  components: {
    groceryIcon,
    MedicalCard,
    AdditionalDesc,
    AddType,
    UsageTypes,
    Types,
    AddTypeWithInput,
    AddInputForType
  }
})
export default class SupplyContainer extends Vue {
  @Prop() readonly item!: Supplies["Grocery"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  groceryCount = 1;

  updateSupplies(quantity: number, type: string) {
    const listId = this.suppliesListId;
    const supply = Supply.Grocery({ type, quantity });

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.type === type),
      O.map(({ id }) => Actions.UPDATE_SUPPLY({ id, listId, supply })),
      O.getOrElse<Actions>(() => Actions.ADD_SUPPLY_INTENT({ listId, supply }))
    );

    this.rxStore.action$.next(action);
  }

  deleteSupplies(type: string) {
    const id = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.type === type),
      O.map(a => a.id),
      O.toUndefined
    );

    id && this.rxStore.action$.next(Actions.REMOVE_SUPPLY({ id, listId: this.suppliesListId }));
  }
}
</script>
