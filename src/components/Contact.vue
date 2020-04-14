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
      </article>
    </div>
  </div>
</template>

<script>

import { Vue } from "vue-property-decorator";

export default class Contact extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
  display: grid;

  img {
    display: block;
    width: 100%;
  }

  @include at(small) {
    margin-top: 5rem;
  }

  @include at(medium) {
    margin-top: 7rem;
    grid-template-columns: 1fr 442px;
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
