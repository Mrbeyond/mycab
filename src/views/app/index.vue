<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script>// @ts-nocheck

import AppLayout from "../../layouts/AppLayout";

export default {
  components: {
    "app-layout": AppLayout
  }
};
</script>
