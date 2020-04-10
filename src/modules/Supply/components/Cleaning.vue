<template>
  <medical-card title="Inne środki czystości">
    <template v-slot:icon>
      <cleaningProductsIcon />
    </template>
    <template v-slot:usageTypes>
      <AddTypeWithInput
        v-for="pos in item.positions"
        :key="pos.id"
        :pos="pos"
        @update:pos="onSuppliesUpdate"
        @delete:pos="onSuppliesDelete"
      />
    </template>
    <template v-slot:addType>
      <AddInputForType @update:typesCount="onTypesCountChange" />
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
import AddTypeWithInput from "@/components/AddTypeWithInput.vue";
import AddInputForType from "@/components/AddInputForType.vue";
import cleaningProductsIcon from "@/components/icons/cleaning-products.vue";
import { AppStore } from "@/root";
import { M } from "@/common/prelude";

import { Supply, Supplies, SupplyListId, Shared } from "../Supply";
import { Actions } from "../state";

@Component<CleaningCard>({
  components: {
    cleaningProductsIcon,
    MedicalCard,
    AdditionalDesc,
    AddTypeWithInput,
    AddInputForType
  }
})
export default class CleaningCard extends Vue {
  @Prop() readonly item!: Supplies["Cleaning"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  onTypesCountChange() {
    this.onSuppliesUpdate({ quantity: 0, type: "" });
  }

  onSuppliesUpdate({ quantity, type }: Shared) {
    const listId = this.suppliesListId;
    const supply = Supply.Cleaning({ type, quantity });

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.type === type),
      O.map(({ id }) => Actions.UPDATE_SUPPLY({ id, listId, supply })),
      O.getOrElse<Actions>(() => Actions.ADD_SUPPLY_INTENT({ listId, supply }))
    );

    this.rxStore.action$.next(action);
  }

  onSuppliesDelete(type: string) {
    pipe(
      this.item.positions,
      A.findFirst(a => a.supply.type === type),
      O.map(a => a.id),
      M.tap(id => this.rxStore.action$.next(Actions.REMOVE_SUPPLY({ id, listId: this.suppliesListId })))
    );
  }
}
</script>

