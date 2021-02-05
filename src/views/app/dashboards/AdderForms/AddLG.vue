<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" title="Register Admin">
            <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-form-group label="Name">
                    <b-form-input type="text" v-model="$v.name.$model" :state="!$v.name.$error" />
                    <b-form-invalid-feedback v-if="!$v.name.required">Please enter your first name</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.name.minLength">Name must at least 3 characters</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.name.alpha">Your name must be composed only with letters</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Last name" class="error-l-100">
                    <b-form-input type="text" v-model="$v.last_name.$model" :state="!$v.last_name.$error" />
                    <b-form-invalid-feedback v-if="!$v.last_name.required">Please enter your last name</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.last_name.minLength">Name must at least 3 characters</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.last_name.alpha">Your name must be composed only with letters</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Contact Person">
                    <b-form-input type="text" v-model="$v.contact_person_name.$model" :state="!$v.contact_person_name.$error" />
                    <b-form-invalid-feedback v-if="!$v.contact_person_name.required">Please enter your contact_person_name address</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label=" Contact Peron's Phone" class="error-l-100">
                    <b-form-input type="text" v-model="$v.contact_person_phone.$model" :state="!$v.contact_person_phone.$error" />
                    <b-form-invalid-feedback v-if="!$v.contact_person_phone.required">Phone number is required</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.contact_person_phone.numeric">Enter valid phone number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.contact_person_phone.minLength">Enter valid phone number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Chairman Name">
                    <div>
                      <b-form-select v-model="$v.chairman_name.$model" :options="adminTypes" :state="!$v.chairman_name.$error"></b-form-select>
                    <b-form-invalid-feedback v-if="!$v.chairman_name.required">Please enter a type</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.chairman_name.numeric">Value must be a number</b-form-invalid-feedback>
                    </div>
                    <!-- <b-form-input type="text" v-model="$v.chairman_name.$model" :state="!$v.chairman_name.$error" /> -->
                </b-form-group>

                <b-form-group label="Chairman Phone" class="error-l-100">
                    <b-form-input type="text" v-model="$v.chairman_phone.$model" :state="!$v.chairman_phone.$error" />
                    <b-form-invalid-feedback v-if="!$v.chairman_phone.required">Phone number is required</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.chairman_phone.numeric">Enter valid phone number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.chairman_phone.minLength">Enter valid nphone number</b-form-invalid-feedback>
                </b-form-group>

                <div class="text-center">
                  <b-spinner v-if="submitting" label="Spinning"></b-spinner>
                </div>

                <div class="text-center">
                  <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
                </div>

                <b-toast :variant="variant" id="example-toast"
                  title="Response" auto-hide-delay="8000"
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
import { PROXY } from '../../../../constants/config';
import { ADMINS, hToken } from '../../../../constants/formKey';
const {
    required,
    minLength,
    alpha,
    contact_person_name,
    numeric,
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
  data() {
    return {
      name: "",
      contact_person_name: "",
      contact_person_phone:"",
      chairman_phone: "",
      chairman_name: "",
      submitting: false,
      resMessage: "",
      variant: "success",
      selected: null,
        options: [
          { value: null, text: 'Please select Admin type' },
          { value: 1, text: 'Technical Admin' },
          { value: 4, text: 'This is Second option' },

        ]
    };
  },
  mixins: [validationMixin],
  validations: {
    name: {
        required,
        minLength: minLength(3),
        alpha
    },
    contact_person_name: {
        required,
    },

    contact_person_phone: {
        required,
        numeric,
    },
    chairman_name: {
        required,
        numeric
    },

    chairman_phone: {
        required,
        numeric,
        minLength: minLength(11)
    },

  },

  computed: {
    adminTypes(){
      let all = this.$store.getters.adminTypes;
      if(all){
        return all.map(d=>({value:d.id, text:d.name}))
      }else{
        return []
      }
    }
  },

  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;

      if(this.submitting) return;
      let formData = {
        chairman_phone:this.chairman_phone,
        name:this.name,
        last_name:this.last_name,
        contact_person_name:this.contact_person_name,
        chairman_name:this.chairman_name
      }

      // console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}location/local_government`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.variant = "success";
          this.resMessage = res.data.message;
          this.$refs.form.reset();
          this.$store.dispatch(ADMINS);
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
