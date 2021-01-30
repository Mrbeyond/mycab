<template>
  <div>Dashboard Cover</div>
</template>
<script>
import Axios from 'axios'
import { PROXY } from '../../../../constants/config'
import { hToken } from '../../../../constants/formKey'
export default {
  components:{

  },
  data:()=>({
    analytic: null,
    isLoading: true,
    isFetched: false,

  }),
  methods:{
    fetchAnalytics(){
      Axios.get(`${PROXY}admin/analytics`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.analytic = res.data.data;
          this.isFetched = true;
          return;
        }else{
          this.isFetched = false;
        }
          this.isLoading = false;

      })
      .catch(err=>{
        this.isFetched = false;
        this.isLoading = false;

      })
    }
  },

  beforeMount(){
    this.fetchAnalytics();
  }

}
</script>
