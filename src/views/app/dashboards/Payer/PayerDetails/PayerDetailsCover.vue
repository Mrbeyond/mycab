<template>
<div>
   <PayerDetailsBasic  />
   <PayerDetailsBusiness />
   <PayerDetailsVehicles />
   <b-toast :variant="variant" id="example-toast"
      title="Response" auto-hide-delay="8000"
    >
      {{ resMessage }}
    </b-toast>
</div>
</template>
<script>
import Axios from 'axios';
import { PROXY } from '../../../../../constants/config';
import { hToken } from '../../../../../constants/formKey';
import PayerDetailsBasic from './PayerDetailsBasic.vue';
import payerDetailsBusiness from './payerDetailsBusiness'
import PayerDetailsVehicles from './PayerDetailsVehicles.vue';
export default {
  components: {
    PayerDetailsBasic,
    PayerDetailsBusiness,
    PayerDetailsVehicles
  },

  data: ()=>({
    localVehicles: null,
    basics: null,
    business: null,
    isLoading: true,
    isBusiness: null,
    isFetched: false,
    resMessage: "",
    variant: "success",



  }),
  methods: {
    getTerminals(id){
      Axios.get(`${PROXY}admin/payer/details/${id}`, {headers: hToken()})
    .then(res=>{
      if(!res.data.error){
          this.variant = "success";
          this.resMessage = res.data.message;

        }else{
          this.variant = "danger";
          this.resMessage = "Something went wrong, please retry"
        }
        this.$bvToast.show("example-toast");
        this.submitting = false;
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
        this.submitting = false;
    })

    },
  },
  created(){

  },
  // beforeEnter: (to, from, next) => {
  //   console.log(to, from);
  //   // alert(to.params.id)
  // //   next(vm => {
  // //   // access to component instance via `vm`
  // // })
  // next();

  // }

}
</script>
