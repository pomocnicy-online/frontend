<template>
    <v-row class="terms-of-service">
        <v-checkbox
            v-model="isCheckedModel"
            :rules="[v => !!v || 'Musisz się zgodzić by kontynuować']"
        >
            <template v-slot:label>
                <a href="/#/regulamin" target="_blank">Akceptuje regulamin i polityke prywatności</a>
            </template>
        </v-checkbox>
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
    margin-bottom: 2rem;
}
</style>
