<template>
    <v-expand-transition>
        <v-container v-show="isChecked">
            <v-row v-for="item in items" :key="item.typeName" align="start" justify="center">
                <v-col md="4" justify="start" class="pa-7">
                    <v-row align="center" justify="center">
                        <h3 class="body-1 medical-card-body__title">{{item.typeName}}</h3>
                    </v-row>
                </v-col>
                <v-col md="8">
                    <Types v-for="type in item.types" :key="type" :title="type" />
                </v-col>
            </v-row>

            <v-row align="center" class="pa-2">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn depressed v-on="on" class="mx-2" fab dark x-small color="primary">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(item, index) in menuItems" :key="index">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <h3 class="body-1 medical-card__title">DODAJ INNY RODZAJ</h3>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        filled
                        height="136"
                        name="description"
                        no-resize
                        label="Opis / inny rodzaj (Opcjonalnie)"
                        v-model="description"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-container>
    </v-expand-transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Types from "@/components/Types";
import Counter from "@/components/Counter";

@Component({
    components: {
        Types,
        Counter
    }
})
export default class MedicalCardTypes extends Vue {
    @Prop() readonly items!: any[];
    @Prop() readonly isChecked!: string;

    private readonly description: string = "";
    private readonly menuItems = [
        { title: "Lateksowe" },
        { title: "Nitrylowe" },
        { title: "Winylowe" },
        { title: "Foliowe" }
    ];

    private isInput(title: string) {
        return !title ? false : true;
    }
}
</script>

<style lang="scss" scoped>
.medical-card-body {
    &__title {
        color: var(--text-primary);
    }
}
</style>