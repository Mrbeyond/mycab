<template>
<div v-if="isLoading" style="h-100">

  <div class="align-middle">
    <div class="d-flex justify-content-center">
      <b-spinner variant="primary" />
    </div>
  </div>
</div>
<div v-else >


    <!-- Payer details part -->
     <!-- class="d-column d-md-flex justify-content-md-between" -->
    <div>
      <PayerDetailsBasic  :PAYLOAD="childLoad" /> <!-- Basic details-->
    </div>

    <!-- Vehicles table section -->
    <div v-if="localVehicles">
      <!-- Table Description -->
      <div class="text-muted text-center mt-4">
          <h2>List of Payer's Vehicle(s)</h2>
      </div>
      <!-- Table -->
      <PayerDetailsVehicles  :localData="localVehicles" />
    </div>

   <b-toast :variant="variant" id="example-toast"
      title="Response" auto-hide-delay="8000"
    >
      {{ resMessage }}
    </b-toast>
</div>
</template>
<script>// @ts-nocheck

import Axios from 'axios';
import { PROXY } from '../../../../../constants/config';
import { hToken, permission } from '../../../../../constants/formKey';
import PayerDetailsBasic from './PayerDetailsBasic.vue';
import PayerDetailsVehicles from './PayerDetailsVehicles.vue';


export default {
  components: {
    PayerDetailsBasic,
    PayerDetailsVehicles,
  },

  data: ()=>({
    localVehicles: null,
    childLoad: null,
    isLoading: true,
    isFetched: false,
    resMessage: "",
    variant: "success",



  }),
  methods: {
    getData(id){//${id}
      Axios.get(`${PROXY}admin/payer/details/141`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
        if(typeof res.data.data === "object"){
          if (res.data.data.length === 0){
            this.$router.push(({ path: 'not-found' }));
            return;
          }
        }
        this.variant = "success";
        this.resMessage = res.data.message;
        let resData = {...res.data.data[0]};
        let copyData = {...res.data.data[0]}
        // console.log(resData);
        const vehicles = copyData.account_vehicles;
        delete resData.account_vehicles;
        let account = copyData.account_business_detail;
        delete resData.account_business_detail;
        let is_business = copyData.is_business;
        delete resData.is_business;
        this.localVehicles = vehicles;
        this.childLoad = {business:account, basic:resData }
        // console.log(this.selectedPayload);

        }else{
          this.variant = "danger";
          this.resMessage = "Something went wrong, please retry"
        }
        this.$bvToast.show("example-toast");
        this.isLoading = false;
    })
    .catch(err => {
        this.variant = "danger";
        if(err && err.response){
          if(err.response.status && err.response.status == 404){
            this.$router.redirect('/not-found');
            return;
          }
         if(err.response.data && err.response.data.message){
           this.resMessage = err.response.data.message
         }else{
          this.resMessage = "Something went wrong, please retry"
         }
        }
        this.$bvToast.show("example-toast");
        this.isLoading = false;
    })

    },
  },
  created(){
    if(!permission("payers", this.$store.getters.currentUser)){
      localStorage.clear();
      this.$router.push('/login');
      return
    }else{
      let id = this.$route.params.id;
      this.getData(id);
    }

  },
  beforeEnter(to, from, next){
    // console.log(to, from);
    // alert(to.params.id)
    next(vm => {
  //   // access to component instance via `vm`
  })
  next();

  }

}
</script>
