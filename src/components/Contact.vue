<template>
  <div class="main">
    <div>
      <article class="desc">
        <h2>Nasza misja</h2>
        <p>
          Naszą wspólną misją jest wsparcie placówek medycznych podczas walki z koronawirusem. Poprzez dobry proces,
          odpowiednie skoordynowanie działań oraz dobry przepływ informacji możemy dostarczyć ogromne ilości niezbędnych
          środków takich jak maski, płyny dezynfekujące, rękawiczki, kombinezony, artykuły spożywcze czy nawet niezbędne
          wsparcie psychologiczne.
          <br />
          <br />Dzięki naszej aplikacji każdy będzie mógł wspomóc placówkę w swojej
          okolicy, niezależnie od rodzaju pomocy.
          <br />
          <br />
        </p>
      </article>
      <img class="img" src="@/assets/offer-help.svg" alt />
    </div>
    <div>
      <article class="desc">
        <h2>Chcesz budować aplikację razem z nami?</h2>
        <p>
          Nasz zespół składa się z zdolnych programistów, grafików, product ownerów, ale pomagają nawet prawnicy.
          <br />
          <br />Jeśli chcesz dołączyć do nas lub chciałbyś zadać jakieś pytanie zapraszamy do kontaktu
          <a
            href="mailto:info@pomocnicy.online"
          >info@pomocnicy.online</a>.
        </p>
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
    margin-top: rem;
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
    margin-bottom: 1rem;
  }
}
</style>
