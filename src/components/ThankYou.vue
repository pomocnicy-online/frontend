<template>
    <v-overlay :value="isOpen" light color="white" opacity="0.9">
        <v-dialog
            :value="isOpen"
            @click:outside="onClose"
            light
            hide-overlay
            @keydown.esc="onClose"
        >
            <section class="thank-you">
                <div class="thank-you__content">
                    <h2>Dziękujemy!</h2>
                    <p>Twoje zgłoszenie zostało wysłane!</p>
                    <q>Starajcie się zostawić Świat, choć trochę lepszym niż go zastaliscie</q>
                    <cite>- cyt. Robert Baden-Powell</cite>
                </div>
                <img class="thank-you__img" src="@/assets/thank-you.svg" alt />
                <delete-button class="thank-you__close" @click="onClose" />
            </section>
        </v-dialog>
    </v-overlay>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop } from "vue-property-decorator";
import DeleteButton from "@/components/DeleteButton.vue";
import { AppStore, Actions } from "../state";

@Component({
    components: {
        DeleteButton
    }
})
export default class ThankYou extends Vue {
    @Inject("rxstore") public readonly rxStore!: AppStore;

    @Prop()
    private readonly isOpen!: boolean;

    onClose() {
        this.rxStore.action$.next(Actions.CLOSE_THANK_YOU_MODAL());
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.thank-you {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    box-shadow: -5px 15px 40px -17px rgba(0, 0, 0, 0.4);

    width: calc(100% - 3rem);
    max-width: 60rem;
    padding: 2.4rem;
    height: 60%;

    background: #f4f5f7;
    border-radius: 5px;

    &__img {
        margin: 0 auto;
        display: block;
        width: 100%;
        max-width: 32rem;

        @include at(small) {
            position: absolute;
            margin: 0 auto;
            position: absolute;
            right: 1rem;
            bottom: 1rem;
        }

        @include at(medium) {
            max-width: 42rem;
            width: calc(100% - 4.5rem);
            margin-left: auto;
            right: 3rem;
            bottom: 3rem;
        }
    }

    &__content {
        max-width: 281px;
        font-weight: 300;
        font-size: 16px;
        line-height: 30px;
        padding-bottom: 1rem;

        z-index: 1;
        position: relative;

        p {
            margin-bottom: 0;
        }

        h2 {
            font-weight: 600;
            font-size: 28px;
            line-height: 62px;
            margin-bottom: 1rem;
        }

        @include at(small) {
            h2 {
                font-size: 31px;
            }
        }

        @include at(medium) {
            margin-left: 2.5rem;
            margin-top: 3rem;

            h2 {
                font-size: 48px;
            }
        }
    }

    &__close {
        position: absolute;
        top: 2.4rem;
        right: 3rem;
    }
}
</style>
