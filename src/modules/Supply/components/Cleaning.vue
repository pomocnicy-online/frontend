<template>
  <WithCustomType
    title="Inne środki czystości"
    brand="Cleaning"
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
export default class CleaningCard extends Vue {
  @Prop() readonly item!: Supplies["Cleaning"];
  @Prop() readonly suppliesListId!: SupplyListId;
}
</script>

