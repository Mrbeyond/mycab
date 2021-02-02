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
                    <b-form-select variant="primary"
                      :options="agentTypes.map(d=>d.name)"
                     v-model="$v.agent_type.$model"
                      :state="!$v.agent_type.$error"
                    />
                    <b-form-invalid-feedback v-if="!$v.agent_type.required">Please choose type</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group v-if="agent_type">

                  <template v-if="agent_type == 'Port'">
                    <b-input-group v-if="agent_type == 'Port'" class="mb-3">
                      <b-form-select
                        :options="ports.map(d=>d.name)"
                        v-model="selectedPort"
                      />
                    <b-form-invalid-feedback :force-show="!Boolean(selectedPort)" >
                      Select port
                    </b-form-invalid-feedback>
                    </b-input-group >
                  </template>

                  <template v-if="agent_type != 'Port'">
                    <b-form-group label="LGs">
                        <b-form-select variant="primary"
                          @change="processSelectedLG"
                          :options="lgs.map(d=>d.name)"
                          v-model="selectedLG"
                        />
                    </b-form-group>
                    <b-form-group v-if="selectedLG" label="Garage">
                      <!-- Show spinner while loading garages -->
                      <div v-if="selectedLG && !garages"><b-spinner  variant="primary" /></div>

                      <b-form-select v-if="garages"
                        :options="garages.map(d=>d.name)"
                        v-model="selectedGarage" variant="primary"
                      />
                      <b-form-invalid-feedback :force-show="!Boolean(selectedGarage)" >
                        Select Garage
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </template>

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
import { GARAGES, hToken } from '../../../../constants/formKey';
const {
    required,
    minLength,
    alpha,
    email,
    numeric,
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
      selectedPort:"",
      selectedLG:'',
      selectedGarage:'',

      typeColl: [],

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
    }

  },

  computed: {
    ports(){
      return this.$store.getters.ports;
    },

    lgs(){
      return this.$store.getters.lgs;
    },

    agentTypes(){
      return this.$store.getters.agentTypes;
    },
    garages(){
      return this.$store.getters.garages;
    },
    resKey(){
      return this.$store.getters.resKey;
    }

  },

  watch:{
    resKey(){
      if(this.resKey && this.resKey.status != 0 && this.resKey.owner == GARAGES){
        // alert('error')
      }
    },

    selectedLG(){
      this.processSelectedLG();
    }

  },

  methods: {

    processSelectedLG(){
      this.$store.commit(GARAGES, "");
      this.garages = null;
      let lg = this.lgs.find(d=>d.name === this.selectedLG);
      this.$store.dispatch(GARAGES, lg.id);

    },
    onValitadeFormSubmit() {
      this.$v.$touch();
      if(this.$v.$invalid) return;
      let service = this.agent_type.toString().trim();
      if(!this.selectedGarage && !this.selectedPort){
        if(service == "Garage"){
          if(!this.selectedGarage){
            this.resMessage = "Choose a garage";
          }
        }else{
          this.resMessage = "Choose a port";
        }
        this.variant = "danger";
        this.$bvToast.show("example-toast");
        return;
      }

      let id= service ==="Port"? this.ports.find(d=>d.name === this.selectedPort).id
        : this.garages.find(d=>d.name === this.selectedGarage).id;

      if(this.submitting) return;
      let formData = {
        phone:this.phone,
        first_name:this.first_name,
        last_name:this.last_name,
        email:this.email,
        agent_type: service == "Port"? "slug":"commercial",
        garage_id: id,
      };


      console.log(formData);
      // console.log(hToken());
      this.submitting = true;
      Axios.post(`${PROXY}admin/register/agent`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){

          this.variant = "success";
          this.resMessage = res.data.message;
          this.$refs.form.reset();
          this.selectedGarage = this.selectedPort = "";
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


  },
  mounted(){
    // console.log(this.lgs);
  }
};
</script>
