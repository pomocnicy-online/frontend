<template>
  <medical-card title="Druk 3D" class="print-card">
    <template v-slot:icon>
      <printIcon />
    </template>
    <template v-slot:usageTypes>
      <Types
        class="print-card__types"
        v-for="type in printType"
        :key="type"
        brand="Print"
        justifyTypes="start"
        justifyCounter="end"
        :usageTyps="type"
        :type="type"
        :updateSupplies="updateSupplies"
      />
    </template>
    <template v-slot:additionalDesc>
      <AdditionalDesc :description="item.description" />
    </template>
  </medical-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import MedicalCard from "@/components/MedicalCard.vue";
import AdditionalDesc from "@/components/AdditionalDesc.vue";
import AddType from "@/components/AddType.vue";
import UsageTypes from "@/components/UsageTypes.vue";
import Types from "@/components/Types.vue";
import AddTypeWithInput from "@/components/AddTypeWithInput.vue";
import AddInputForType from "@/components/AddInputForType.vue";

import maskIcon from "@/components/icons/mask.vue";
import otherIcon from "@/components/icons/other.vue";
import printIcon from "@/components/icons/print.vue";
import glovesIcon from "@/components/icons/gloves.vue";
import disinfectantsIcon from "@/components/icons/disinfectants.vue";
import overallsIcon from "@/components/icons/overalls.vue";
import psychologicalSupportIcon from "@/components/icons/psychological-support.vue";
import cleaningProductsIcon from "@/components/icons/cleaning-products.vue";
import groceriesIcon from "@/components/icons/groceries.vue";
import sewingSuppliesIcon from "@/components/icons/sewing-supplies.vue";

import { Step, DemandData } from "@/modules/Necessitous/Step";
import { Supply, Style, Size, UsageType, Material, PrintType, SupplyCaseOf } from "../Supply";

@Component({
  components: {
    maskIcon,
    otherIcon,
    glovesIcon,
    overallsIcon,
    disinfectantsIcon,
    cleaningProductsIcon,
    groceriesIcon,
    psychologicalSupportIcon,
    sewingSuppliesIcon,
    MedicalCard,
    AdditionalDesc,
    AddType,
    UsageTypes,
    Types,
    AddTypeWithInput,
    AddInputForType,
    printIcon
  }
})
export default class PrintCard extends Vue {
  @Prop() item!: SupplyCaseOf<"Print">;

  disinfectantCount = 1;
  groceryCount = 1;
  cleaningCount = 1;

  private readonly styles: Style[] = Object.values(Style);
  private readonly sizes: Size[] = Object.values(Size);
  private readonly usageTypes: UsageType[] = Object.values(UsageType);
  private readonly material: Material[] = Object.values(Material);
  private readonly printType: PrintType[] = Object.values(PrintType);

  private overallTypes: string[] = [UsageType.Disposable];
  private gloveTypes: string[] = [Material.Latex];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateSupplies() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteSupplies() {}
}
</script>

<style lang="scss" scoped>
.usage-type {
  &__title {
    color: var(--text-primary);
  }
}
</style>
<style lang="scss">
.print-card {
  &__types {
    .medical-type__title {
      padding-left: 0.75rem;
    }

    .counter {
      padding-right: 0.75rem;
    }
  }
}
</style>

