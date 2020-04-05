<template>
  <medical-card title="Wsparcie psychologiczne">
    <template v-slot:icon>
      <psychologicalSupportIcon />
    </template>
    <template v-slot:additionalDesc>
      <AdditionalDesc :description.sync="item.description" @update:description="modifyDesc" />
    </template>
  </medical-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";

import MedicalCard from "@/components/MedicalCard.vue";
import AdditionalDesc from "@/components/AdditionalDesc.vue";
import psychologicalSupportIcon from "@/components/icons/psychological-support.vue";
import { Supplies, SupplyListId } from "../Supply";
import { AppStore } from "@/root";
import { Actions } from "../state";

@Component({
  components: {
    psychologicalSupportIcon,
    MedicalCard,
    AdditionalDesc
  }
})
export default class PsychologicalSupportCard extends Vue {
  @Prop() readonly item!: Supplies["PsychologicalSupport"];
  @Prop() readonly suppliesListId!: SupplyListId;
  @Inject("rxstore") readonly rxStore!: AppStore;

  modifyDesc(text: string) {
    this.rxStore.action$.next(
      Actions.MODIFY_SUPPLY_TYPE_DESC({ listId: this.suppliesListId, text, brand: "PsychologicalSupport" })
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
