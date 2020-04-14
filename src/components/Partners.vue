<template>
    <div class="main">
        <div>
            <h2>Partnerzy</h2>
        </div>
        <div class="partners-columns">
           <div class="column">
                <a href="https://ihelpyou.app/" target="_blank"><img class="img img-partners" src="@/assets/ihelpyou.png" alt /></a>
            </div>
            <div class="column">
                <a href="https://miejgest.org/" target="_blank"><img class="img img-gest" src="@/assets/gest.png" alt /></a>
            </div>
        
            <div class="column">
                <a href="https://skygate.io/" target="_blank"><img class="img" src="@/assets/skygate.svg" alt /></a>
            </div>
        </div>
    </div>
   
</template>

<script>

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Partners extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.partners-columns {
    display: grid;
    align-items: center;
    grid-template-columns: auto;
    grid-gap: 3rem;
    justify-items: center;
    margin-top: 2rem;

    img {
        max-width: 300px;
    }

     @include at(medium) {
        grid-template-columns: auto auto auto;
    }
}

.column {
  max-width: 31rem;

  h2 {
    margin-bottom: 1rem;
  }
}

.main {
  margin-top: 2rem;
    grid-template-columns: auto;

  img {
    display: block;
    width: 100%;
  }

  @include at(small) {
    margin-top: 5rem;
  }

  @include at(medium) {
    margin-top: 7rem;
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
</style>
