<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
              <b-form-group label="Terminal number">
                <b-form-input type="text" v-model="$v.terminal_no.$model" :state="!$v.terminal_no.$error" />
                <b-form-invalid-feedback v-if="!$v.terminal_no.required">Please enter a value</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.terminal_no.numeric">Value must be a number</b-form-invalid-feedback>
            </b-form-group>

            <div class="text-center">
              <b-spinner v-if="submitting" label="Spinning"></b-spinner>
            </div>

            <div class="text-center">
              <b-button type="submit" variant="primary" class="mt-1">{{ $t('forms.submit') }}</b-button>
            </div>

            <b-toast :variant="variant" id="example-toast"
              title="Response"
            >
              {{ resMessage }}
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
import { hToken, TERMINALS } from '../../../../constants/formKey';
import { PROXY } from '../../../../constants/config';
const {
    required,
    numeric,
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
  data() {
    return {
      terminal_no: "",
      submitting: false,
      variant: "success",
      resMessage: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    terminal_no: {
        required,
        numeric
    }

    },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;
      if(this.submitting) return;
      let formData = {
        terminal_no:this.terminal_no,
      }

      // console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}admin/register/terminal`, formData, {headers: hToken()})
      .then(res=>{
       if(!res.data.error){
          this.variant = "success";
          this.resMessage = res.data.message;
          this.$store.dispatch(TERMINALS);
          this.$refs.form.reset();
        }else{
          this.variant = "danger";
          this.resMessage = "Something went wrong, please retry"
          // commit('setError', "Something went wrong");
        }
        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
      .catch(err=>{
        this.variant = "danger";
        if(err && err.response){
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
