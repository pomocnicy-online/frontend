<template>
    <div class="main">
        <div>
            <h2>Instrukcje szycia maseczek</h2>
        </div>
        <div class="columns">
            <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/wcMhjFNEqCo?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/TAfc1KXnu-U?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    </div>
   
</template>

<script>

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {

  }
})
export default class Instructions extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.columns {
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
