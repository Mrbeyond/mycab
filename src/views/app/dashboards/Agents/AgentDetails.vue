
<template>
  <div>
    <!--<datatable-heading
      :title="$t('menu.divided-table')"
      :selectAll="selectAll"
      :isSelectedAll="isSelectedAll"
      :isAnyItemSelected="isAnyItemSelected"
      :keymap="keymap"
      :changePageSize="changePageSize"
      :searchChange="searchChange"
      :from="from"
      :to="to"
      :total="total"
      :perPage="perPage"
    ></datatable-heading>-->
       <b-row class="align-items-center mb-5 justify-content-center m-1">
              <b-card v-if="RightmodalData !='' && RightmodalData !=null" class="shadow-sm mb-3 col-12 pt-3" style="border-radius:20px">
                <!-- <h1>Basic info</h1> -->
                <div class="d-column d-md-flex justify-content-around row">
                <!-- <div v-if="RightmodalData.wallet !=null"                                                                                                                                                                                                                                                                                                                                                                                                                                         >
                </div> -->
                <div v-if="RightmodalData.wallet !=null">
                <p class="text-muted">Balance</p>
                <p >{{RightmodalData.wallet.balance}}</p>
                </div>
                <div v-if="RightmodalData.type !=null">
                <p class="text-muted">Agent  Type</p>
                <p >{{RightmodalData.type.name}}</p>
                </div>
                <div v-if="RightmodalData.port !=null">
                <p class="text-muted"> Port Name</p>
                <p >{{RightmodalData.port.name}}</p>
                </div>
                </div>
                
                   </b-card>
                   <!-- <b-card v-if="RightmodalData.port !=''  && RightmodalData.port !=null" class="text-center col-lg-3 shadow pt-3" style="border-radius:20px" header="PORT">
                <b-list-group >
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Name
                    <b-badge variant="primary" pill>{{RightmodalData.port.name}}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Status
                    <b-badge variant="primary" pill v-if="RightmodalData.port.status==1">Active</b-badge>
                    <b-badge variant="primary" pill v-else>Inactive</b-badge>

                  </b-list-group-item>
                </b-list-group>
                   </b-card> -->
    </b-row>

    <b-row>
      <b-colxx xxs="12">
          <h2 class="text-center">Registered vehicles</h2>
        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :http-options="head"
          :reactive-api-url="false"
          :fields="fields"
          :data="agentDetails"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"
          @vuetable:cell-clicked="cellClicked"
        >
           <template slot="wallet" slot-scope="props">
             <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
          </template>
          <template slot="agent" slot-scope="props">
          <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
          </template>
            <template slot="accve" slot-scope="props">
            <b-button class="bg-primary">View</b-button>
            </template>
            <template slot="nfc_terminals" slot-scope="props">
            <b-button class="bg-primary">View</b-button>
            </template>
             <template slot="port" slot-scope="props">
             <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
            </template>

          <!-- <div slot="new" >
            View
            <b-button variant="danger" slot="new" slot-scope="news">
            {{ news.rowData.id }}
            </b-button>
          </div> -->
        </vuetable>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>

       <b-colxx xxs="12">
            <b-modal v-if="RightmodalData" id="modalbasic" ref="modalright" :title="$t('modal.modal-title')" modal-class="modal-right">

                 <b-card v-if="RightmodalData.wallet !='' && RightmodalData.wallet !=null" class="text-center shadow mb-3 pt-3" style="border-radius:20px" header="WALLET">
              <b-list-group  class="mb-3">
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                  Balance
                    <b-badge variant="primary" pill>{{RightmodalData.wallet.balance}}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Post paid balance
                    <b-badge variant="primary" pill>{{RightmodalData.wallet.post_paid_balance}}</b-badge>
                  </b-list-group-item>
                </b-list-group>
                   </b-card>

                   <b-card v-if="RightmodalData.type !='' && RightmodalData.type !=null" class="text-center shadow mb-3 pt-3" style="border-radius:20px" header="TYPE">
              <b-list-group  class="mb-3">
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Name
                    <b-badge variant="primary" pill>{{RightmodalData.type.name}}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Slug
                    <b-badge variant="primary" pill>{{RightmodalData.type.slug}}</b-badge>
                  </b-list-group-item>
                </b-list-group>
                   </b-card>

                   <b-card v-if="RightmodalData.port !=''  && RightmodalData.port !=null" class="text-center shadow pt-3" style="border-radius:20px" header="PORT">
                <b-list-group >
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Name
                    <b-badge variant="primary" pill>{{RightmodalData.port.name}}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Status
                    <b-badge variant="primary" pill v-if="RightmodalData.port.status==1">Active</b-badge>
                    <b-badge variant="primary" pill v-else>Inactive</b-badge>

                  </b-list-group-item>
                </b-list-group>
                   </b-card>
                    <template slot="modal-footer">
                    <b-button variant="secondary" @click="hideModal('modalright')">Cancel</b-button>
                </template>
            </b-modal>
    </b-colxx>
    </b-row>
  </div>
