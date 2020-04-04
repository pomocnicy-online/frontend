<template>
  <div class="step-main">
    <article class="step-desc">
      <h2>Potrzebuję pomocy</h2>
      <p>
        Wypełnij formularz pełnymi danymi placówki lub jeśli szukasz pomocy indywidualnie, zostaw swoje dane kontaktowe,
        żeby wolontariusze mogli szybko znaleźć Twoje ogłoszenie! *dane osobowe są podawane dobrowolnie na potrzeby
        akcji charytatywnej
      </p>
      <img class="step-img" src="@/assets/need-help.svg" alt />
    </article>

    <section class="contact-form">
      <step-header name="Kto potrzebuje pomocy:" current="1" outOf="3" />
      <contact-form
        namePlaceholder="Nazwa firmy, placówka"
        :name.sync="contact.name"
        :addressCity.sync="contact.city"
        :addressStreet.sync="contact.street"
        :addressNumber.sync="contact.building"
        :email.sync="contact.email"
        :phone.sync="contact.phone"
        @submit="onSubmit"
      />
    </section>
  </div>
</template>

<script lang="ts">
import voiceIcon from "@/components/icons/voice.vue";
import ContactForm from "@/components/ContactForm.vue";
import StepHeader from "@/components/StepHeader.vue";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Step, ContactData, StepDict } from "./Step";

@Component({
  components: {
    voiceIcon,
    ContactForm,
    StepHeader
  }
})
export default class NecessitousContact extends Vue {
  contact: ContactData = {
    name: "",
    city: "",
    street: "",
    apartment: "",
    building: "",
    email: "",
    phone: ""
  };

  @Prop()
  steps!: StepDict;

  @Watch("steps", { immediate: true })
  onStepsChange(steps: Partial<StepDict>) {
    if (steps.Contact) {
      this.contact = steps.Contact;
    }
  }

  onSubmit() {
    this.$emit("nextStep", Step.Contact({ ...this.contact }));
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.contact-form {
  width: 100%;
}

@include step-main;
@include step-desc;
</style>