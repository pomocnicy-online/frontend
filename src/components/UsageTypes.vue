<template>
  <div>
    <v-row v-for="usageType in usageTypes" :key="usageType" align="start" justify="center">
      <v-col cols="4" justify="start" class="pa-7">
        <v-row align="center" justify="center">
          <h3 class="body-1 usage-type__title">{{ $vuetify.lang.t(`$vuetify.types.${item}`) }}</h3>
        </v-row>
      </v-col>
      <v-col cols="8">
        <Types
          v-for="type in types"
          :pos="getPos(usageType, type)"
          :key="type"
          @update:pos="$emit('update:pos', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Types from "@/components/Types.vue";

@Component({
  components: {
    Types
  }
})
export default class UsageTypes<U extends string, T extends string, S> extends Vue {
  @Prop() readonly types!: T[];
  @Prop() readonly usageTypes!: U[];
  @Prop() readonly getPos!: (u: U, t: T) => S;
}
</script>

<style lang="scss" scoped>
.usage-type {
  &__title {
    color: var(--text-primary);
  }
}
</style>
