<template>
<b-row>
    <b-colxx xxs="12">
        <b-card>
            <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
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
                    <b-form-input type="text" v-model="$v.email.$model" :state="!$v.email.$error" />
                    <b-form-invalid-feedback v-if="!$v.email.required">Please enter your email address</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.email.email">Please enter a valid email address</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Phone" class="error-l-100">
                    <b-form-input type="text" v-model="$v.phone.$model" :state="!$v.phone.$error" />
                    <b-form-invalid-feedback v-if="!$v.phone.required">Please enter phone number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.phone.numeric">Enter valid phone number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.phone.minLength">Enter valid phone number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Payer ID">
                    <b-form-input type="text" v-model="$v.payer_id.$model" :state="!$v.payer_id.$error" />
                    <b-form-invalid-feedback v-if="!$v.payer_id.required">Please enter ID</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.payer_id.numeric">Value must be a number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Business name" class="error-l-100">
                    <b-form-input type="text" v-model="$v.business_name.$model" :state="!$v.business_name.$error" />
                    <b-form-invalid-feedback v-if="!$v.business_name.required">Please enter business name</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Business address" class="error-l-100">
                    <b-form-input type="text" v-model="$v.business_address.$model" :state="!$v.business_address.$error" />
                    <b-form-invalid-feedback v-if="!$v.business_address.required">Please enter business address</b-form-invalid-feedback>
                </b-form-group>

                <div class="text-center">
                  <b-spinner v-if="submitting" label="Spinning"></b-spinner>
                </div>

                <div class="text-center">
                  <b-button type="submit" variant="primary" class="mt-1">{{ $t('forms.submit') }}</b-button>
                </div>

                <b-toast variant="danger" id="example-toast" title="Something went wrong" >
                Please try again, there was an whlie error processing your regristration
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
    minLength,
    alpha,
    email,
    numeric,
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
      payer_id: "",
      business_name: "",
      business_address: "",
      submitting: false,
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
    payer_id: {
        required,
        numeric
    },
    business_name: {
      required,
    },
    business_address: {
      required,
    },
    last_name: {
        required,
        alpha,
        minLength: minLength(3)
    },
    phone: {
        required,
        numeric,
        minLength: minLength(11)
    },

    },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;
      if(this.submitting) return;
      let formData = {
        phone:this.phone,
        business_name:this.business_name,
        business_address:this.business_address,
        first_name:this.first_name,
        last_name:this.last_name,
        email:this.email,
        player_id:this.player_id
      }

      // console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}agent/payer/register`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          // alert("succcess")

          // localStorage.authToken = res.data.data.authorization
          // delete res.data.data.authorization;
          // const authUser = res.data.data;
          // setCurrentUser(authUser)
          // this.$store.commit("setUser", authUser);
        }else{
          this.$bvToast.show("example-toast");
          // commit('setError', "Something went wrong");
        }
        this.submitting = false;
      })
      .catch(err=>{
        console.log(err);
        if(err && err.response){
          // alert(err.response.status)
        }

        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
  }
}
};
</script>
