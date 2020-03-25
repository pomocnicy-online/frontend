<template>
    <div class="main">
        <article class="desc">
            <h2>
                Wsparcie dla szpitali, placówek medycznych oraz innych placówek
            </h2>
            <p>
                Aplikacja stworzona w celu łatwego i szybkiego wsparcia danej placowki lub wolontariusza w oparciu o
                realne zapotrzebowanie.
            </p>
        </article>

        <aside class="action-items">
            <article class="action-item">
                <div>
                    <h2>Potrzebujący</h2>
                    <p>
                        Zgłoś swoje zapotrzebowanie na niezbędne produkty typu maski, rękawiczki, kombinezony
                    </p>
                    <v-btn color="primary" to="/potrzebujacy/1">
                        Zgłoś potrzebę
                    </v-btn>
                </div>
                <voice-icon />
            </article>
            <article class="action-item">
                <div>
                    <h2>Pomagajacy</h2>
                    <p>
                        Możesz pomóc innym? Wybierz potrzebujacego, sprawdź czego teraz potrzebuje najbardziej i
                        działaj!
                    </p>
                    <v-btn color="primary" to="/pomagajacy/1">Zgłoś pomoc</v-btn>
                </div>
                <heart-icon />
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
    padding: 2rem;

    @include at(medium) {
        margin-top: 10rem;
        grid-template-columns: minmax(auto, 1fr) 1fr;
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
    display: grid;
    grid-gap: 2.5rem;
    justify-content: center;
}

.action-item {
    display: grid;
    grid-template-columns: 15rem 2fr;
    grid-gap: 1rem;

    @include at(medium) {
        grid-template-columns: 20rem 2fr;
        grid-gap: 4rem;
    }

    h2 {
        font-size: 16px;
        line-height: 30px;
    }
}
</style>
