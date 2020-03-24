<template>
    <v-row align="start" justify="center">
        <v-col md="6" class="pa-4">
            <v-row align="center" justify="center">
                <h3 class="body-1 medical-type__title">{{title}}</h3>
            </v-row>
        </v-col>
        <v-col md="6" class="pa-2">
            <Counter />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Counter from "@/components/Counter";

@Component({
    components: {
        Counter
    }
})
export default class Types extends Vue {
    @Prop() readonly title!: string;
}
</script>

<style lang="scss" scoped>
.medical-type {
    &__title {
        color: var(--text-primary);
    }
}
</style>