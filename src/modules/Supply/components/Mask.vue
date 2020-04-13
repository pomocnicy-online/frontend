<template>
  <medical-card title="Maseczki">
    <template v-slot:icon>
      <maskIcon />
    </template>
    <template v-slot:usageTypes>
      <UsageTypes brand="Mask" :usageTypes="usageTypes" :types="styles" :updateSupplies="updateSupplies" />
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

import { Supply, Style, UsageType, Supplies, SupplyListId } from "../Supply";
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

  private readonly styles: Style[] = Object.values(Style);
  private readonly usageTypes: UsageType[] = Object.values(UsageType);

  modifyDesc(text: string) {
    this.rxStore.action$.next(Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Mask" }));
  }

  updateSupplies(quantity: number, style: Style, type: UsageType) {
    const listId = this.suppliesListId;
    const supply = Supply.Mask({ style, type, quantity });

    const action = pipe(
      this.item.positions,
      A.findFirst(a => a.supply.style === style && a.supply.type === type),
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
