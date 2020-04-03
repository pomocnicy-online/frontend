<template>
    <div class="main">
        <div>
            <article class="desc">
                <h2>Wszystko pieknie, ale produkty jakoś trzeba dostarczyć!</h2>
                <p>
                    Masz materiały, ale nie masz jak ich przekazać? Znajdź kierowcę z okolicy! Jesteś zmotoryzowany i
                    chcesz pomóc? Zostań naszym kierowcą - wolontariuszem!
                </p>
            </article>
            <img src="@/assets/landing.svg" alt />
        </div>

        <aside class="action-items">
            <article class="action-item">
                <div class="action-item__content">
                    <h2>
                        Szukasz transportu?
                        <br />Znajdź kierowcę!
                    </h2>
                    <p>
                        Jesli chcesz pomóc, a nie jesteś zmotoryzowany - nie szkodzi! Umów się z jednym z naszych
                        kierowców ze swojej okolicy!
                    </p>
                    <v-btn class="action-link" color="primary" to="/transport-potrzebujacy/1">Zgłoś potrzebę</v-btn>
                </div>
                <people-icon class="action-item__icon" />
            </article>
            <article class="action-item">
                <div class="action-item__content">
                    <h2>Zostań kierowcą!</h2>
                    <p>
                        Masz auto, motor, skuter lub nawet rower i chcesz się na coś przydać? Idealnie trafiłeś!
                        Kurierzy-wolontariusze to dla nas skarb i bardzo Cię potrzebujemy!
                    </p>
                    <v-btn class="action-link" color="primary" to="/transport-pomagajacy/1">Zgłoś pomoc</v-btn>
                </div>
                <car-icon class="action-item__icon" />
            </article>
        </aside>
    </div>
</template>

<script>
import peopleIcon from "@/components/icons/people";
import carIcon from "@/components/icons/car";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        peopleIcon,
        carIcon
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
    margin-top: 2rem;

    img {
        display: block;
        width: 100%;
    }

    @include at(small) {
        margin-top: 5rem;
    }

    @include at(medium) {
        margin-top: 12rem;
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
