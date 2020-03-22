<template>
    <div class="main">
        <article>
            <heart-icon />
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

        <contact-form />
    </div>
</template>

<script>
import heartIcon from "@/components/icons/heart";
import ContactForm from "@/components/ContactForm";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        heartIcon,
        ContactForm
    }
})
export default class Necessitous extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
