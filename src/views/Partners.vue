<template>
    <div class="main">
        <div>
            <article class="desc">
                <h2>Partnerzy</h2>    
                <a href="https://ihelpyou.app/" target="_blank"><img class="img img-partners" src="@/assets/ihelpyou.png" alt /></a>
            </article>
        </div>
        <div>
            <article class="desc">
                <a href="https://miejgest.org/" target="_blank"><img class="img img-gest" src="@/assets/gest.png" alt /></a>
            </article>
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
            margin-top: 7rem;
            grid-template-columns: minmax(auto, 1fr) 1fr;
            padding: 2rem;    
        }

         .img-partners {
            max-width: 400px;
        }

        .img-gest {
            max-width: 255px;
            margin-top: 100px;
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

        h2 {
            margin-bottom: 1rem;
        }
    }

   
</style>
