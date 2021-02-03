<template >
<div>
    <!-- <div class="float-right"> -->
      <b-nav v-if="showMenuTop">

        <div class="top-right-button-container col-12 ">
          <div class="float-right">
            <!-- <i class="iconsminds-repeat-3 spin text-large bg-primary m-3" style="border-radius:20px"></i>
            <b-spinner variant="primary" /> -->
            <b-button class="bg-brimary " @click="openFormsModal">ADD NEW</b-button>
          </div>
        </div>
      </b-nav>
      <hr />

    <!-- </div> -->
    <AddNewModal :formKey="formKey" :opener="opener" />

</div>



</template>
<script>import AddNewModal from './AddNewModal.vue'

import { enroute } from "../../../../constants/formKey";

export default {
  components: {
    AddNewModal,
  },
  data:()=>({

      showMenuTop: false,
      opener: false,
      current_path: " ",
      formKey: "",
  }),
  methods: {
    openFormsModal(){
      this.opener = true;
      setTimeout(()=>{this.opener = false}, 300)
    },

    pathMonitor(data){
      return enroute(data);
    }
  },

  computed: {
    route_path(){
      return this.$route.path;
    },
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  },
  watch: {
    route_path(){
      this.showMenuTop = this.pathMonitor(this.route_path).showMenuTop;
      this.formKey = this.pathMonitor(this.route_path).formKey;
      this.current_path = this.pathMonitor(this.route_path).current_path;
    }

  },

 beforeMount(){
  this.showMenuTop = this.pathMonitor(this.route_path).showMenuTop;
  this.formKey = this.pathMonitor(this.route_path).formKey;
  this.current_path = this.pathMonitor(this.route_path).current_path;
 },
}
</script>
