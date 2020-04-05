<template>
  <v-row align="start" justify="center">
    <v-col cols="6" class="pa-4">
      <v-row align="center" :justify="justifyTypes">
        <h3 class="body-1 medical-type__title">{{ $vuetify.lang.t(`$vuetify.types.${type}`) }}</h3>
      </v-row>
    </v-col>
    <v-col cols="6" class="pa-2">
      <Counter
        :quantity.sync="quantity"
        :plus="plus"
        :minus="minus"
        :kind="type"
        :justify="justifyCounter"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import Counter from "@/components/Counter.vue";
import { Brand } from "@/modules/Supply/Supply";

@Component({
  components: {
    Counter
  }
})
export default class Types<U extends string, T extends string> extends Vue {
  @Prop() readonly type!: T;
  @Prop() readonly usageType!: U;
  @Prop() readonly brand!: Brand;
  @Prop() readonly updateSupplies: any;

  @Prop({ default: "center" }) readonly justifyTypes!: string;
  @Prop({ default: "center" }) readonly justifyCounter!: string;

  quantity = 0;

  private plus() {
    this.quantity = Number(this.quantity) + 1;
  }

  private minus() {
    if (this.quantity >= 1) {
      this.quantity = Number(this.quantity) - 1;
    }
  }

  private updatePosition() {
    if (this.quantity === 0) {
      return;
    }

    const position = {
      style: this.type,
      type: this.usageType,
      quantity: this.quantity
    };

    // this.updateSupplies(this.brand, position);
  }

  @Watch("quantity")
  quantityChanged() {
    this.updatePosition();
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
