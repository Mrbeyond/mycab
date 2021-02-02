<template>
  <div id="app-container" :class="getMenuType">
    <topnav />
    <sidebar />
    <main>
      <!-- Beyond's modifications for dynamic menu starts here-->
      <div>
        <top-dynamic-menu />
      </div>
      <!-- Beyond's modifications for dynamic menu starts here-->
      <div class="container-fluid">
        <slot></slot>
      </div>

    </main>

    <footer-component />
  </div>
</template>

<script>// @ts-nocheck

import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";

import { mapGetters } from "vuex";
import TopDynamicMenu from '../views/app/dashboards/ListsHeader/TopDynamicMenu.vue';

export default {
  components: {
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer,
    TopDynamicMenu,
  },
  data:()=>({
  }),

  computed: {
    ...mapGetters(["getMenuType"]),
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  },

};
</script>
