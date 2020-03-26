<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Step } from "./Step";

@Component
export default class CanHelpView extends Vue {}
</script>
