<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" title="Add Tag">
          <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
              <b-form-group label="Tag number">
                <b-form-input type="text" v-model="$v.tag_no.$model" :state="!$v.tag_no.$error" />
                <b-form-invalid-feedback v-if="!$v.tag_no.required">Please enter a type</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.tag_no.numeric">Value must be a number</b-form-invalid-feedback>
            </b-form-group>

            <div class="text-center">
              <b-spinner v-if="submitting" label="Spinning"></b-spinner>
            </div>

            <div class="text-center">
              <b-button type="submit" variant="primary" class="mt-1">{{ $t('forms.submit') }}</b-button>
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
import { hToken } from '../../../../constants/formKey';
const {
    required,
    numeric,
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
  data() {
    return {
      tag_no: "",
      submitting: false,
      variant: "success",
      resMessage: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    tag_no: {
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
        tag_no:this.tag_no,
      }

      console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}admin/register/vehicle_tag`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.variant = "success";
          console.log(res.data);
          this.resMessage = res.data.message;
          this.tag_no = "";
          // localStorage.authToken = res.data.data.authorization
          // delete res.data.data.authorization;
          // const authUser = res.data.data;
          // setCurrentUser(authUser)
          // this.$store.commit("setUser", authUser);
        }else{
          this.variant = "danger";
          this.resMessage = "Something went wrong, please retry"
          // commit('setError', "Something went wrong");
        }
        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
      .catch(err=>{
        console.log(err);
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
