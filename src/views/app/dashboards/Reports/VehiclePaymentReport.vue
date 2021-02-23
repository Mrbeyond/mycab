<template>
  <div>
    <b-button-group class="mb-2">
      <b-button disabled>Export</b-button>
      <b-button variant="primary">PDF</b-button>
      <b-button variant="primary" @click="omal">
        <download-csv
          :data= "items"
          name="Vehicle_payments.csv"
          >
          Excel
        </download-csv>
      </b-button>
      <!-- <b-button variant="primary">Email</b-button> -->
    </b-button-group>
  <!--

      :row-class="onRowClass"
      :query-params="makeQueryParams"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:cell-rightclicked="rightClicked"
  -->

    <vuetable
      ref="vuetable-vehicle-payment"
      class="table-divided order-with-arrow"
      :per-page="perPage"
      :http-options="head"
      :api-url="apiBase"
      :reactive-api-url="false"
      :fields="fields"
      pagination-path
      @vuetable:load-success="seeVent"
    >
    </vuetable>
  </div>
</template>
<script>// @ts-nocheck

import Vuetable from "vuetable-2/src/components/Vuetable";
import { hToken, LUX_ZONE, toMoney } from '../../../../constants/formKey';
import { PROXY } from '../../../../constants/config';


export default {
  components:{
    vuetable: Vuetable,
  },

  data:()=>({
    head: {headers: hToken(),},
    isLoad: false,
    apiBase: `${PROXY}admin/vehicles/payments`,//apiUrl + "/cakes/fordatatable",
    sort: "",
    page: 1,
    perPage: 8,
    search: "",
    from: 0,
    to: 0,
    total: 0,
    lastPage: 0,
    items: [],
    fields: [
      {
        name: "amount",
        sortField: "amount",
        title: "Amount",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%",
         callback(val){
          let result = toMoney(val);
          return (result == "0")? "\u20A60.00": "\u20A6"+result;
          }
      },
      {
        name: "createdAt",
        sortField: "createdAt",
        title: "Created On",
        titleClass: "",
        dataClass: "",
        width: "10%",
        callback(value){
          return LUX_ZONE(value);
        },
      },
    ]
  }),

  methods: {
     seeVent(data){
        console.log(data.data.data, 'Vehicle payment');
        if(data.data.data){
          this.items = data.data.data.map(data=>({
            "Amount": toMoney(data.amount)=="0"?"\u20A60.00": "\u20A6"+toMoney(data.amount),
            "Date": LUX_ZONE(data.createdAt),
          }))
        }
      },

      omal(){
        this.$refs['vuetable-vehicle-payment'].refresh('table.csv')//refresh();
      },
  }



}
</script>
