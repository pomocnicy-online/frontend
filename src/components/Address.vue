<template>
  <address>
    <span>
      {{ contact.name }}
      <br />
    </span>
    <span v-if="contact.postalCode && contact.city">
      {{ contact.postalCode }} {{ contact.city }}
      <br />
    </span>
    <span v-if="contact.street && addressNumber">
      {{ contact.street }} {{ addressNumber }}
      <br />
    </span>
    <span v-if="contact.phone">telefon: {{ contact.phone }}</span>
    <br />
    <span v-if="contact.email">email: {{ contact.email }}</span>
  </address>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ContactData } from "@/modules/Necessitous/Step";

@Component
export default class Address extends Vue {
  @Prop()
  private contact!: ContactData;

  private get addressNumber() {
    return this.contact.apartment ? `${this.contact.building} / ${this.contact.apartment}` : this.contact.building;
  }
}
</script>

<style lang="scss" scoped></style>
