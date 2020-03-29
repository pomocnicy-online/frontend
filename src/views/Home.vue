<template>
    <div class="main">
        <div>
            <article class="desc">
                <h2>Wsparcie dla szpitali, placówek medycznych oraz innych placówek</h2>
                <p>
                    Aplikacja stworzona w celu łatwego i szybkiego wsparcia danej placowki lub wolontariusza w oparciu o
                    realne zapotrzebowanie.
                </p>
            </article>
            <img src="@/assets/landing.svg" alt />
        </div>

        <aside class="action-items">
            <article class="action-item">
                <div class="action-item__content">
                    <h2>Potrzebujący</h2>
                    <p>Zgłoś swoje zapotrzebowanie na niezbędne produkty typu maski, rękawiczki, kombinezony</p>
                    <v-btn class="action-link" color="primary" to="/potrzebujacy/1">Zgłoś potrzebę</v-btn>
                </div>
                <voice-icon class="action-item__icon" />
            </article>
            <article class="action-item">
                <div class="action-item__content">
                    <h2>Pomagajacy</h2>
                    <p>
                        Możesz pomóc innym? Wybierz potrzebujacego, sprawdź czego teraz potrzebuje najbardziej i
                        działaj!
                    </p>
                    <v-btn class="action-link" color="primary" to="/pomagajacy/1">Zgłoś pomoc</v-btn>
                </div>
                <heart-icon class="action-item__icon" />
            </article>
        </aside>
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
export default class HelloWorld extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 3rem;

    img {
        display: block;
        width: 100%;
    }

    @include at(medium) {
        margin-top: 6rem;
        grid-template-columns: minmax(auto, 1fr) 1fr;
        padding: 2rem;
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

.desc {
    max-width: 31rem;

    h2 {
        margin-bottom: 2rem;
    }
}

.action-items {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
}

.action-link {
    width: 70%;
}

.action-item {
    display: grid;
    grid-template-columns: 15rem 2fr;
    grid-gap: 1rem;
    padding: 1.5rem;

    @include at(medium) {
        grid-template-columns: 20rem 2fr;
        grid-gap: 4rem;
    }

    h2 {
        font-size: 16px;
        line-height: 30px;
    }

    &__content {
        display: grid;
        align-content: space-between;
    }

    &__icon {
        display: none;

        @include at(small) {
            display: initial;
        }
    }
}
</style>
