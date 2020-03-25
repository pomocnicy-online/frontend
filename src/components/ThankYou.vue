<template>
    <section class="thank-you">
        <h2>Dziękujemy!</h2>
        <p>Twoje zgłoszenie zostało wysłane!</p>
        <q>Starajcie się zostawić Świat, choć trochę lepszym niż go zastaliscie</q>
        <cite>- cyt. Robert Baden-Powell</cite>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { AppStore } from "../state";

@Component
export default class ThankYou extends Vue {
    @Inject("rxstore") public readonly rxStore!: AppStore;
}
</script>

<style lang="scss" scoped>
.thank-you {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    width: calc(100% - 3rem);
    max-width: 60rem;
    height: calc(100vh - 40%);
    max-height: 60rem;

    background: #f4f5f7;
    border-radius: 5px;
}
</style>
