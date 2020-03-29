<template>
    <div>
        <v-form ref="form" :isValid.sync="isValid" lazy-validation>
            <v-container>
                <v-row>
                    <v-text-field
                        :value="name"
                        @input="$emit('update:name', $event)"
                        label="Imie"
                        :rules="[v => !!v || 'Imie jest wymagana']"
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
                    <v-btn color="primary" @click="onNext" class="go-next-btn">Przejdź dalej</v-btn>
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
