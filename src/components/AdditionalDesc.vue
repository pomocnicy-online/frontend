<template>
  <v-row>
    <v-col cols="12">
      <v-textarea
        filled
        height="136"
        name="description"
        no-resize
        label="Opis / inny rodzaj (Opcjonalnie)"
        :value="description"
        @input="$emit('update:description', $event)"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AdditionalDesc extends Vue {
  @Prop() description!: string;
}
</script>