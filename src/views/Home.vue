<template>
    <div class="main">
        <div>
            <article class="desc">
                <h2>Wsparcie dla szpitali, placówek medycznych oraz innych placówek</h2>
                <p>
                    Aplikacja została stworzona w celu łatwego i szybkiego wsparcia danej placówki lub wolontariusza w oparciu o
                    realne zapotrzebowanie.

                    <a href="#/kontakt">Czytaj więcej o naszej misji</a>
                </p>               
            </article>
            <br/>

           
            <img src="@/assets/landing.svg" alt />
        </div>
        <div>
            <article class="desc">
                <h2>Aplikacja jest w fazie testów<br/><small>Nie możesz jeszcze dodać zgłoszenia</small></h2>

                <p><a href="https://forms.gle/5izjGcFPVTCKSWcy8" target="_blank">Kliknij tutaj</a> jeżeli chcesz dostać powiadomienie o uruchomieniu aplikacji.</p>
            </article>
            <br/>
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
export default class HelloWorld extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 3rem;
    margin-top: 0rem;

    img {
        display: block;
        width: 100%;
    }

    @include at(small) {
        margin-top: 3rem;
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
        grid-gap: 5rem;
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
