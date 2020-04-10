<template>
  <v-row align="center" class="pa-2">
    <v-btn depressed class="mx-2" fab dark x-small color="primary" @click="updateCount">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <h3 class="body-1 medical-card__title">DODAJ INNY RODZAJ</h3>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AddInputForType extends Vue {
  private updateCount() {
    this.$emit("update:typesCount");
  }
}
</script>