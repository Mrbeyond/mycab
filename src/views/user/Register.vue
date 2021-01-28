<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  Please use this form to register. <br />If you are a member, please
                <router-link tag="a" to="/user/login" class="white">login</router-link>.
              </p>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">

              <b-form-group >
                <label class="form-group has-float-label mb-4">
                  <input id="firstName" type="text"
                    class="form-control" v-model="first_name"
                    @blur="validateFirstName"
                    @keyup="validateTouch"
                    >
                  <span>{{ $t('user.firstname') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="firstNameTouched && isFirstNameInvalid" >
                  Use a valid name with minimum of 3 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group >
                <label class="form-group has-float-label mb-4">
                  <input id="lastName" type="text"
                    class="form-control" v-model="last_name"
                    @blur="validateLastName"
                    @keyup="validateTouch"
                  >
                  <span>{{ $t('user.lastname') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="lastNameTouched && isLastNameInvalid" >
                  Use a valid name with minimum of 3 characters
                </b-form-invalid-feedback>
              </b-form-group>


              <b-form-group >
              <label class="form-group has-float-label mb-4">
                <input id="Email" type="email"
                  class="form-control" v-model="email"
                  @blur="validateEmail"
                  @keyup="validateTouch"
                  >
                <span>{{ $t('user.email') }}</span>
              </label>
              <b-form-invalid-feedback :force-show="emailTouched && isEmailInvalid" >
                  Use a valid email
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group>
                <label class="has-float-label">
                  <input id="Phone" type="text"
                      class="form-control" v-model="phone"
                      @blur="validatePhone"
                      @keyup="validateTouch"
                    >
                  <span>{{ $t('user.phone') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="phoneTouched && isPhoneInvalid" >
                  A valid phone number is required
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group >
                <label class="form-group has-float-label mb-4">
                  <input id="BusinessName" type="text" class="form-control"
                    v-model="business_name"
                    @blur="validateBusinessName"
                    @keyup="validateTouch"
                    >
                  <span>{{ $t('user.business-name') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="businessNameTouched && isBusinessNameInvalid" >
                  Use a valid name with minimum of 3 characters
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group >
                <label class="form-group has-float-label mb-4">
                  <input id="playerId" type="text"
                    class="form-control" v-model="player_id"
                    @blur="validatePlayerId"
                    @keyup="validateTouch"
                  >
                  <span>{{ $t('user.player-id') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="playerIdTouched && isPlayerIdInvalid" >
                  A valid number is required
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group>
                <label class="form-group has-float-label ">
                  <input id="Password" type="password"
                    class="form-control" v-model="password"
                    @blur="validatePassword"
                    @keyup="validateTouch"
                  >
                  <span>{{ $t('user.password') }}</span>
                </label>
                <b-form-invalid-feedback :force-show="passwordTouched && isPasswordInvalid" >
                  Use alphanumeric characters or an underscore with minimum length of 8
                </b-form-invalid-feedback>
              </b-form-group>

              <div class="text-center">
                <b-spinner v-if="submitting" label="Spinning"></b-spinner>
              </div>

              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow"
                  >
                    {{ $t('user.register-button')}}
                  </b-button>
              </div>


              <b-toast variant="danger" id="example-toast" title="Something went wrong" >
                Please try again, there was error processing your regristration
              </b-toast>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import axios from 'axios';
import { adminRoot, PROXY } from '../../constants/config'
import { setCurrentUser } from '../../utils';
export default {
  data () {
    return {
      attempted: false,
      wentWrong: false,
      successful: false,
      submitting: false,

      formIsValid: false,

      first_name: '',
      firstNameTouched: false,
      isFirstNameInvalid: false,

      last_name: '',
      isLastNameInvalid: false,
      lastNameTouched: false,

      phone: '',
      isPhoneInvalid: false,
      phoneTouched: false,

      business_name:'',
      businessNameTouched: false,
      isBusinessNameInvalid: false,

      player_id:'',
      playerIdTouched: false,
      isPlayerIdInvalid: false,

      email: '',
      emailTouched: false,
      isEmailInvalid: false,

      password: '',
      passwordTouched: false,
      isPasswordInvalid: false,

    }
  },
  methods: {

    validatePhone(){
      this.phoneTouched = true;
      this.validateTouch();
    },
    validateFirstName(){
      this.firstNameTouched = true;
      this.validateTouch();
    },
    validateLastName(){
      this.lastNameTouched = true;
      this.validateTouch();
    },
    validateBusinessName(){
      this.businessNameTouched = true;
      this.validateTouch();
    },
    validatePlayerId(){
      this.playerIdTouched = true;
      this.validateTouch();
    },
    validatePassword(){
      this.passwordTouched = true;
      this.validateTouch();
    },
    validateEmail(){
      this.emailTouched = true;
      this.validateTouch();
    },
    validateTouch(){
      let isFormValid = false;
      if(this.phoneTouched){
        if(!/^[0-9]{11,}$/.test(this.phone)){
          this.isPhoneInvalid = true;
          isFormValid = false;
        }else{
          this.isPhoneInvalid = false;
          isFormValid = true;
        }
      }
      if(this.firstNameTouched){
        if(!/^[a-zA-Z]{3,}$/.test(this.first_name)){
          this.isFirstNameInvalid = true;
          isFormValid = false;
        }else{
          this.isFirstNameInvalid = false;
          isFormValid = true;
        }
      }
      if(this.lastNameTouched){
        if(!/^[a-zA-Z]{3,}$/.test(this.last_name)){
          this.isLastNameInvalid = true;
          isFormValid = false;
        }else{
          this.isLastNameInvalid = false;
          isFormValid = true;
        }
      }
      if(this.businessNameTouched){
        if(!/^[a-zA-Z0-9]{3,}$/.test(this.business_name)){
          this.isBusinessNameInvalid = true;
          isFormValid = false;
        }else{
          this.isBusinessNameInvalid = false;
          isFormValid = true;
        }
      }
      if(this.passwordTouched){
        if(!/^[_a-zA-Z0-9]{8,}$/.test(this.password)){
          this.isPasswordInvalid = true;
          isFormValid = false;
        }else{
          this.isPasswordInvalid = false;
          isFormValid = true;
        }
      }
      if(this.playerIdTouched){
        if(!/^[0-9]{11,}$/.test(this.phone)){
          this.isPlayerIdInvalid = true;
          isFormValid = false;
        }else{
          this.isPlayerIdInvalid = false;
          isFormValid = true;
        }
      }
      if(this.emailTouched){
        if(!/^\w+\.*\w+@\w+\.\w+$/.test(this.email)){
          this.isEmailInvalid = true;
          isFormValid = false;
        }else{
          this.isEmailInvalid = false;
          isFormValid = true;
        }
      }
      this.formIsValid = isFormValid;
    },

    formSubmit () {
      if(this.submitting) return;

      // this.$router.push(adminRoot)
      this.phoneTouched = true;
      this.firstNameTouched = true;
      this.emailTouched = true;
      this.passwordTouched = true;
      this.businessNameTouched = true;
      this.playerIdTouched = true;
      this.lastNameTouched = true;
      this.validateTouch();
      if(!this.formIsValid){
        return;
      }
     let formData = {
      phone:this.phone,
      password:this.password,
      business_name:this.business_name,
      first_name:this.first_name,
      last_name:this.last_name,
      email:this.email,
      player_id:this.player_id
      }

      console.log(formData);
      this.submitting = true;
      axios.post(`${PROXY}payer/register'`, formData)
      .then(res=>{
        if(!res.data.error){
          localStorage.authToken = res.data.data.authorization
          delete res.data.data.authorization;
          const authUser = res.data.data;
          setCurrentUser(authUser)
          this.$store.commit("setUser", authUser);
        }else{
          this.$store.commit("setUser", null);
          this.$bvToast.show("example-toast");
          // commit('setError', "Something went wrong");
        }
        this.submitting = false;
      })
      .catch(err=>{
        console.log(err);
        if(err && err.response){
          alert(err.response.status)
        }

        this.$bvToast.show("example-toast");
        this.submitting = false;
      })

    }
  }
}
</script>
