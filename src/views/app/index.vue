<template>
  <app-layout>
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
  created(){
    this.getDefaultAPIs();
  },

  methods: {
    getDefaultAPIs(){
      this.$store.dispatch(PORTS);
      this.$store.dispatch(AGENTTYPES);
      this.$store.dispatch(LGS);
      this.$store.dispatch(ADMINTYPES);
      this.$store.dispatch(VEHICLE_TYPES);
    },
  }
};
</script>
