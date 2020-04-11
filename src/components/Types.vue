<template>
  <v-row align="start" justify="center">
    <v-col cols="6" class="pa-4">
      <v-row align="center" :justify="justifyTypes">
        <h3 class="body-1 medical-type__title">{{ $vuetify.lang.t(`$vuetify.types.${label}`) }}</h3>
      </v-row>
    </v-col>
    <v-col cols="6" class="pa-2">
      <Counter
        :justify="justifyCounter"
        :plus="plus"
        :minus="minus"
        :type="pos.type"
        :quantity="pos.quantity"
        @update:quantity="updatePosition"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Counter from "@/components/Counter.vue";

@Component({
  components: {
    Counter
  }
})
export default class Types<U extends string, T extends string> extends Vue {
  @Prop() readonly pos!: { quantity: number };
  @Prop() readonly label!: string;
  @Prop({ default: "center" }) readonly justifyTypes!: string;
  @Prop({ default: "center" }) readonly justifyCounter!: string;

  private plus() {
    this.updatePosition(Number(this.pos.quantity) + 1);
  }

  private minus() {
    if (this.pos.quantity >= 1) {
      this.updatePosition(Number(this.pos.quantity) - 1);
    }
  }

  private updatePosition(quantity: number) {
    if (quantity === 0) {
      return;
    }

    this.$emit("update:pos", { ...this.pos, quantity });
  }
}
</script>

<style lang="scss" scoped>
.medical-type {
  &__title {
    color: var(--text-primary);
  }
}
</style>
