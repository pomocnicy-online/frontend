<template>
    <div class="main">
        <article>
            <voice-icon />
            <h2>
                Potrzebuję pomocy
            </h2>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium
            </p>
            <div>
                Picture placeholder
            </div>
        </article>

        <contact-form class="contact-form" />
    </div>
</template>

<script>
import voiceIcon from "@/components/icons/heart";
import ContactForm from "@/components/ContactForm";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        voiceIcon,
        ContactForm
    }
})
export default class Necessitous extends Vue {}
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
