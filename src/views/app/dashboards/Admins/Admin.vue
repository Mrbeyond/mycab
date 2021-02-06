
<template>
  <div v-if="isLoading && !isFetched" style="h-100">

    <div class="align-middle">
      <div class="d-flex justify-content-center">
        <b-spinner variant="primary" />
      </div>
    </div>
  </div>

  <div v-else-if=" !isLoading && !isFetched">

    Error template here
  </div>
  <div v-else>
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

    <b-row>
      <b-colxx xxs="12">
        <h2 class="text-center mb-5">LIST OF ADMINS</h2>
        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :http-options="head"
          :reactive-api-url="false"
          :api-mode="false"
          :fields="fields"
          :data="admins"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"
          @vuetable:cell-clicked="cellClicked"
        >
           <template slot="Type" slot-scope="props">
             <b-button class="bg-primary"
              @click="modalinfo(props.rowData.admin_type)"
              v-b-modal.modalbasic
            >
              <i class="simple-icon-magnifier" />
            </b-button>
          </template>
          <!-- <template slot="agent" slot-scope="props">
          <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
          </template> -->
            <!-- <template slot="accve" slot-scope="props">
            <b-button class="bg-primary">View</b-button>
            </template> -->
            <!-- <template slot="nfc_terminals" slot-scope="props">
            <b-button class="bg-primary">View</b-button>
            </template> -->
             <!-- <template slot="port" slot-scope="props">
             <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
            </template> -->

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
            <b-modal v-if="RightmodalData" id="modalbasic" ref="modalright" title="Admin" modal-class="modal-right">
                <b-card v-if="RightmodalData !='' && RightmodalData !=null"
                  class="shadow-sm mb-3"
                >
                <h1>Type</h1>
                <div>
                  <p class="mb-2 text-small text-muted">Name</p>
                  <p >{{RightmodalData.name}}</p>
                </div>
                <div>
                  <p class="mb-2 text-small text-muted">Description</p>
                  <p >{{RightmodalData.description}}</p>
                </div>
                <div>
                  <p class="mb-2 text-small text-muted">Created On</p>
                  <p >{{Timest(RightmodalData.createdAt)}}</p>
                </div>
                <!-- <div v-if="RightmodalData.port !=null">
                <p class="text-muted"> Port Name</p>
                <p >{{RightmodalData.port.name}}</p>
                </div> -->

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
import { LUX_ZONE, ADMINS } from '../../../../constants/formKey';
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
      agentDetails:"",
      // apiBase:`${PROXY}admin/agent/details`,


      isFetched: false,
      isLoading: true,

      fields: [,
        {
        name: "first_name",
        sortField: "first_name",
        title: "First name",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
        },
        {
          name:"last_name",
          sortField: "last_name",
          title: "Last name",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },

        {
          name: "phone",
          sortField: "phone",
          title: "phone",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
           {
           name: "email",
           sortField: "email",
           title: "Email",
           titleClass: "",
           dataClass: "",
           width: "10%"
         },
         {
          name: "__slot:Type",
          sortField: "type",
          title: "Type",
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
    Timest(time){
      return LUX_ZONE(time);
    },
    modalinfo(data){
      this.RightmodalData = data
      console.log( this.RightmodalData)
     },
     getAdmins(){
      this.$store.dispatch(ADMINS);
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
      // alert()
      console.log(item, 'item');
      console.log(field, 'feild');
      console.log(event,'eve');
    },

    rowClicked(dataItem, event) {
      // const itemId = dataItem.id;
      console.log(dataItem)
      // alert();
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
    // fetchagent(id){
    //   Axios.get(`${this.apiBase}/${id}`, {headers: hToken()})
    //   .then(res=>{
    //     if(!res.data.error){
    //       this.agentDetails = res.data.data[0].account_vehicles;
    //       this.RightmodalData = {"wallet":res.data.data[0].agent_wallet,"type":res.data.data[0].agent_type,"port":res.data.data[0].port}
    //       console.log(this.agentDetails)
    //       this.isFetched = true;
    //       return;
    //     }else{
    //       this.isFetched = false;
    //     }
    //     this.isLoading = false;

    //   })
    //   .catch(err=>{
    //     this.isFetched = false;
    //     this.isLoading = false;

    //   })
    // },
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
    },
     admins(){
      return this.$store.getters.admins;
    },
    resKey(){
      return this.$store.getters.resKey;
    }
  },
  watch: {
    resKey(){
      if(this.resKey && this.resKey.owner && this.resKey.owner == ADMINS){
        if(!this.resKey.status){
          this.isFetched = true;
        }else{
          this.isFetched = false;
        }
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.paramId = this.$router.currentRoute.params.id
      },
  created(){
    this.getAdmins()
    // console.log(this.paramId);
    // console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  }
};
</script>
