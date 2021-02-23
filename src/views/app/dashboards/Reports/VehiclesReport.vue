<template>
  <div>
    <b-button-group class="mb-2">
      <b-button disabled>Export</b-button>
      <b-button variant="primary">PDF</b-button>
      <b-button variant="primary" @click="omal">
        <download-csv
          :data= "items"
          name="Vehicles.csv"
          >
          Excel
        </download-csv>
      </b-button>
      <b-button variant="primary">Email</b-button>
    </b-button-group>
  <!--

      :row-class="onRowClass"
      :query-params="makeQueryParams"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:cell-rightclicked="rightClicked"
  -->

    <vuetable
      ref="vuetable-vehicle"
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
import { hToken, LUX_ZONE } from '../../../../constants/formKey';
import { PROXY } from '../../../../constants/config';


export default {
  components:{
    vuetable: Vuetable,
  },

  data:()=>({
    head: {headers: hToken(),},
    isLoad: false,
    apiBase: `${PROXY}admin/vehicle/details`,//apiUrl + "/cakes/fordatatable",
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
        name: "vehicle_model",
        sortField: "model",
        title: "Model",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
      },
      {
        name:"vehicle_brand",
        sortField: "brand",
        title: "Brand",
        titleClass: "",
        dataClass: "",
        width: "10%"
      },

      {
        name: "vehicle_color",
        sortField: "color",
        title: "Color",
        titleClass: "",
        dataClass: "",
        width: "10%"
      },
      {
        name: "plate_number",
        sortField: "plate number",
        title: "Plate number",
        titleClass: "",
        dataClass: "",
        width: "10%"
      },
      {
        name: "vehicle_identification_number",
        sortField: "id",
        title: "VIN",
        titleClass: "",
        dataClass: "",
        width: "10%"
      },
      {
        name: "vehicle_year",
        sortField: "year",
        title: "Year",
        titleClass: "",
        dataClass: "",
        width: "10%"
      },
    ]
  }),

  methods: {
     seeVent(data){
        console.log(data.data.data, 'vehicles');
        if(data.data.data){
          this.items = data.data.data.map(data=>({
            "Model": data.vehicle_model,
            "Brand":data.vehicle_brand,
            "Color": data.vehicle_color,
            "Number": data.plate_number,
            "VIN": data.vehicle_identification_number,
            "Year": data.vehicle_year,
          }))
        }
      },

      omal(){
        this.$refs['vuetable-vehicle'].refresh('table.csv')//refresh();
      },
  }



}
</script>
