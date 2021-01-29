<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" title="Register Agent">
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-form-group label="First name">
                    <b-form-input type="text" v-model="$v.first_name.$model" :state="!$v.first_name.$error" />
                    <b-form-invalid-feedback v-if="!$v.first_name.required">Please enter your first name</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.first_name.minLength">Name must at least 3 characters</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.first_name.alpha">Your name must be composed only with letters</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Last name" class="error-l-100">
                    <b-form-input type="text" v-model="$v.last_name.$model" :state="!$v.last_name.$error" />
                    <b-form-invalid-feedback v-if="!$v.last_name.required">Please enter your last name</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.last_name.minLength">Name must at least 3 characters</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.last_name.alpha">Your name must be composed only with letters</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Email">
                    <b-form-input type="text" v-model="$v.last_name.$model" :state="!$v.email.$error" />
                    <b-form-invalid-feedback v-if="!$v.email.required">Please enter your email address</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.email.email">Please enter a valid email address</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Phone" class="error-l-100">
                    <b-form-input type="text" v-model="$v.phone.$model" :state="!$v.phone.$error" />
                    <b-form-invalid-feedback v-if="!$v.phone.required">Please enter phone number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.phone.numeric">Enter valid phone number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.phone.minLength">Enter valid phone number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Agent type">
                    <b-form-input type="text" v-model="$v.agent_type.$model" :state="!$v.agent_type.$error" />
                    <b-form-invalid-feedback v-if="!$v.agent_type.required">Please enter a type</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.agent_type.numeric">Value must be a number</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="garage_id">
                    <b-form-input type="text" v-model="$v.garage_id.$model" :state="!$v.garage_id.$error" />
                    <b-form-invalid-feedback v-if="!$v.garage_id.required">Please enter a value</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.garage_id.numeric">Value must be a number</b-form-invalid-feedback>
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
    minLength,
    alpha,
    email,
    numeric,
    minValue,
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      agent_type: "",
      garage_id: ""
    };
  },
  mixins: [validationMixin],
  validations: {
    first_name: {
        required,
        minLength: minLength(3),
        alpha
    },
    email: {
        required,
        email
    },
    agent_type: {
        required,
        numeric
    },
    garage_id: {
        required,
        numeric
    },
    last_name: {
        required,
        alpha,
        minLength: minLength(3)
    },
    phone: {
        required,
        numeric,
        minLength: minValue(11)
    },

    },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      console.log(
      JSON.stringify({
        email: this.email,
        last_name: this.last_name,
        phone: this.phone,
        agent_type: this.agent_type,
      })
    );
  }
}
};
</script>
