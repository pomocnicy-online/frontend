<template>
  <v-row align="center" class="pa-2">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn depressed v-on="on" class="mx-2" fab dark x-small color="primary">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in types"
          :key="index"
          @click="$emit('update:types',item)"
        >
          <v-list-item-title>{{ $vuetify.lang.t(`$vuetify.types.${item}`) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <h3 class="body-1 medical-card__title">DODAJ INNY RODZAJ</h3>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AddType extends Vue {
  @Prop() types!: string[];
}
</script>