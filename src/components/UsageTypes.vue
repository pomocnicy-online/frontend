<template>
  <div>
    <v-row v-for="item in usageTypes" :key="item" align="start" justify="center">
      <v-col cols="4" justify="start" class="pa-7">
        <v-row align="center" justify="center">
          <h3 class="body-1 usage-type__title">{{ $vuetify.lang.t(`$vuetify.types.${item}`) }}</h3>
        </v-row>
      </v-col>
      <v-col cols="8">
        <Types
          v-for="type in types"
          :key="type"
          :type="type"
          :updateSupplies="updateSupplies"
          :usageType="item"
          :brand="brand"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Types from "@/components/Types.vue";
import { Brand } from "@/modules/Supply/Supply";

@Component({
  components: {
    Types
  }
})
export default class UsageTypes<U extends string, T extends string> extends Vue {
  @Prop() readonly types!: T[];
  @Prop() readonly usageTypes!: U[];
  @Prop() readonly brand!: Brand;
  @Prop() readonly updateSupplies: any;
}
</script>

<style lang="scss" scoped>
.usage-type {
  &__title {
    color: var(--text-primary);
  }
}
</style>
