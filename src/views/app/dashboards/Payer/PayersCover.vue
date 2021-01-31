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
                  <b-row>
                     Created time :  <p class="ml-3">{{payer.account_business_detail.createdAt}}</p>
                  </b-row>
                   <b-row>
                     Account id :  <p class="ml-3">{{payer.account_business_detail.account_id}}</p>
                  </b-row>

                </b-tab>
                 <b-row class=" float-right p-2 text-primary">
                      <h2 style="font-weight:1000;cursor:pointer" v-if="payer.account_vehicles !=''" @click="showAcc(payer.account_vehicles)"  v-b-modal.modalbasic>Account vehicle</h2>
                  </b-row>
              </b-tabs>
            </b-card>
            <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('modal.right-modal')">
            <b-button v-b-modal.modalright variant="outline-primary">{{ $t('modal.launch-right-modal') }}</b-button>
            <b-modal id="modalbasic" ref="modalright" :title="$t('modal.modal-title')" modal-class="modal-right">
                {{payers}}
                <template slot="modal-footer">
                    <b-button variant="primary" @click="somethingModal('modalright')" class="mr-1">Do Something</b-button>
                    <b-button variant="secondary" @click="hideModal('modalright')">Cancel</b-button>
                </template>
            </b-modal>
        </b-card>
    </b-colxx>
            <!-- <b-colxx xxs="12">
            <b-modal id="modalbasic" ref="modalbasic" :title="$t('modal.modal-title')">
              <div  v-for="(data,index) in account_vehicles" :key="index">
                <div v-if="account_vehicles">
                 <b-row>
                    Vehicle brand :  <p class="ml-3">{{data.vehicle_brand}}</p>
                  </b-row>
                   <b-row>
                     vehicle color :  <p class="ml-3">{{data.vehicle_color}}</p>
                  </b-row>
                   <b-row>
                     Vehicle model :  <p class="ml-3">{{data.vehicle_model}}</p>
                  </b-row>
                  <b-row>
                     Vehicle year. :  <p class="ml-3">{{data.vehicle_year}}</p>
                  </b-row>
                </div>
                <hr>
              </div>
                <template slot="modal-footer">
                    <b-button variant="secondary" @click="hideModal('modalbasic')">Cancel</b-button>
                </template>
            </b-modal>
    </b-colxx> -->
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
    account_vehicles:""

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
    },
    showAcc(e){
     this.account_vehicles = e;
    },
     hideModal (refname) {
      this.$refs[refname].hide()
      console.log('hide modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    },
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
