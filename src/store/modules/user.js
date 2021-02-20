import Axios from 'axios';
import firebase from 'firebase/app'
import 'firebase/auth'
import {authUser, keepUser, PROXY } from '../../constants/config'
import { setCurrentUser, getCurrentUser } from '../../utils';
import { keepToken } from "./../../constants/formKey";

export default {
  state: {
    currentUser:  authUser(),//getCurrentUser(),//isAuthGuardActive ? getCurrentUser() : getCurrentUser(),
    // currentUser: isAuthGuardActive ? getCurrentUser() : currentUser,

    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null,
    resetError: null,
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    resetError: state => state.resetError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    resetError(state, payload){
      state.resetError = payload
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null;
      state.currentUser = null;
      state.processing = false;
      state.forgotMailSuccess = true;
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      // state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess = true
    },
    clearError(state) {
      state.loginError = null;
      state.resetError = null;
      state.resetPasswordSuccess = null;
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
        Axios.post(`${PROXY}admin/login`, payload)
        .then(res=>{
            if(!res.data.error){
              // const {authorization} = ;
              localStorage.AT = window// (res.data.data.authorization)
              keepToken(res.data.data.authorization);
              delete res.data.data.authorization;
              const user = res.data.data;
              keepUser(user)
              commit('setUser', user);
            }else{
              setCurrentUser(null);
              commit('setError', "Something went wrong");
            }

        })
        .catch(err=>{
            if(err && err.response && err.response.status === 401){
              setCurrentUser(null);
              commit('setError', err.message)
            }
        })

    },
    forgotPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      Axios.post(`${PROXY}admin/password/change`, payload)
      .then(res=>{
          if(!res.data.error){
            commit('resetPasswordSuccess')
          }else{
            commit('resetError', "Something went wrong");
          }
      })
      .catch(err=>{
          if(err && err.response && err.response.status === 401){
            console.log(err.response);
            commit('resetError', err.response.data.message)
          }
      })
    },


    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setCurrentUser(null);
          commit('setLogout')
        }, _error => { })
    }
  }
}
