<template>
  <v-row align="center" justify="center">
    <v-col cols="7" class="pa-0 pb-2">
      <v-text-field
        @focus="deleteType"
        @blur="updatePosition"
        @input="onTextChange"
        :value="type"
        label="Rodzaj"
        filled
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="4" class="pa-2">
      <Counter
        :type="pos.type"
        :quantity="pos.quantity"
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
import { Shared } from "@/modules/Supply/Supply";

@Component({
  components: {
    Counter
  }
})
export default class AddTypeWithInput extends Vue {
  @Prop() readonly pos!: Shared;

  private onTextChange(type: string) {
    this.$emit("update:pos", { ...this.pos, type });
  }

  private plus() {
    this.updatePosition(Number(this.pos.quantity) + 1);
  }

  private minus() {
    if (this.pos.quantity >= 1) {
      this.updatePosition(Number(this.pos.quantity) - 1);
    }
  }

  private deleteType() {
    this.$emit("delete:pos", this.pos.type);
  }

  private updatePosition(quantity: number) {
    if (quantity === 0) {
      return;
    }

    this.$emit("update:pos", { ...this.pos, quantity });
  }
}
</script>
