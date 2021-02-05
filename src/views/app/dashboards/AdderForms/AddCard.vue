<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
              <b-form-group label="Card number">
                <b-form-input type="text" v-model="$v.card_no.$model" :state="!$v.card_no.$error" />
                <b-form-invalid-feedback v-if="!$v.card_no.required">Please enter a value</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.card_no.numeric">Value must be a number</b-form-invalid-feedback>
            </b-form-group>
            <div class="text-center">
              <b-spinner v-if="submitting" label="Spinning"></b-spinner>
            </div>

            <div class="text-center">
              <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
            </div>

            <b-toast :variant="variant" id="example-toast" title="Something went wrong" >
              {{resMessage }}
            </b-toast>
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
import { PROXY } from '../../../../constants/config';
import { CARDS, hToken } from '../../../../constants/formKey';
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
      submitting: false,
      variant: "success",
      resMessage: " ",
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
      if(this.$v.$invalid) return;
      if(this.$v.$invalid) return;

      if(this.submitting) return;
      let formData = {
        card_no:this.card_no
      }

      // console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}admin/register/card`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.variant = "success";
          this.resMessage = res.data.message;
          this.card_no= "";
          this.$store.dispatch(CARDS);
        }else{
          this.variant = "danger";
          this.resMessage = "Something went wrong, please retry"
          // commit('setError', "Something went wrong");
        }
        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
      .catch(err=>{
        // console.log(err);
        this.variant = "danger";
        if(err && err.response){
          // alert()
         if(err.response.data && err.response.data.message){
           this.resMessage = err.response.data.message
         }else{
          this.resMessage = "Something went wrong, please retry"
         }
        }

        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
  }
}
};
</script>
