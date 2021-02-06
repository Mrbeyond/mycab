<template>
  <div v-if="selectedPayload" class="row-item">
    <b-card class="mb-4">

      <div>
      <h3><strong> Transaction</strong></h3>
       <div v-for="(item, i) in getKeys( getMainTransaction(selectedPayload))" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(getMainTransaction(selectedPayload)[item]):
          item.toLocaleLowerCase() == 'amount'? to_money(getMainTransaction(selectedPayload)[item]):
          item =="status"? mapSuccess(getMainTransaction(selectedPayload)[item]):
          getMainTransaction(selectedPayload)[item] === null? "Not added":
          getMainTransaction(selectedPayload)[item]
          }}
        </p>
        </div>
      </div>
    </b-card>
    <b-card class="mb-4" v-if="getKeys(selectedPayload.account_vehicle)">
      <div >
      <h3><strong>Transaction's vehicle</strong></h3>
       <div v-for="(item, i) in getKeys(selectedPayload.account_vehicle)" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(selectedPayload.account_vehicle[item]):
          item =="status"? mapActive(selectedPayload.account_vehicle[item]):
          selectedPayload.account_vehicle[item] === null? "Not added":
          selectedPayload.account_vehicle[item]
          }}
        </p>
        </div>
      </div>
    </b-card>
    <b-card class="mb-4" v-if="getKeys(selectedPayload.account_wallet_transaction)">
      <div >
      <h3><strong>Account Wallet</strong></h3>
       <div v-for="(item, i) in getKeys(selectedPayload.account_wallet_transaction)" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(selectedPayload.account_wallet_transaction[item]):
          item =="status"? mapActive(selectedPayload.account_wallet_transaction[item]):
          item.toLocaleLowerCase() == 'amount'? to_money(selectedPayload.account_wallet_transaction[item]):
          selectedPayload.account_wallet_transaction[item] === null? "Not added":
          selectedPayload.account_wallet_transaction[item]
          }}
        </p>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { LUX_ZONE, statusA, toMoney, statusS } from '../../../../constants/formKey';
export default {
  props: ['selectedPayload'],
  methods:{
    mapActive(val){
      return statusA[Number(val)]
    },

    mapSuccess(val){
      return statusS[Number(val)]
    },

    to_money(val){
      let result = toMoney(val);
      return (result == "0")? "\u20A60.00": "\u20A6"+result;
    },

    getKeys(data){
      if(!data) return;
      if( data&& data.updatedAt){
        delete data.updatedAt;
      }
      let KEYS = Object.keys(data).filter(data=>
      !(data.toString().includes('id') && !data.toString().includes('identi')) && !data.toString().includes('type'));
      console.log(KEYS);
      return KEYS;
    },

    formatName(name){
      if(!name) return "";
      let Name = name.toString();
      name = name.replaceAll('_', " ");
      name = name.charAt(0).toUpperCase()+name.slice(1, name.length)
      return name;
    },

    formatDate(date){
      return LUX_ZONE(date);
    },

    getMainTransaction(val){

      if(!val || typeof val !== "object") return [];
        let value = {...val};
        delete value.account_wallet_transaction;
        delete value.account_vehicle;
        return value;

    }
  }
  ,
  computed: {

  },
  mounted(){
    // console.log(this.selectedPayload);
  }
}

</script>
