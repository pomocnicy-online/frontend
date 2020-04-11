<template>
  <v-row align="center" justify="center">
    <v-col cols="7" class="pa-0 pb-2">
      <v-text-field
        @input="onTextChange"
        :value="pos.supply.type"
        label="Rodzaj"
        filled
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="4" class="pa-2">
      <Counter
        :type="pos.supply.type"
        :quantity="pos.supply.quantity"
        @update:quantity="updatePosition"
        :plus="plus"
        :minus="minus"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Counter from "@/components/Counter.vue";
import { Shared, SupplyId } from "@/modules/Supply/Supply";

@Component({
  components: {
    Counter
  }
})
export default class AddTypeWithInput extends Vue {
  @Prop() readonly pos!: { supply: Shared; id: SupplyId };

  onTextChange(type: string) {
    this.$emit("update:pos", { ...this.pos.supply, type }, this.pos.id);
  }

  plus() {
    this.updatePosition(Number(this.pos.supply.quantity) + 1);
  }

  minus() {
    if (this.pos.supply.quantity >= 1) {
      this.updatePosition(Number(this.pos.supply.quantity) - 1);
    }
  }

  deleteType() {
    this.$emit("delete:pos", this.pos.id);
  }

  updatePosition(quantity: number) {
    if (quantity === 0) {
      return;
    }

    this.$emit("update:pos", { ...this.pos.supply, quantity }, this.pos.id);
  }
}
</script>
