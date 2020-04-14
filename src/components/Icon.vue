<template>
  <Component :is="icon" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import MaskIcon from "@/components/icons/mask.vue";
import GloveIcon from "@/components/icons/gloves.vue";
import DisinfectantIcon from "@/components/icons/disinfectants.vue";
import SuitIcon from "@/components/icons/overalls.vue";
import PsychologicalSupportIcon from "@/components/icons/psychological-support.vue";
import CleaningIcon from "@/components/icons/cleaning-products.vue";
import PrintIcon from "@/components/icons/print.vue";
import GroceryIcon from "@/components/icons/groceries.vue";
import SewingMaterialIcon from "@/components/icons/sewing-supplies.vue";
import TransportIcon from "@/components/icons/transport.vue";
import OtherIcon from "@/components/icons/other.vue";
import { Brand } from "@/modules/Supply/Supply";

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
    TransportIcon
  }
})
export default class Icon extends Vue {
  @Prop() brand!: Brand;

  private get icon() {
    return `${this.brand}Icon`;
  }
}
</script>
