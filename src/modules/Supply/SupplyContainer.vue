<template>
  <v-col md="12" class="pa-0">
    <Component v-for="(item, brand) in supplies" :key="brand" :is="`${brand}Card`" :item="item" />
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

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

import { Supplies } from "./Supply";

@Component({
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
  }
})
export default class SupplyContainer extends Vue {
  @Prop() supplies!: Supplies;
}
</script>

