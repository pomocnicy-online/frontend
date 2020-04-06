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
import { select } from "@rxsv/core";
import { Component, Vue, Watch, Inject } from "vue-property-decorator";
import { Observable } from "rxjs";
import { pluck, filter } from "rxjs/operators";

import { AppStore } from "@/root";
import voiceIcon from "@/components/icons/voice.vue";
import ContactForm from "@/components/ContactForm.vue";
import StepHeader from "@/components/StepHeader.vue";

import { Step, ContactData } from "./Step";
import { Lenses, Actions } from "./state";

@Component<NecessitousContact>({
  components: {
    voiceIcon,
    ContactForm,
    StepHeader
  }
})
export default class NecessitousContact extends Vue {
  @Inject("rxstore") public readonly rxStore!: AppStore;

  contact: ContactData = { name: "", city: "", street: "", apartment: "", building: "", email: "", phone: "" };

  created() {
    // infinite update loop ??
    // const contact$ = this.rxStore.state$.pipe(
    //   select(Lenses.stepsFromRoot.get),
    //   pluck("Contact"),
    //   filter(c => !!c && Object.values(this.contact).some(a => a !== ""))
    // ) as Observable<ContactData>;
    // this.$subscribeTo(contact$, c => (this.contact = c));
  }

  @Watch("contact")
  onContactChange(contact: ContactData) {
    this.rxStore.action$.next(Actions.SET_NECESSITOUS_STEP(Step.Contact(contact)));
  }

  onSubmit() {
    this.rxStore.action$.next(Actions.NEXT_NECESSITOUS_STEP(Step.Contact(this.contact)));
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
