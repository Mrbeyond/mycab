<template>
  <div id="app-container" :class="getMenuType">
    <topnav />
    <sidebar />
    <main>

      <div>
        <div v-if="showMenuTop">
          <piaf-breadcrumb :heading="current_path" />
          <div>
            <b-button @click="openFormsModal" >ADD NEW</b-button>
          </div>
          <div class="separator mb-5"></div>
        </div>
      </div>

      <AddNewModal :opener="opener" :formKey="formKey" />

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
import AddNewModal from '../views/app/dashboards/ListsHeader/AddNewModal.vue';
import { ADD_ADMIN, ADD_AGENT, ADD_CARD, ADD_PAYER, ADD_TAG, ADD_TERMINAL } from '../constants/formKey';

export default {
  components: {
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer,
    AddNewModal
  },
  data:()=>({
      formSets: [ADD_AGENT, ADD_PAYER, ADD_ADMIN, ADD_TERMINAL, ADD_CARD, ADD_TAG],
      show: false,
      showMenuTop: false,
      opener: false,
      current_path: " ",
      compo: "",
      formKey: "",
  }),
  methods: {
    openFormsModal(){
      this.opener = true;
      setTimeout(()=>{this.opener = false}, 300)
      // alert()
    }
  },

  computed: {
    ...mapGetters(["getMenuType"]),
    enroute(){
      return this.$route.path;
    },
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  },
  watch: {
    enroute(){
      console.log(this.enroute);
      let arr = ["agents","payers","admins","terminals", "cards", 'tags' ];
      if(this.enroute.split('/').length === 3){
        let curr = arr.find(data=>data.toString().toLowerCase() === this.enroute.split('/')[2].toString().toLowerCase());
        if(curr){
          curr = curr.toString();
         let ind = arr.indexOf(curr);
          this.formKey =  this.formSets[ind];
          this.current_path = curr.charAt(0).toUpperCase()+curr.slice(1, curr.length);
          this.showMenuTop = true;
        }else{
          this.showMenuTop = false;
          this.current_path=""
          this.formKey=""
        }
      }
    }

  },

 beforeMount(){
      let arr = ["agents","payers","admins","terminals", "cards", 'tags' ];
      if(this.enroute.split('/').length === 3){
        let curr = arr.find(data=>data.toString().toLowerCase() === this.enroute.split('/')[2].toString().toLowerCase());
        if(curr){
          curr = curr.toString();
          let ind = arr.indexOf(curr)
          this.formKey =  this.formSets[ind];
          this.current_path = curr.charAt(0).toUpperCase()+curr.slice(1, curr.length);
          this.showMenuTop = true;
        }else{
          this.showMenuTop = false;
          this.current_path=""
          this.formKey=""
        }
      }
 }

};
</script>
