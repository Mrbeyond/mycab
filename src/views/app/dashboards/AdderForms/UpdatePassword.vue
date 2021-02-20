<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="form-side pt-4">
          <div class="mb-4">
            <img src="./../../../../assets/lasepa-mobile-logo.png" height="40" width="100" />
            <strong class="d-block text-dark mt-3" >Change password</strong>
          </div>

          <b-form @submit.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
            <b-form-group label="Old password" class="has-float-label mb-4">
              <b-form-input
                type="password"
                v-model="$v.form.old.$model"
                :state="!$v.form.old.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your old password</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
              <b-form-input
                type="password"
                v-model="$v.form.password.$model"
                :state="!$v.form.password.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password</b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.password.minLength || !$v.form.password.pat"
              >
                Use alphanumeric characters or an underscore with minimum length of 8
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group :label="$t('user.password-again')" class="has-float-label mb-4">
              <b-form-input
                type="password"
                v-model="$v.form.passwordAgain.$model"
                :state="!$v.form.passwordAgain.$error"
              />
              <b-form-invalid-feedback
                v-if="!$v.form.passwordAgain.required"
              >Please enter your password again</b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.passwordAgain.sameAsPassword"
              >Your inputs does not match</b-form-invalid-feedback>
            </b-form-group>

            <div class="d-flex justify-content-between align-items-center">
              <router-link
                tag="a"
                to="/user/forgot-password"
              >{{ $t('user.forgot-password-question')}}</router-link>
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                :disabled="processing"
                :class="{'btn-multiple-state btn-shadow': true,
                    'show-spinner': processing,
                    'show-success': !processing && resetError===false,
                    'show-fail': !processing && resetError }"
              >
                <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label">{{ $t('user.reset-password-button') }}</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>// @ts-nocheck

import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
const {
  required,
  minLength,
  sameAs
} = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      form: {
        old:"",
        password: "",
        passwordAgain: ""
      }
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      old: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
        patt: (patt)=>(/^[_a-zA-Z0-9]{8,}$/.test(patt))
      },
      passwordAgain: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    ...mapGetters([
      "processing",
      "resetError",
      "resetPasswordSuccess"
    ])
  },
  methods: {
    ...mapActions(["resetPassword"]),
    formSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.resetPassword({
          old_password: this.form.old,
          new_password: this.form.password,
        });
      }
    }
  },
  watch: {
    resetError(val) {
      if (val != null) {
        this.$notify("error", "Reset Password Error", val, {
          duration: 3000,
          permanent: false
        });
      }
    },
    resetPasswordSuccess(val) {
      if (val) {
        this.$notify(
          "success",
          "Reset Password Successful",
          "Reset password successful",
          {
            duration: 3000,
            permanent: false
          }
        );
      }
    }
  }
};
</script>
