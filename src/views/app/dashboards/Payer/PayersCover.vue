<template>
  <b-row>
    <b-colxx xxs="12">
      <h5 class="mb-4 card-title">{{ $t('cards.tab-card') }}</h5>
      <b-row>
        <b-colxx xxs="12" xs="6" lg="12" class="mb-3">
          <div v-if="isFetched" class="row justify-content-between">
            <b-card  v-for="(payer, index) in payers" v-bind:key="index" class="mb-4 col-6 col-md-6 col-12 row shadow" style="border-radius:20px" no-body>
              <b-tabs  card no-fade>
                <b-tab title="Account" active title-item-class="w-50 text-center h-20" >
                  <b-row>
                    First Name :  <p class="ml-3">{{payer.first_name}}</p>
                  </b-row>
                   <b-row>
                     Last Name :  <p class="ml-3">{{payer.last_name}}</p>
                  </b-row>
                  <b-row>
                     Email :  <p class="ml-3">{{payer.email}}</p>
                  </b-row>
                   <b-row>
                     address :  <p class="ml-3">{{payer.address}}</p>
                  </b-row>
                  <b-row>
                     Phone :  <p class="ml-3">{{payer.phone}}</p>
                  </b-row>
                  <b-row>
                     Account No. :  <p class="ml-3">{{payer.account_no}}</p>
                  </b-row>
                </b-tab>
                <b-tab title="Acount business" title-item-class="w-50 text-center ">
                  <b-row>
                    Account Name :  <p class="ml-3">{{payer.account_business_detail.name}}</p>
                  </b-row>
                   <b-row>
                     Address :  <p class="ml-3">{{payer.account_business_detail.address}}</p>
                  </b-row>
                  
                 
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>
<script>
import Axios from 'axios';
import { PROXY } from '../../../../constants/config';
import { hToken } from '../../../../constants/formKey';
export default {
  data: ()=>({
    payers: '',
    isLoading: true,
    isFetched: false,
    num: 0,

  }),
  methods: {
     fetchPayers(){
      Axios.get(`${PROXY}admin/payer/details`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.payers = res.data.data;
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
  beforeMount() {
    this.fetchPayers();
  },

  watch: {
    num(){
      // alert(this.num)
    }
  }
}
</script>
