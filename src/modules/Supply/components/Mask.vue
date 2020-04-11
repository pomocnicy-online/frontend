<template>
  <medical-card title="Maseczki">
    <template v-slot:icon>
      <maskIcon />
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
import UsageTypes from "@/components/UsageTypes.vue";
import maskIcon from "@/components/icons/mask.vue";
import { AppStore } from "@/root";

import { Supply, Style, UsageType, Supplies, SupplyListId, SupplyCaseOf } from "../Supply";
import { Actions } from "../state";

@Component({
  components: {
    maskIcon,
    MedicalCard,
    AdditionalDesc,
    UsageTypes
  }
})
export default class MaskCard extends Vue {
  @Prop() readonly item!: Supplies["Mask"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  private readonly types: Style[] = Object.values(Style);
  private readonly usageTypes: UsageType[] = Object.values(UsageType);

  modifyDesc(text: string) {
    this.rxStore.action$.next(Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Mask" }));
  }

  getPos(type: UsageType, style: Style) {
    return pipe(
      this.item.positions,
      A.findFirst(a => a.supply.type === type && a.supply.style === style),
      O.map(a => a.supply),
      O.getOrElse(() => Supply.Mask({ type, style, quantity: 0 }))
    );
  }

  updateSupplies(pos: SupplyCaseOf<"Mask">) {
    const listId = this.suppliesListId;
    const supply = Supply.Mask(pos);

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.style === pos.style && a.supply.type === pos.type),
      O.map(({ id }) => Actions.UPDATE_SUPPLY({ id, listId, supply })),
      O.getOrElse<Actions>(() => Actions.ADD_SUPPLY_INTENT({ listId, supply }))
    );

    this.rxStore.action$.next(action);
  }
}
</script>
