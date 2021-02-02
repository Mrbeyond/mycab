<template>
  <user-layout>
    <router-view />
  </user-layout>
</template>

<script>// @ts-nocheck

import UserLayout from "../../layouts/UserLayout";

export default {
  components: {
    "user-layout": UserLayout
  }
};
</script>
