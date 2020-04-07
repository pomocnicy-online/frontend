<template>
  <router-view :suppliesListId="suppliesListId"></router-view>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { AppStore } from "@/root";

import { Actions } from "@/modules/Supply/state";

@Component
export default class CanHelpView extends Vue {
  @Inject("rxstore") public readonly rxStore!: AppStore;
  private readonly suppliesListId = "canhelp-supply";

  created() {
    this.rxStore.action$.next(Actions.ADD_SUPPLY_LIST_ID(this.suppliesListId));
  }
}
</script>
