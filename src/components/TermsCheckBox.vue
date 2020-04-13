<template>
    <v-row class="terms-of-service">
        <v-checkbox
            v-model="isCheckedModel"
            :rules="[v => !!v || 'Musisz się zgodzić by kontynuować']"
        >
           <template v-slot:label>
                Oswiadczam że zapoznałem się z regulaminem oraz polityką prywatności
            </template>
        </v-checkbox>
            <a href="https://docs.google.com/document/d/1gWwc87JOSOeAIxN0Ya3xHB-ZNE22QrfFrPwvjZcSu0s/edit?usp=sharing" target="_blank">Regulamin oraz polityka prywatności</a>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TermsCheckBox extends Vue {
  @Prop() readonly isChecked!: boolean;

  get isCheckedModel() {
    return this.isChecked;
  }

  set isCheckedModel(val: boolean) {
    this.$emit("update:isChecked", val);
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.terms-of-service {
  display: flex;
  align-items: center;
  justify-content: space-between;

    height: 3rem;
    margin-bottom: 6rem;
}
</style>
