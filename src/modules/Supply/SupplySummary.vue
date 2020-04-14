<template>
  <v-col md="12" class="pa-0">
    <medical-card-header
      v-for="supply in supplies"
      :title="supply.title"
      :key="supply.title"
      class="summary"
    >
      <template v-slot:icon>
        <Icon :brand="supply.brand" />
      </template>
      <template v-slot:desc>
        <v-row class="summary__quantity">
          <span v-if="supply.quantity">{{ supply.quantity }} szt.</span>
        </v-row>
      </template>
    </medical-card-header>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import MedicalCardHeader from "@/components/MedicalCardHeader.vue";
import Icon from "@/components/Icon.vue";

import { SummaryViewData } from "./Supply";

@Component({
  components: {
    Icon,
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
