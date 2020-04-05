<template>
    <div class="main">
        <div>
            <article class="desc">
                <h2>Nasza misja</h2>
                <p>
                    Wsparcie placówek medycznych podczas <strong>wspólnej</strong> walki z koronawirusem. Koordynując działania oraz przepływ informacji  zapewnijmy razem ogromne ilości niezbędnych środków takich jak:
                    <br/>
                    <br/>
                    Maseczki, rękawiczki, ombinezony, Środki do dezynfekcji, Przyłbice, 
                </p>
            </article>
            <img class="img" src="@/assets/offer-help.svg" alt />
        </div>
        <div>
            <article class="desc">
                <h2>Chcesz budować aplikację razem z nami?</h2>
                <p>
                    Nasz zespół składa się z zdolnych <strong>programistów, grafików, product ownerów, ale pomagają nawet prawnicy</strong>.<br/><br/> Jeśli chcesz dołączyć do nas lub chciałbyś zadać jakieś pytanie zapraszamy do kontaktu <a href="mailto:info@pomocnicy.online">info@pomocnicy.online</a>.
                </p>
                <br/>
                <h2>Partnerzy</h2>       
            </article>
            <a href="https://miejgest.org/" target="_blank"><img class="img img-parnters" src="@/assets/gest.png" alt /></a>
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
        margin-top: 2rem;

        img {
            display: block;
            width: 100%;
        }

        @include at(small) {
            margin-top: 5rem;
        }

        @include at(medium) {
            margin-top: rem;
            grid-template-columns: minmax(auto, 1fr) 1fr;
            padding: 2rem;

            
        }

         .img-partners {
            max-width: 500px;
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
            margin-bottom: 1rem;
        }
    }

   
</style>
