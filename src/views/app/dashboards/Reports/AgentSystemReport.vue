<template>
  <div>
    <b-button-group class="mb-2">
      <b-button disabled>Export</b-button>
      <b-button variant="primary">PDF</b-button>
      <b-button variant="primary" @click="omal">
        <download-csv
          :data= "items"
          name="Agents_system_activities.csv"
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
      ref="vuetable-agent-system"
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
    apiBase: `${PROXY}admin/agent/activities`,//apiUrl + "/cakes/fordatatable",
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
        name: "agent.agent_no",
        sortField: "agent.agent_no",
        title: "Account No",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
      },
      {
        name:"description",
        sortField: "description",
        title: "Description",
        titleClass: "",
        dataClass: "",
        width: "10%"
      }
    ]
  }),

  methods: {
     seeVent(data){
        console.log(data.data.data, 'agents system');
        if(data.data.data){
          this.items = data.data.data.map(data=>({
            "Name": data.agent.agent_no,
            "Description": data.description,
          }))
        }
      },

      omal(){
        this.$refs['vuetable-agent-system'].refresh('table.csv')//refresh();
      },
  }



}
</script>
