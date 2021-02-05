<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" title="Add Garage">
            <b-form ref="form" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-form-group label="Name">
                    <b-form-input type="text" v-model="$v.name.$model" :state="!$v.name.$error" />
                    <b-form-invalid-feedback v-if="!$v.name.required">Please enter garage name</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Chairman Name" class="error-l-100">
                    <b-form-input type="text" v-model="$v.chairman_name.$model" :state="!$v.chairman_name.$error" />
                    <b-form-invalid-feedback v-if="!$v.chairman_name.required">Please enter chairman name</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label=" Chairman Phone" class="error-l-100">
                  <b-form-input type="text" v-model="$v.phone.$model" :state="!$v.phone.$error" />
                  <b-form-invalid-feedback v-if="!$v.phone.required">Please enter phone number</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.phone.numeric">Enter valid phone number</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.phone.minLength">Enter valid phone number</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Local Governmant" class="error-l-100">
                    <b-form-select v-model="$v.local_government_id.$model"
                      :options="lgs" :state="!$v.local_government_id.$error"
                    />
                    <b-form-invalid-feedback v-if="!$v.local_government_id.required">Select local government</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Vehicle Type">
                    <div>
                      <b-form-select v-model="$v.vehicle_type_id.$model"
                        :options="vehicleTypes" :state="!$v.vehicle_type_id.$error"
                      />
                      <b-form-invalid-feedback v-if="!$v.vehicle_type_id.required">Select type</b-form-invalid-feedback>
                    </div>
                    <!-- <b-form-input type="text" v-model="$v.vehicle_type_id.$model" :state="!$v.vehicle_type_id.$error" /> -->
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
import { GARAGES, hToken } from '../../../../constants/formKey';
const { required, minLength, numeric} = require("vuelidate/lib/validators");


export default {
  data() {
    return {
      name: "",
      chairman_name: "",
      phone: "",
      local_government_id: "",
      vehicle_type_id: "",
      submitting: false,
      resMessage: "",
      variant: "success",
      selected: null,
    };
  },
  mixins: [validationMixin],
  validations: {
    name: {
        required,
    },
    vehicle_type_id: {
      required,
    },
    chairman_name: {
      required,
    },
     phone: {
        required,
        numeric,
        minLength: minLength(11)
    },
    local_government_id: {
      required,
    },

  },

  computed: {
    vehicleTypes(){
      let all = this.$store.getters.vehicleTypes;
      if(all){
        return all.map(d=>({value:d.id, text:d.name}))
      }else{
        return []
      }
    },

    lgs(){
      let all = this.$store.getters.lgs;
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
        local_government_id:this.local_government_id,
        name:this.name,
        chairman_name:this.chairman_name,
        vehicle_type_id:this.vehicle_type_id,
        phone: this.phone,
      }

      // console.log(formData);
      this.submitting = true;
      Axios.post(`${PROXY}location/garage`, formData, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.variant = "success";
          this.resMessage = res.data.message;
          this.$refs.form.reset();
          this.$store.dispatch(GARAGES);
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
