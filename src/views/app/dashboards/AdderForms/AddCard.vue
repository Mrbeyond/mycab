<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" title="Add Card">
          <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
              <b-form-group label="Card number">
                <b-form-input type="text" v-model="$v.card_no.$model" :state="!$v.card_no.$error" />
                <b-form-invalid-feedback v-if="!$v.card_no.required">Please enter a type</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.card_no.numeric">Value must be a number</b-form-invalid-feedback>
            </b-form-group>
            <div class="text-center">
              <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
            </div>
          </b-form>
        </b-card>
    </b-colxx>
</b-row>
</template>

<script>
import {
    validationMixin
} from "vuelidate";
const {
    required,
    numeric,
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
  data() {
    return {
      card_no: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    card_no: {
        required,
        numeric
    }

    },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      console.log(
      JSON.stringify({
        card_no: this.card_no,
      })
    );
  }
}
};
</script>
