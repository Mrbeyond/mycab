<template>
  <div v-if="selectedPayload" class="row-item">
    <b-card class="mb-4">

      <div>
      <h3><strong> Transaction</strong></strong></h3>
       <div v-for="(item, i) in getKeys( getMainTransaction(selectedPayload))" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(getMainTransaction(selectedPayload)[item]): getMainTransaction(selectedPayload)[item] === null? "Null":
          getMainTransaction(selectedPayload)[item]
          }}
        </p>
        </div>
      </div>
    </b-card>
    <b-card class="mb-4">
      <div>
      <h3><strong>Transaction's vehicle</strong></h3>
       <div v-for="(item, i) in getKeys(selectedPayload.account_vehicle)" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(selectedPayload.account_vehicle[item]): selectedPayload.account_vehicle[item] === null? "Null":
          selectedPayload.account_vehicle[item]
          }}
        </p>
        </div>
      </div>
    </b-card>
    <b-card class="mb-4">
      <div>
      <h3><strong>Account Wallet</strong></h3>
       <div v-for="(item, i) in getKeys(selectedPayload.account_wallet_transaction)" v-bind:key="i">
        <p class="mb-2 text-muted text-small">{{formatName(item)}}</p>
        <p class="mb-3">
          {{ item == "createdAt"?
          formatDate(selectedPayload.account_wallet_transaction[item]): selectedPayload.account_wallet_transaction[item] === null? "Null":
          selectedPayload.account_wallet_transaction[item]
          }}
        </p>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { LUX_ZONE } from '../../../../constants/formKey';
export default {
  props: ['selectedPayload'],
  methods:{
    getKeys(data){
      if(!data) return;
      if( data&& data.updatedAt){
        delete data.updatedAt;
      }
      return Object.keys(data).filter(data=> !data.toString().includes('id'));
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
    console.log(this.selectedPayload);
  }
}

</script>
