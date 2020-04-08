<template>
  <v-col md="12" class="pa-0">
    <Component
      v-for="(item, brand) in supplies$"
      :key="brand"
      :is="`${brand}Card`"
      :item="item"
      :suppliesListId="suppliesListId"
    />
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import { Observables } from "vue-rx";
import { select } from "@rxsv/core";

import { Lenses } from "@/modules/Supply/state";
import { AppStore } from "@/root";

import MaskCard from "./components/Mask.vue";
import GloveCard from "./components/Glove.vue";
import CleaningCard from "./components/Cleaning.vue";
import DisinfectantCard from "./components/Disinfectant.vue";
import SuitCard from "./components/Suit.vue";
import PsychologicalSupportCard from "./components/PsychologicalSupport.vue";
import GroceryCard from "./components/Grocery.vue";
import PrintCard from "./components/Print.vue";
import OtherCard from "./components/Other.vue";
import SewingMaterialCard from "./components/SewingMaterial.vue";
import { SupplyListId } from "./Supply";

@Component<SupplyContainer>({
  components: {
    MaskCard,
    GloveCard,
    CleaningCard,
    SuitCard,
    DisinfectantCard,
    PsychologicalSupportCard,
    GroceryCard,
    PrintCard,
    OtherCard,
    SewingMaterialCard
  },
  subscriptions(): Observables {
    return {
      supplies$: this.rxStore.state$.pipe(select(Lenses.suppliesPerTypeByListId(this.suppliesListId)))
    };
  }
})
export default class SupplyContainer extends Vue {
  @Inject("rxstore") readonly rxStore!: AppStore;
  @Prop() readonly suppliesListId!: SupplyListId;
}
</script>
