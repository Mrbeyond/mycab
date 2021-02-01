<template>
<div>
   <PayerDetailsBasic  />
   <PayerDetailsBusiness />
   <PayerDetailsVehicles />
</div>
</template>
<script>
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
    

  }),
  methods: {

  },
  created(){

  }
}
</script>
