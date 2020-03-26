<template>
    <button class="cross" @click="$emit('click')">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.91667 1L23 23M22.0833 1L1 23" />
        </svg>
    </button>
</template>
<script lang="ts">
export default {};
</script>
<style lang="scss" scoped>
.cross {
    &:hover,
    &:focus {
        path {
            stroke: #7582a7;
        }
    }

    svg {
        fill: none;
    }

    path {
        transition: stroke 0.1s ease;
        stroke: #4a577b;
        stroke-width: 2;
    }
}
</style>