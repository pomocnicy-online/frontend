<template>
  <medical-card title="Materiały do szycia">
    <template v-slot:icon>
      <sewingSuppliesIcon />
    </template>
    <template v-slot:additionalDesc>
      <AdditionalDesc :description="item.description" @update:description="modifyDesc" />
    </template>
  </medical-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";

import MedicalCard from "@/components/MedicalCard.vue";
import AdditionalDesc from "@/components/AdditionalDesc.vue";
import sewingSuppliesIcon from "@/components/icons/sewing-supplies.vue";

import { Supplies, SupplyListId } from "../Supply";
import { AppStore } from "@/root";
import { Actions } from "../state";

@Component({
  components: {
    MedicalCard,
    AdditionalDesc,
    sewingSuppliesIcon
  }
})
export default class SewingMaterialCard extends Vue {
  @Prop() readonly item!: Supplies["SewingMaterial"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  modifyDesc(text: string) {
    this.rxStore.action$.next(
      Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "SewingMaterial" })
    );
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
