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
        telefon: {{ contact.phone }}
        <br />
        email: {{ contact.email }}
    </address>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Step } from "../views/Necessitous/Step";

@Component
export default class Address extends Vue {
    @Prop()
    private contact!: Step.ContactData;

    private get addressNumber() {
        return this.contact.apartment ? `${this.contact.building} / ${this.contact.apartment}` : this.contact.building;
    }
}
</script>

<style lang="scss" scoped></style>
