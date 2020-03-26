<template>
    <div class="step-main">
        <article class="step-desc">
            <heart-icon />
            <h2>Chce pomóc</h2>
            <p>
                Wypełnij formularz pełnymi danymi kontaktowymi w celu ulatwienia kontaktu z wybranym przez Ciebie
                potrzebującym. * dane osobowe podawane są dobrowolnie na potrzeby akcji charytatywnej.
            </p>
            <div>Picture placeholder</div>
        </article>

        <section class="contact-form">
            <step-header name="Wprowadź dane kontaktowe" current="1" outOf="4" />
            <div>here, contact form</div>
            <!-- <contact-form
                :name.sync="contact.name"
                :addressCity.sync="contact.city"
                :addressStreet.sync="contact.street"
                :addressNumber.sync="contact.building"
                :email.sync="contact.email"
                :phone.sync="contact.phone"
                @submit="onSubmit"
            /> -->
        </section>
    </div>
</template>

<script lang="ts">
import heartIcon from "@/components/icons/heart.vue";
import StepHeader from "@/components/StepHeader.vue";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        StepHeader,
        heartIcon
    }
})
export default class CanHelpContact extends Vue {
    contact: Step.ContactData = {
        name: "",
        surname: "",
        city: "",
        street: "",
        building: "",
        email: "",
        phone: ""
    };

    @Prop()
    steps!: Step.Dict;
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
