<template>
  <WithCustomType
    title="Artykuły spożywcze"
    brand="Grocery"
    :item="item"
    :suppliesListId="suppliesListId"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { Supplies, SupplyListId } from "../Supply";
import WithCustomType from "./WithCustomType.vue";

@Component({
  components: {
    WithCustomType
  }
})
export default class GroceryCard extends Vue {
  @Prop() readonly item!: Supplies["Grocery"];
  @Prop() readonly suppliesListId!: SupplyListId;
}
</script>

