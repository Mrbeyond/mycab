<template >
<div>
    <div>
      <b-nav v-if="showMenuTop" fill>

        <div class="top-right-button-container float-left">
            <b-button @click="openFormsModal">ADD NEW</b-button>
        </div>
      </b-nav>
      <hr />

    </div>
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
