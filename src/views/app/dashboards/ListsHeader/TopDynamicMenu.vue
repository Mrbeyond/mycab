<template >
<div>
    <!-- <div class="float-right"> -->
      <b-nav v-if="showMenuTop">

        <div class="top-right-button-container col-12 ">
          <div class="float-left">
            <strong><span> {{ current_path }}</span></strong>
          </div>
          <div class="float-right">
            <span @click="thenRefresh">

              <i class="iconsminds-repeat-3 spin text-large bg-primary m-3"
                style="border-radius:20px" v-if="!refresher.status "
              />
              <span v-else>
                <b-spinner variant="primary"  label="Small Spinner"></b-spinner>
                <b-spinner variant="primary"  label="Small Spinner" type="grow"></b-spinner>
              </span>

            </span>

            <b-button class="bg-brimary" @click="openFormsModal">
              ADD NEW
            </b-button>
          </div>
        </div>
      </b-nav>
      <hr />

    <!-- </div> -->
    <AddNewModal :formKey="formKey" :opener="opener" />

</div>



</template>
<script>import AddNewModal from './AddNewModal.vue'

import { ADMINS, AGENTS, ALL_GARAGES, CARDS, enroute, PAYERS, TAGS, TERMINALS } from "../../../../constants/formKey";

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
    },

    thenRefresh(){
      if(this.refresher.status) return;
      let {owner} = this.refresher;
      if(owner == ADMINS){ return this.$store.dispatch(ADMINS)}
      if(owner == AGENTS){ return this.$store.dispatch(AGENTS)}
      if(owner == PAYERS){ return this.$store.dispatch(PAYERS)}
      if(owner == ALL_GARAGES){ return this.$store.dispatch(ALL_GARAGES)}
      if(owner == TERMINALS){ return this.$store.dispatch(TERMINALS)}
      if(owner == CARDS){ return this.$store.dispatch(CARDS)}
      if(owner == TAGS){ return this.$store.dispatch(TAGS)}

    },
  },

  computed: {
    route_path(){
      return this.$route.path;
    },
    refresher(){
      return this.$store.getters.refresher;
    }
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
    },

    refresher(){
        // console.log(this.refresher);
    }

  },

 beforeMount(){
  this.showMenuTop = this.pathMonitor(this.route_path).showMenuTop;
  this.formKey = this.pathMonitor(this.route_path).formKey;
  this.current_path = this.pathMonitor(this.route_path).current_path;
 },
}
</script>
