<template>
    <section>
        <header>
            <h2>Wprowadź dane kontaktowe</h2>
        </header>
        <v-row align="center">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                    v-model="name"
                    label="Nazwa firmy, placówka"
                    required
                ></v-text-field>

                <v-row>
                    <v-text-field
                        v-model="addressCity"
                        label="Miasto"
                        required
                    ></v-text-field>

                    <v-select
                        v-model="addressNumber"
                        :rules="[v => !!v || 'Item is required']"
                        label="Numer"
                        required
                    ></v-select>
                </v-row>

                <v-text-field
                    v-model="addressCity"
                    :rules="emailRules"
                    label="Email"
                    required
                ></v-text-field>

                <v-select
                    v-model="addressNumber"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Telefon"
                    required
                ></v-select>

                <v-btn color="primary" @click="validate">
                    Przejdź dalej
                </v-btn>
            </v-form>
        </v-row>
    </section>
</template>

<script>
import heartIcon from "@/components/icons/heart";

import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        heartIcon
    }
})
export default class ContactForm extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.main {
    padding: 2rem;
}
</style>
