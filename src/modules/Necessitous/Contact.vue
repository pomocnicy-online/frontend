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
        :name="name$"
        :addressCity="city$"
        :addressStreet="street$"
        :addressNumber="building$"
        :email="email$"
        :phone="phone$"
        @update:name="updateField('name', $event)"
        @update:addressCity="updateField('city', $event)"
        @update:addressStreet="updateField('street', $event)"
        @update:addressNumber="updateField('building', $event)"
        @update:email="updateField('email', $event)"
        @update:phone="updateField('phone', $event)"
        @submit="onSubmit"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { select } from "@rxsv/core";
import { Component, Vue, Inject } from "vue-property-decorator";
import { Observable, merge } from "rxjs";
import { map, pluck, withLatestFrom } from "rxjs/operators";

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
  },
  subscriptions() {
    const { action$, state$ } = this.rxStore;
    const initialContact = { name: "", city: "", street: "", building: "", email: "", phone: "" };

    const submit$: Observable<void> = this.$createObservableMethod("onSubmit");
    const updateField$: Observable<[string, string]> = this.$createObservableMethod("updateField");
    const contact$: Observable<ContactData> = state$.pipe(
      select(Lenses.stepsFromRoot.get),
      pluck("Contact"),
      map(c => ({ ...initialContact, ...c }))
    );

    const formAction$ = merge(
      updateField$.pipe(
        withLatestFrom(contact$),
        map(([[field, value], c]) => ({ ...c, [field]: value })),
        map(Step.Contact),
        map(Actions.SET_NECESSITOUS_STEP)
      ),
      submit$.pipe(withLatestFrom(contact$), pluck("1"), map(Step.Contact), map(Actions.NEXT_NECESSITOUS_STEP))
    );

    this.$subscribeTo(formAction$, a => action$.next(a));

    return {
      contact$,
      name$: contact$.pipe(pluck("name")),
      city$: contact$.pipe(pluck("city")),
      street$: contact$.pipe(pluck("street")),
      building$: contact$.pipe(pluck("building")),
      email$: contact$.pipe(pluck("email")),
      phone$: contact$.pipe(pluck("phone"))
    };
  }
})
export default class NecessitousContact extends Vue {
  @Inject("rxstore") public readonly rxStore!: AppStore;
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
