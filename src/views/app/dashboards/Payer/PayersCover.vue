<template>
  <b-row>
    <b-colxx xxs="12">
      <h5 class="mb-4 card-title">{{ $t('cards.tab-card') }}</h5>
      <b-row>
        <b-colxx xxs="12" xs="6" lg="6" class="mb-3">
          <div v-if="isFetched">
            <b-card v-for="(payer, index) in payers" v-bind:key="index" class="mb-4" no-body>
              <b-tabs v-model="num" card no-fade>
                <b-tab title="Tab 1" active title-item-class="w-50 text-center">
                jhjh
                </b-tab>
                <b-tab title="Tab 2" title-item-class="w-50 text-center">
hjjh
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
      alert(this.num)
    }
  }
}
</script>
