<template>
  <v-col md="12" class="pa-0">
    <medical-card-header v-for="supply in supplies" :title="supply.title" :key="supply.title" class="summary">
      <template v-slot:icon>
        <Component :is="supply.icon" />
      </template>
      <template v-slot:desc>
        <v-row class="summary__quantity">
          <span v-if="supply.quantity">{{ supply.quantity }} szt</span>
        </v-row>
      </template>
    </medical-card-header>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import MedicalCardHeader from "@/components/MedicalCardHeader.vue";

// TODO: make one generic icon component
import MaskIcon from "@/components/icons/mask.vue";
import GloveIcon from "@/components/icons/gloves.vue";
import DisinfectantIcon from "@/components/icons/disinfectants.vue";
import SuitIcon from "@/components/icons/overalls.vue";
import PsychologicalSupportIcon from "@/components/icons/psychological-support.vue";
import CleaningIcon from "@/components/icons/cleaning-products.vue";
import PrintIcon from "@/components/icons/print.vue";
import GroceryIcon from "@/components/icons/groceries.vue";
import SewingMaterialIcon from "@/components/icons/sewing-supplies.vue";
import OtherIcon from "@/components/icons/other.vue";

import { SummaryViewData } from "./Supply";

@Component({
  components: {
    MaskIcon,
    GloveIcon,
    OtherIcon,
    DisinfectantIcon,
    CleaningIcon,
    GroceryIcon,
    PsychologicalSupportIcon,
    SewingMaterialIcon,
    SuitIcon,
    PrintIcon,
    MedicalCardHeader
  }
})
export default class SupplyContainer extends Vue {
  @Prop() supplies?: SummaryViewData;
}
</script>

<style lang="scss" scoped>
.summary {
  margin-bottom: 0.5rem;
  height: 4rem;

  &__quantity {
    justify-content: flex-end;
    padding-right: 2rem;
  }
}
</style>
