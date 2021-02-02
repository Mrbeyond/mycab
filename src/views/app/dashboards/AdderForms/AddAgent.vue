<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4">
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

                <b-form-group label="Agent type">
                    <b-form-input type="text" v-model="$v.agent_type.$model" :state="!$v.agent_type.$error" />
                    <b-form-invalid-feedback v-if="!$v.agent_type.required">Please enter a type</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.agent_type.numeric">Value must be a number</b-form-invalid-feedback>
                </b-form-group>



                <!--<b-form-group label="Agent type">
                  <v-select v-model="get_type" :options="allTypes" :dir="direction" />
                </b-form-group>

                <b-form-group label="Add">
                  <v-select v-model="vueSelectForm.single" :options="selectData" :dir="direction" />
                </b-form-group>

                <b-form-group label="Add">
                  <v-select v-model="vueSelectForm.single" :options="selectData" :dir="direction" />
                </b-form-group>

                <b-form-group label="Add">
                  <v-select v-model="vueSelectForm.single" :options="selectData" :dir="direction" />
                </b-form-group>
                  <b-input-group-prepend>
                    <b-dropdown right split :text="$t('input-groups.action')" variant="outline-secondary">
                        <b-dropdown-header>{{ $t('input-groups.header') }}</b-dropdown-header>
                        <b-dropdown-item disabled>{{ $t('input-groups.action') }}</b-dropdown-item>
                        <b-dropdown-item>{{ $t('input-groups.another-action') }}</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item>{{ $t('input-groups.another-action') }}</b-dropdown-item>
                    </b-dropdown>
                </b-input-group-prepend>
                <b-form-input/>
            </b-input-group>
                -->


                <b-form-group label="Garage id">
                    <b-form-input type="text" v-model="$v.garage_id.$model" :state="!$v.garage_id.$error" />
                    <b-form-invalid-feedback v-if="!$v.garage_id.required">Please enter a value</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.garage_id.numeric">Value must be a number</b-form-invalid-feedback>
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
    minLength,
    alpha,
    email,
    numeric,
    minValue
} = require("vuelidate/lib/validators");


export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      agent_type: "",
      garage_id: "",
      submitting: false,
      variant: "success",
      resMessage: "",
      allTypes: [ "Port", "Commercial"],
      typeColl: [],
      garages: [],
      lgs: [
        {
          name:"oshodi",
          garages: [
            {name: "one", id: 1},
            {name: "two", id: 2},
            {name: "three", id: 3},
            {name: "four", id: 4},
            {name: "five", id: 5},
          ]
        },
        {
          name:"apapa",
          garages: [
            {name: "one", id: 6},
            {name: "two", id: 7},
            {name: "three", id: 8},
            {name: "four", id: 9},
            {name: "five", id: 10},
          ]
        },
        {
          name:"epe",
          garages: [
            {name: "one", id: 11},
            {name: "two", id: 12},
            {name: "three", id: 13},
            {name: "four", id: 14},
            {name: "five", id: 15},
          ]
        },
      ],


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
        first_name:this.first_name,
        last_name:this.last_name,
        email:this.email,
        agent_type: this.agent_type,
        garage_id: this.garage_id
      }

      // console.log(formData);
      console.log(hToken());
      this.submitting = true;
      Axios.post(`${PROXY}admin/register/agent`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){

          this.variant = "success";
          this.resMessage = res.data.message;
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
  },

  getLGS(){

  },

  processType(){

  },

  processGarage(){

  },

  getPorts(){
     Axios.get(`${PROXY}location/ports`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){

          this.variant = "success";
          this.resMessage = res.data.message;
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

  },

  getGarage(){

  }



}
};
</script>
