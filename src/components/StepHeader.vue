<template>
  <header class="header">
    <h2>{{ name }}</h2>
    <span>{{ current }} / {{ outOf }}</span>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class StepHeader extends Vue {
  @Prop()
  name!: string;

  @Prop()
  current!: number;

  @Prop()
  outOf!: number;
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2,
  p {
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
  }
}
</style>
