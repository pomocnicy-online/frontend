<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-text-field
            class="form__input"
            :value="name"
            @input="$emit('update:name', $event)"
            :label="namePlaceholder"
            :rules="[v => !!v || 'Nazwa jest wymagana']"
            filled
            required
          ></v-text-field>
        </v-row>
        <v-row v-if="showAddressCity">
          <v-text-field
            class="form__input"
            :value="addressCity"
            @input="$emit('update:addressCity', $event)"
            label="Miasto"
            :rules="[v => !!v || 'Miasto jest wymagene']"
            filled
            required
          ></v-text-field>
          <v-text-field
              class="form__input form__input--postal-code"
              :value="postalCode"
              @input="$emit('update:postalCode', $event)"
              :rules="[v => !!v || 'Kod pocztowy jest wymagany']"
              label="Kod pocztowy"
              filled
              required
          ></v-text-field>
        </v-row>
        <v-row v-if="showAddressFields">
          <v-text-field
            class="form__input"
            :value="addressStreet"
            @input="$emit('update:addressStreet', $event)"
            :rules="[v => !!v || 'Ulica jest wymagana']"
            label="Ulica"
            filled
            required
          ></v-text-field>
          <v-text-field
            class="form__input form__input--address-num"
            :value="addressNumber"
            @input="$emit('update:addressNumber', $event)"
            :rules="[v => !!v || 'Numer lokalu jest wymagany']"
            label="Numer"
            filled
            required
          ></v-text-field>
        </v-row>
        <v-row v-if="showAddressFields" class="form__requester-contact">Kontakt do Ciebie:</v-row>
        <v-row>
          <v-text-field
            class="form__input"
            :value="email"
            @input="$emit('update:email', $event)"
            :rules="[v => !!v || 'Email jest wymagany', v => /\S+@\S+\.\S+/.test(v) || 'Email jest nieprawidłowy']"
            label="Email"
            filled
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="form__input"
            :value="phone"
            @input="$emit('update:phone', $event)"
            :rules="[v => !!v || 'Telefon jest wymagany']"
            label="Telefon"
            filled
            required
          ></v-text-field>
        </v-row>
        <v-row class="form__disclaimer">*dane osobowe są podawane dobrowolnie na potrzeby akcji charytatywnej</v-row>
        <v-row>
          <v-btn color="primary" @click="onNext" class="go-next-btn">Przejdź dalej</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

type VForm = Vue & { validate: () => boolean };

@Component
export default class ContactForm extends Vue {
  @Prop()
  namePlaceholder!: string;

  @Prop()
  name!: string;
  @Prop()
  addressCity?: string;
  @Prop()
  postalCode?: string;
  @Prop()
  addressStreet?: string;
  @Prop()
  addressNumber?: string;
  @Prop()
  email!: string;
  @Prop()
  phone!: string;

  get showAddressFields() {
    return this.addressStreet !== undefined && this.addressNumber !== undefined;
  }

  get showAddressCity() {
    return this.addressCity !== undefined && this.postalCode !== undefined;
  }

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

.form {
    &__input {
        &--address-num {
            width: 3rem;
            margin-left: 2rem;
        }

        &--postal-code {
            width: 3rem;
            margin-left: 2rem;
        }
    }

  &__disclaimer {
    font-weight: 300;
    font-size: 12px;
    line-height: 30px;

    margin-bottom: 1rem;
  }

  &__requester-contact {
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    margin-bottom: 0.7rem;
  }
}

.main {
  padding: 2rem;
}

.go-next-btn {
  margin-left: auto;
}
</style>
