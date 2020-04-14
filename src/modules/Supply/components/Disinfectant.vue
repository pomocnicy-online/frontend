<template>
  <WithCustomType
    title="Środki do dezynfekcji"
    brand="Disinfectant"
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
export default class DisinfectantCard extends Vue {
  @Prop() readonly item!: Supplies["Disinfectant"];
  @Prop() readonly suppliesListId!: SupplyListId;
}
</script>

