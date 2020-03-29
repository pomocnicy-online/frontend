<template>
    <div class="main">
        <div>
            <h2 class="error-code">
                404
                <span class="heart-broken">💔</span>
            </h2>
            <p>Ta strona nie istnieje, lub jest w trakcie przygotowania.</p>
            <router-link to="/">Wróć na stronę główną</router-link>
        </div>
    </div>
</template>

<script>
import heartIcon from "@/components/icons/heart";
import voiceIcon from "@/components/icons/voice";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        heartIcon,
        voiceIcon
    }
})
export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.error-code {
    font-size: 4rem;

    @include at(small) {
        font-size: 5rem;
    }
}

.heart-broken {
    color: transparent;
    text-shadow: 0 0 0 #d89acc;
}

.main {
    display: grid;
    justify-items: center;
    grid-gap: 3rem;
    margin-top: 7rem;

    @include at(small) {
        margin-top: 10rem;
        padding: 2rem;
    }

    p {
        font-weight: 300;
        font-size: 16px;
        line-height: 30px;
    }
}
</style>
