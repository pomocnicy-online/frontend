<template>
    <section class="contact-form">
        <header class="header">
            <h2>Wprowadź dane kontaktowe</h2>
        </header>
        <div>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-container>
                    <v-row>
                        <v-text-field
                            v-model="name"
                            label="Nazwa firmy, placówka"
                            :rules="[v => !!v || 'Item is required']"
                            filled
                            required
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                            v-model="addressCity"
                            label="Miasto"
                            :rules="[v => !!v || 'Item is required']"
                            filled
                            required
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                            v-model="addressCity"
                            :rules="[v => !!v || 'Item is required']"
                            label="Ulica"
                            filled
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="addressNumber"
                            class="address-num"
                            :rules="[v => !!v || 'Item is required']"
                            label="Numer"
                            filled
                            required
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                            v-model="addressNumber"
                            :items="items"
                            :rules="[v => !!v || 'Item is required']"
                            label="Email"
                            filled
                            required
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                            v-model="addressNumber"
                            :items="items"
                            :rules="[v => !!v || 'Item is required']"
                            label="Telefon"
                            filled
                            required
                        ></v-text-field>
                    </v-row>

                    <v-row>
                        <v-btn
                            color="primary"
                            @click="validate"
                            class="go-next-btn"
                        >
                            Przejdź dalej
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </div>
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

.contact-form {
    width: 100%;
}

.address-num {
    width: 3rem;
    margin-left: 2rem;
}

.header {
    h2 {
        font-weight: bold;
        font-size: 16px;
        line-height: 30px;
    }
}

.go-next-btn {
    margin-left: auto;
}
</style>
