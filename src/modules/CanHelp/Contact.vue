<template>
  <div class="step-main">
    <article class="step-desc">
      <h2>Chce pomóc</h2>
      <p>
        Wypełnij formularz pełnymi danymi kontaktowymi w celu ulatwienia kontaktu z wybranym przez Ciebie potrzebującym.
        * dane osobowe podawane są dobrowolnie na potrzeby akcji charytatywnej.
      </p>
      <img class="step-img" src="@/assets/offer-help.svg" alt />
    </article>

    <section class="contact-form">
      <step-header name="Wprowadź dane kontaktowe" current="1" outOf="4" />
      <contact-form
        namePlaceholder="Imię"
        :name="contact$.name"
        :email="contact$.email"
        :phone="contact$.phone"
        @update:name="updateField('name', $event)"
        @update:email="updateField('email', $event)"
        @update:phone="updateField('phone', $event)"
        @submit="onSubmit"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { select } from "@rxsv/core";
import { pluck, map, withLatestFrom } from "rxjs/operators";
import { Component, Vue, Inject } from "vue-property-decorator";

import StepHeader from "@/components/StepHeader.vue";
import ContactForm from "@/components/ContactForm.vue";

import { Step } from "./Step";
import { AppStore } from "../../root";
import { Lenses, Actions } from "./state";
import { Observable, merge } from "rxjs";

@Component<CanHelpContact>({
  components: {
    StepHeader,
    ContactForm
  },
  subscriptions() {
    const { state$, action$ } = this.rxStore;
    const initialContact = { name: "", email: "", phone: "" };

    const submit$: Observable<void> = this.$createObservableMethod("onSubmit");
    const updateField$: Observable<[string, string]> = this.$createObservableMethod("updateField");
    const contact$ = state$.pipe(
      select(Lenses.stepsFromRoot.get),
      pluck("Contact"),
      map(c => ({ ...initialContact, ...c }))
    );

    const formAction$ = merge(
      updateField$.pipe(
        withLatestFrom(contact$),
        map(([[field, value], c]) => ({ ...c, [field]: value })),
        map(Step.Contact),
        map(Actions.SET_CAN_HELP_STEP)
      ),
      submit$.pipe(withLatestFrom(contact$), pluck("1"), map(Step.Contact), map(Actions.NEXT_CAN_HELP_STEP))
    );

    this.$subscribeTo(formAction$, a => action$.next(a));

    return {
      contact$
    };
  }
})
export default class CanHelpContact extends Vue {
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
