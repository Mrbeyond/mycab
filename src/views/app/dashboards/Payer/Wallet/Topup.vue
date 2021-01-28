<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" title="Top up your wallet">
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-form-group :label="$t('forms.name')">
                    <b-form-input type="number" v-model="$v.amount.$model" :state="!$v.amount.$error" />
                    <b-form-invalid-feedback v-if="!$v.amount.required">Please enter the amount</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.amount.numeric">Amount must be numeric</b-form-invalid-feedback>
                </b-form-group>
                <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
            </b-form>
        </b-card>
    </b-colxx>
</b-row>
</template>

<script>
import Axios from 'axios';
import {
    validationMixin
} from "vuelidate";
import { PROXY } from '../../../../../constants/config';
const {
    required,
    numeric,
} = require("vuelidate/lib/validators");


export default {
  data() {
      return {
          amount: "",
          processing: false,


      };
  },
  mixins: [validationMixin],
  validations: {
      amount: {
        required,
        numeric
      }

  },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      Axios.post(`${PROXY}`)
    }
  }
};
</script>
