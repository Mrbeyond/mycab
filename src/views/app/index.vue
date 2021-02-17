<template>
  <app-layout v-if="currentUser && currentUser.id">
    <router-view />
  </app-layout>
</template>

<script>// @ts-nocheck

import { ADMINTYPES, AGENTTYPES, LGS, PORTS, VEHICLE_TYPES } from "../../constants/formKey";
import AppLayout from "../../layouts/AppLayout.vue";

export default {
  components: {
    "app-layout": AppLayout
  },

  computed:{
    currentUser(){
      let user = this.$store.getters.currentUser;
      return  (user && user.id && user.createdAt) ?user:false;
    }
  },

  watch:{
    currentUser(val){
      if(!val){
        this.$router.push('/login');
        return;
      }
    }
  },

  created(){
    this.getDefaultAPIs();
  },

  methods: {


    getDefaultAPIs(){
      if(!this.currentUser){
        this.$router.push('/login');
        return;
      }
      this.$store.dispatch(PORTS);
      this.$store.dispatch(AGENTTYPES);
      this.$store.dispatch(LGS);
      this.$store.dispatch(ADMINTYPES);
      this.$store.dispatch(VEHICLE_TYPES);
    },
  }
};
</script>
