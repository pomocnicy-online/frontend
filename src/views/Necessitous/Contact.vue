<template>
    <div class="main">
        <article>
            <voice-icon />
            <h2>Potrzebuję pomocy</h2>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium
            </p>
            <div>Picture placeholder</div>
        </article>

        <contact-form
            class="contact-form"
            :name.sync="contact.name"
            :addressCity.sync="contact.city"
            :addressStreet.sync="contact.street"
            :addressNumber.sync="contact.number"
            :email.sync="contact.email"
            :phone.sync="contact.phone"
            @submit="onSubmit"
        />
    </div>
</template>

<script lang="ts">
import voiceIcon from "@/components/icons/heart.vue";
import ContactForm from "@/components/ContactForm.vue";

import { Component, Vue } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        voiceIcon,
        ContactForm
    }
})
export default class NecessitousContact extends Vue {
    contact: Step.ContactData = {
        name: "",
        city: "",
        street: "",
        number: "",
        email: "",
        phone: ""
    };

    isValid = true;

    onSubmit() {
        this.$emit("nextStep", Step.Contact({ ...this.contact }));
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem;

    @include at(medium) {
        margin-top: 8rem;
        grid-template-columns: 1fr 442px;
    }

    h2 {
        font-weight: 600;
        font-size: 24px;
        line-height: 31px;
    }

    p {
        font-weight: 300;
        font-size: 16px;
        line-height: 30px;
    }
}
</style>
