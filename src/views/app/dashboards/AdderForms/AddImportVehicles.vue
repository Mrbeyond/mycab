<template>
<b-row>
    <b-colxx xxs="12">
        <b-card>
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">

                <b-form-group label="Port ID">
                    <b-form-input type="text" v-model="$v.port_id.$model" :state="!$v.port_id.$error" />
                    <b-form-invalid-feedback v-if="!$v.port_id.required">Please enter ID</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.port_id.numeric">Value must be a number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Account number">
                    <b-form-input type="text" v-model="$v.account_no.$model" :state="!$v.account_no.$error" />
                    <b-form-invalid-feedback v-if="!$v.account_no.required">Please enter account number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Vehicle type">
                    <b-form-input type="text" v-model="$v.vehicle_type.$model" :state="!$v.vehicle_type.$error" />
                    <b-form-invalid-feedback v-if="!$v.vehicle_type.required">Please enter your vehicle type</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.vehicle_type.numeric">Please enter a valid type </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Model" class="error-l-100">
                    <b-form-input type="text" v-model="$v.vehicle_model.$model" :state="!$v.vehicle_model.$error" />
                    <b-form-invalid-feedback v-if="!$v.vehicle_model.required">Please enter model</b-form-invalid-feedback>
                </b-form-group>


                <b-form-group label="Vehicle Identificaton Number" class="error-l-100">
                    <b-form-input type="text" v-model="$v.VIN.$model" :state="!$v.VIN.$error" />
                    <b-form-invalid-feedback v-if="!$v.VIN.required">VIN is required</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.VIN.numeric">Enter valid VIN number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.VIN.minLength || !$v.VIN.maxLength">Enter valid VIN number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Color" class="error-l-100">
                    <b-form-input type="text" v-model="$v.vehicle_color.$model" :state="!$v.vehicle_color.$error" />
                    <b-form-invalid-feedback v-if="!$v.vehicle_color.required">Please enter color</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Brand" class="error-l-100">
                    <b-form-input type="text" v-model="$v.vehicle_brand.$model" :state="!$v.vehicle_brand.$error" />
                    <b-form-invalid-feedback v-if="!$v.vehicle_brand.required">Please enter brand</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Year" class="error-l-100">
                    <b-form-input type="text" v-model="$v.vehicle_year.$model" :state="!$v.vehicle_year.$error" />
                    <b-form-invalid-feedback v-if="!$v.vehicle_year.required">Please enter year</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.vehicle_year.numeric">Enter valid year</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.VIN.minLength || !$v.VIN.maxLength">Enter valid year</b-form-invalid-feedback>
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
    maxLength,
    alpha,
    numeric,
    helpers
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)

export default {
  data() {
    return {
      account_no: "",
      vehicle_model: "",
      vehicle_type: "",
      VIN: "",
      port_id: "",
      vehicle_color: "",
      vehicle_brand: "",
      vehicle_year: "",

      submitting: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    account_no: {
        required,
    },
    vehicle_type: {
        required,
        numeric
    },
    port_id: {
        required,
        numeric
    },
    vehicle_color: {
      required,
    },
    vehicle_brand: {
      required,
    },
    vehicle_model: {
        required,
    },
    VIN: {
        required,
        minLength: minLength(17),
        maxLength: maxLength(17)
    },
    vehicle_year: {
        required,
        numeric,
        maxLength: maxLength(4),
        minLength: minLength(4)
    },

    },
  methods: {
    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;
      if(this.submitting) return;
      let formData = {
        vehicle_identification_number:this.VIN,
        vehicle_color:this.vehicle_color,
        vehicle_brand:this.vehicle_brand,
        account_no:this.account_no,
        vehicle_model:this.vehicle_model,
        vehicle_type:this.vehicle_type,
        vehicle_year:this.vehicle_year,
        port_id: port_id
      }

      // console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}agent/vehicle/register/import`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          alert("succcess")

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
        // console.log(err);
        if(err && err.response){
          alert(err.response.status)
        }

        this.$bvToast.show("example-toast");
        this.submitting = false;
      })
  }
}
};
</script>
