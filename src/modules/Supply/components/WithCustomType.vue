<template>
  <medical-card :title="title">
    <template v-slot:icon>
      <Icon :brand="brand" />
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
import Icon from "@/componenets/Icon.vue";

import { AppStore } from "@/root";
import { M } from "@/common/prelude";

import { Supply, Supplies, SupplyListId, Shared } from "../Supply";
import { Actions } from "../state";

type SupportedSupplies = "Cleaning" | "Disinfectant" | "Grocery";
type SupportedOrder = Supplies[SupportedSupplies];

@Component({
  components: {
    Icon,
    MedicalCard,
    AdditionalDesc,
    AddTypeWithInput,
    AddInputForType
  }
})
export default class WithCustomType extends Vue {
  @Prop() readonly item!: SupportedOrder;
  @Prop() readonly title!: string;
  @Prop() readonly brand!: SupportedSupplies;
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  get positions(): SupportedOrder["positions"] extends Array<infer T> ? T[] : never {
    return this.item.positions;
  }

  onTypesCountChange() {
    this.onSuppliesUpdate({ quantity: 0, type: "" });
  }

  onSuppliesUpdate({ quantity, type }: Shared) {
    const listId = this.suppliesListId;
    const supply = Supply[this.brand]({ type, quantity });

    const action = pipe(
      this.positions,
      A.findFirst(a => a.supply.type === type),
      O.map(({ id }) => Actions.UPDATE_SUPPLY({ id, listId, supply })),
      O.getOrElse<Actions>(() => Actions.ADD_SUPPLY_INTENT({ listId, supply }))
    );

    this.rxStore.action$.next(action);
  }

  onSuppliesDelete(type: string) {
    pipe(
      this.positions,
      A.findFirst(a => a.supply.type === type),
      O.map(a => a.id),
      M.tap(id => this.rxStore.action$.next(Actions.REMOVE_SUPPLY({ id, listId: this.suppliesListId })))
    );
  }
}
</script>

