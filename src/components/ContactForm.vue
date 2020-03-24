<template>
    <div>
        <v-form ref="form" :isValid.sync="isValid" lazy-validation>
            <v-container>
                <v-row>
                    <v-text-field
                        :value="name"
                        @input="$emit('update:name', $event)"
                        label="Nazwa firmy, placówka"
                        :rules="[v => !!v || 'Nazwa jest wymagana']"
                        filled
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        :value="addressCity"
                        @input="$emit('update:addressCity', $event)"
                        label="Miasto"
                        :rules="[v => !!v || 'Miasto jest wymagene']"
                        filled
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        :value="addressStreet"
                        @input="$emit('update:addressStreet', $event)"
                        :rules="[v => !!v || 'Ulica jest wymagana']"
                        label="Ulica"
                        filled
                        required
                    ></v-text-field>

                    <v-text-field
                        :value="addressNumber"
                        @input="$emit('update:addressNumber', $event)"
                        class="address-num"
                        :rules="[v => !!v || 'Numer lokalu jest wymagany']"
                        label="Numer"
                        filled
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        :value="email"
                        @input="$emit('update:email', $event)"
                        :rules="[v => !!v || 'Email jest wymagany']"
                        label="Email"
                        filled
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        :value="phone"
                        @input="$emit('update:phone', $event)"
                        :rules="[v => !!v || 'Telefon jest wymagany']"
                        label="Telefon"
                        filled
                        required
                    ></v-text-field>
                </v-row>

                <v-row>
                    <v-btn color="primary" @click="onNext" class="go-next-btn"
                        >Przejdź dalej</v-btn
                    >
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script lang="ts">
import heartIcon from "@/components/icons/heart.vue";

import { Component, Vue, Prop } from "vue-property-decorator";

type VForm = Vue & { validate: () => boolean };

@Component({
    components: {
        heartIcon
    }
})
export default class ContactForm extends Vue {
    @Prop()
    name!: string;
    @Prop()
    addressCity!: string;
    @Prop()
    addressStreet!: string;
    @Prop()
    addressNumber!: string;
    @Prop()
    email!: string;
    @Prop()
    phone!: string;
    @Prop()
    isValid!: boolean;

    get form(): VForm {
        return this.$refs.form as VForm;
    }

    onNext() {
        if (this.form.validate()) {
            this.$emit("submit");
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles.scss";

.address-num {
    width: 3rem;
    margin-left: 2rem;
}

.main {
    padding: 2rem;
}

.go-next-btn {
    margin-left: auto;
}
</style>
