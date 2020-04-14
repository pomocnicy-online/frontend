<template>
  <medical-card title="Transport">
    <template v-slot:icon>
      <transportIcon />
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

import transportIcon from "@/components/icons/transport.vue";
import { Supplies, SupplyListId } from "../Supply";
import { AppStore } from "@/root";
import { Actions } from "../state";

@Component({
  components: {
    transportIcon,
    MedicalCard,
    AdditionalDesc
  }
})
export default class TransportCard extends Vue {
  @Prop() readonly item!: Supplies["Transport"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  modifyDesc(text: string) {
    this.rxStore.action$.next(
      Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Transport" })
    );
  }
}
</script>
