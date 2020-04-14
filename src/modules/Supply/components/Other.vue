<template>
  <medical-card title="Inne">
    <template v-slot:icon>
      <otherIcon />
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

import otherIcon from "@/components/icons/other.vue";
import { Supplies, SupplyListId } from "../Supply";
import { AppStore } from "@/root";
import { Actions } from "../state";

@Component({
  components: {
    otherIcon,
    MedicalCard,
    AdditionalDesc
  }
})
export default class OtherCard extends Vue {
  @Prop() readonly item!: Supplies["Other"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  modifyDesc(text: string) {
    this.rxStore.action$.next(Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "Other" }));
  }
}
</script>
