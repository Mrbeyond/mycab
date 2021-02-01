<template>
  <div id="app-container" :class="getMenuType">
    <topnav />
    <sidebar />
    <main>
      <!-- <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Terminal" />
         <b-button
          v-b-modal.modalright
          variant="primary"
          size="lg"
          class="top-right-button float-right"
        >
        {{ $t('pages.add-new') }}
        </b-button>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row> -->
      <div class="container-fluid">
        <slot></slot>
      </div>
    </main>
   
    <footer-component />
  </div>
</template>

<script>
import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";

import { mapGetters } from "vuex";
import AddNewModal from '../views/app/dashboards/ListsHeader/AddNewModal.vue';

export default {
  components: {
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer,
    AddNewModal
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["getMenuType"])
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  }
};
</script>
