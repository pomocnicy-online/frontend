<template>
  <v-row align="center" justify="center">
    <v-col cols="7" class="pa-0 pb-2">
      <v-text-field
        @focus="deleteType"
        @blur="updatePosition"
        v-model="kind"
        label="Rodzaj"
        filled
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="4" class="pa-2">
      <Counter :kind="kind" :quantity.sync="quantity" :plus="plus" :minus="minus" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import Counter from "@/components/Counter.vue";

@Component({
  components: {
    Counter
  }
})
export default class AddTypeWithInput extends Vue {
  @Prop() readonly updateSupplies!: any;
  @Prop() readonly deleteSupplies!: any;

  quantity = 0;
  type = "";

  private plus() {
    this.quantity = Number(this.quantity) + 1;
    this.updatePosition();
  }

  private minus() {
    if (this.quantity >= 1) {
      this.quantity = Number(this.quantity) - 1;
      this.updatePosition();
    }
  }

  private deleteType() {
    this.deleteSupplies(this.type);
  }

  @Watch("quantity")
  quantityChanged() {
    this.updatePosition();
  }

  private updatePosition() {
    if (this.quantity === 0) {
      return;
    }

    this.updateSupplies(this.quantity, this.type);
  }
}
</script>
