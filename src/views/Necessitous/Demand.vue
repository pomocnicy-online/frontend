<template>
    <div class="main">
        <article>
            <voice-icon />
            <h2>Wybierz zapotrzebowanie</h2>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium
            </p>
            <div>Picture placeholder</div>
        </article>
    </div>
</template>

<script lang="ts">
import voiceIcon from "@/components/icons/heart.vue";

import { Component, Vue, Emit } from "vue-property-decorator";
import { Step } from "./Step";

@Component({
    components: {
        voiceIcon
    }
})
export default class NecessitousDemand extends Vue {
    demand: Step.DemandData = {};

    isValid = true;

    @Emit("nextStep")
    onSubmit(): Step.Demand {
        return Step.Demand({ ...this.demand });
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem;

    @include at(medium) {
        margin-top: 8rem;
        grid-template-columns: 1fr 442px;
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
