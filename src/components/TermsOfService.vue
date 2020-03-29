<template>
    <div class="main">
        <div>
            <h2>Regulamin serwisu</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            <router-link to="/">Wróć na stronę główną</router-link>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
    display: grid;
    justify-items: center;
    grid-gap: 3rem;
    margin-top: 7rem;

    @include at(small) {
        margin-top: 10rem;
        padding: 2rem;
    }

    p {
        font-weight: 300;
        font-size: 16px;
        line-height: 30px;
    }
}
</style>
