<template>
  <div>
    <b-button-group class="mb-2">
      <b-button disabled>Export</b-button>
      <b-button  variant="primary"
        @click="exPdf"
      >
        PDF
      </b-button>
      <b-button variant="primary" >
        <download-csv
          :data= "items"
          name="Payers.csv"
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
      ref="vuetable-payer"
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
import {jsPDF} from "jspdf";

export default {
  components:{
    vuetable: Vuetable,
  },

  data:()=>({
    head: {headers: hToken(),},
    isLoad: false,
    apiBase: `${PROXY}admin/payer/details`,//apiUrl + "/cakes/fordatatable",
    sort: "",
    page: 1,
    perPage: 8,
    search: "",
    from: 0,
    to: 0,
    total: 0,
    lastPage: 0,
    items: [],
    pdfHeader: [],
    fields: [
      {
        name: "first_name",
        sortField: "first_name",
        title: "First Name",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
      },
      {
        name:"last_name",
        sortField: "last_name",
        title: "Last Name",
        titleClass: "",
        dataClass: "",
        width: "10%"
      },

      {
        name: "phone",
        sortField: "phone",
        title: "Phone",
        titleClass: "",
        dataClass: "",
        width: "10%"
      },
    ]
  }),

  methods: {
     seeVent(data){
        console.log(data.data.data);
        if(data.data.data){
          this.items = data.data.data.map(data=>({
            "First Name": data.first_name,
            "Last Name": data.last_name,
            "Phone": data.phone.toString(),
          }))
           this.toHeader();

        }
      },

      toHeader(){
        if(this.items.length < 1) return;
        this.pdfHeader =  Object.keys(this.items[0]).map(key=>({
          name: key,
          prompt: key,
          width: 65,
          align: "center",
          padding: 0,
        }))
      },

      exPdf(){
        if(this.items.length < 1) return;
        const pdf = new jsPDF();
        pdf.text(10, 10, "MECP Payers Report");
        pdf.table(5, 15, this.items, this.pdfHeader);
        pdf.save("Payers-report.pdf");
      },

      omal(){
        this.$refs['vuetable-payer'].refresh('table.csv')//refresh();
      },
  }



}
</script>
