<template>
    <section class="thank-you">
        <h2>Dziękujemy!</h2>
        <p>Twoje zgłoszenie zostało wysłane!</p>
        <q>Starajcie się zostawić Świat, choć trochę lepszym niż go zastaliscie</q>
        <cite>- cyt. Robert Baden-Powell</cite>

        <delete-button class="thank-you__close" @click="onClose" />
    </section>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import DeleteButton from "@/components/DeleteButton.vue";
import { AppStore, Actions } from "../state";

@Component({
    components: {
        DeleteButton
    }
})
export default class ThankYou extends Vue {
    @Inject("rxstore") public readonly rxStore!: AppStore;

    onClose() {
        this.rxStore.action$.next(Actions.CLOSE_THANK_YOU_MODAL());
    }
}
</script>

<style lang="scss" scoped>
.thank-you {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    box-shadow: -5px 15px 40px -17px rgba(0, 0, 0, 0.4);

    width: calc(100% - 3rem);
    max-width: 60rem;
    height: calc(100vh - 40%);
    max-height: 60rem;
    padding: 2.4rem;

    background: #f4f5f7;
    border-radius: 5px;

    &__close {
        position: absolute;
        top: 2.4rem;
        right: 3rem;
    }
}
</style>
