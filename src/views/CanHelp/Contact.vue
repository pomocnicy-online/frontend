<template>
    <div class="step-main">
        <article class="step-desc">
            <heart-icon />
            <h2>Chce pomóc</h2>
            <p>
                Wypełnij formularz pełnymi danymi kontaktowymi w celu ulatwienia kontaktu z wybranym przez Ciebie
                potrzebującym. * dane osobowe podawane są dobrowolnie na potrzeby akcji charytatywnej.
            </p>
            <img class="step-img" src="@/assets/offer-help.svg" alt />
        </article>

        <section class="contact-form">
            <step-header name="Wprowadź dane kontaktowe" current="1" outOf="4" />
            <contact-form
                :name.sync="contact.name"
                :surname.sync="contact.surname"
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
import heartIcon from "@/components/icons/heart.vue";
import StepHeader from "@/components/StepHeader.vue";
import ContactForm from "@/views/CanHelp/ContactForm.vue";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        StepHeader,
        heartIcon,
        ContactForm
    }
})
export default class CanHelpContact extends Vue {
    contact: Step.ContactData = {
        name: "",
        email: "",
        phone: ""
    };

    @Prop()
    steps!: Step.Dict;

    @Watch("steps", { immediate: true })
    onStepsChange(steps: Partial<Step.Dict>) {
        if (steps.contact) {
            this.contact = steps.contact.data as Step.ContactData;
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
