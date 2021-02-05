<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
              <b-form-group label="Port">
                <b-form-input type="text" v-model="$v.port.$model" :state="!$v.port.$error" />
                <b-form-invalid-feedback v-if="!$v.port.required">Please enter port name</b-form-invalid-feedback>
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
import { hToken, PORTS } from '../../../../constants/formKey';
const {
    required,
    numeric,
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
  data() {
    return {
      port: "",
      submitting: false,
      variant: "success",
      resMessage: " ",
    };
  },
  mixins: [validationMixin],
  validations: {
    port: {
        required,
    }

    },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;
      if(this.$v.$invalid) return;

      if(this.submitting) return;
      let formData = {
        name:this.port
      }

      // console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}location/port`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.variant = "success";
          this.resMessage = res.data.message;
          this.port= "";
          this.$store.dispatch(PORTS);
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