</template>
<script>// @ts-nocheck

import Vuetable from "vuetable-2/src/components/Vuetable.vue";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { apiUrl, PROXY } from "../../../../constants/config";
import { hToken, loadash } from "../../../../constants/formKey";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";
import   Axios from 'axios'

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    // "datatable-heading": DatatableHeading
  },
  data() {
    return {
        head: {headers: hToken()},
      isLoad: false,
      paramId:'',
      sort: "",
      page: 1,
      perPage: 8,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      selectedItems: [],
      RightmodalData:"",
      RigthVery:"",
      apiBase: "",
      agentDetails:"",
      apiBase:`${PROXY}admin/agent/details`,


      // isFetched: false,
      // isLoading: true,

      fields: [,
        {
        name: "vehicle_model",
        sortField: "vehicle_model",
        title: "Vehicle model",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
        },
        {
          name:"vehicle_brand",
          sortField: "vehicle_brand",
          title: "Vehicle brand",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
       
        {
          name: "vehicle_color",
          sortField: "vehicle_color",
          title: "Vehicle color",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
         {
          name: "plate_number",
          sortField: "plate_number",
          title: "Plate number",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
          {
          name: "vehicle_year",
          sortField: "vehicle_year",
          title: "Vehicle year",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
        
        //  {
        //   name: "__slot:actions",
        //   title: "Action",
        //   titleClass: "center aligned text-right",
        //   dataClass: "center aligned text-right",
        //   width: "5%"
        // },
        // {
        //   name: "account_vehicles",
        //   title: "Vehicle",
        //   titleClass: "center aligned text-right",
        //   dataClass: "center aligned text-right",
        //   width: "5%"
        // }
      ]
    };
  },
  methods: {
      modalinfo(wallet,type,port){
    this.RightmodalData = {"wallet":wallet,"type":type,"port":port}
   console.log( this.RightmodalData)
    },
      hideModal (refname) {
          this.$refs[refname].hide()
      console.log('hide modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    },
    makeQueryParams(sortOrder, currentPage, perPage) {
      this.selectedItems = [];
      return sortOrder[0]
        ? {
            sort: sortOrder[0]
              ? sortOrder[0].field + "|" + sortOrder[0].direction
              : "",
            page: currentPage,
            per_page: this.perPage,
            search: this.search
          }
        : {
            page: currentPage,
            per_page: this.perPage,
            search: this.search
          };
    },
    onRowClass(dataItem, index) {
      if (this.selectedItems.includes(dataItem.id)) {
        return "selected";
      }
      return "";
    },

    cellClicked(item, field, event){
      alert()
      console.log(item, 'item');
      console.log(field, 'feild');
      console.log(event,'eve');
    },

    rowClicked(dataItem, event) {
      // const itemId = dataItem.id;
      console.log(dataItem)
      alert();
      return;
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
        this.selectedItems = [...new Set(this.selectedItems)];
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    rightClicked(dataItem, field, event) {
      event.preventDefault();
      if (!this.selectedItems.includes(dataItem.id)) {
        this.selectedItems = [dataItem.id];
      }
      // this.$refs.contextmenu.show({ top: event.pageY, left: event.pageX });
    },
    onPaginationData(paginationData) {
      console.log(paginationData);
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      this.lastPage = paginationData.last_page;
      this.items = paginationData.data;
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    changePageSize(perPage) {
      this.perPage = perPage;
      this.$refs.vuetable.refresh();
    },

    searchChange(val) {
      this.search = val;
      this.$refs.vuetable.refresh();
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },

    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    },
    fetchagent(id){
      Axios.get(`${this.apiBase}/${id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.agentDetails = res.data.data[0].account_vehicles;
          this.RightmodalData = {"wallet":res.data.data[0].agent_wallet,"type":res.data.data[0].agent_type,"port":res.data.data[0].port}
          console.log(this.agentDetails)
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
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    }
  },
  watch: {
  },
  mounted() {
    this.paramId = this.$router.currentRoute.params.id
       this.fetchagent(this.paramId)
      },
  created(){
    //   this.paramId = this.$router.currentRoute.params.id
    //    this.fetchagent(this.paramId)

    // this.apiBase= `${PROXY}admin/agent/details/${this.paramId}`,
   
    console.log(this.paramId);
    console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  }
};
</script>
