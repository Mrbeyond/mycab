





<template>
  <div>
    <div v-if="isLoading && !isFetched" class="row justify-content-center">
        <div> <b-spinner variant="primary" /></div>
    </div>
    <div v-else-if="!isLoading && !isFetched">
        Went wrong slot
    </div>
    <b-row v-else>
      <b-colxx xxs="12">
        <h2 class="text-center mb-5">LIST OF VEHICLE TYPES</h2>

        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :http-options="head"
          :api-mode="false"
          :data="vehicleTypes"
          :reactive-api-url="false"
          :fields="fields"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"
          @vuetable:cell-clicked="cellClicked"
        >
          <template slot="edit_type" slot-scope="props">
             <b-button class="bg-primary"
              >
                 Edit
              </b-button>
          </template>
        </vuetable>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
        <!-- <template v-else>
        <div class="loading"></div>
      </template> -->

       <b-colxx xxs="12">
          <b-modal v-if="RightmodalData" id="modalbasic" ref="modalright" :title="Details" modal-class="modal-right">
                 <b-card v-if="RightmodalData.account !=null" class="text-center shadow-sm mb-3 pt-3" style="border-radius:20px">
                <h1>Account</h1>
                <div >
                <p class="text-muted">First name</p>
                <p >{{RightmodalData.account.first_name}}</p>
                </div>
                <div>
                <p class="text-muted">Last name</p>
                <p >{{RightmodalData.account.last_name}}</p>
                </div>
                <div>
                <p class="text-muted">Phone</p>
                <p >{{RightmodalData.account.phone}}</p>
                </div>
                 <div>
                <p class="text-muted">Account No.</p>
                <p >{{RightmodalData.account.account_no}}</p>
                </div>
          </b-card>


          <b-card v-if="RightmodalData.garage !=null" class="text-center shadow-sm mb-3 pt-3" style="border-radius:20px">
                <h1>Garage & Port</h1>
                <div >
                <p class="text-muted">Name</p>
                <p >{{RightmodalData.garage.name}}</p>
                </div>
                <div>
                <p class="text-muted">Address</p>
                <p >{{RightmodalData.garage.address}}</p>
                </div>
                <div>
                <p class="text-muted">Latitude</p>
                <p >{{RightmodalData.garage.latitude}}</p>
                </div>
                 <div>
                <p class="text-muted">Longitude</p>
                <p >{{RightmodalData.garage.longitude}}</p>
                </div>
                 <div>
                <p class="text-muted">Port</p>
                <p >{{RightmodalData.port.name}}</p>
                </div>
         </b-card>


         <b-card v-if="RightmodalData.type !=null" class="text-center shadow-sm mb-3 pt-3" style="border-radius:20px">
                <h1>Type details</h1>
                <div >
                <p class="text-muted">Name</p>
                <p >{{RightmodalData.type.name}}</p>
                </div>
                <div>
                <p class="text-muted">Amount</p>
                <p >{{RightmodalData.type.amount}}</p>
                </div>
         </b-card>
                    <template slot="modal-footer">
                    <b-button variant="secondary" @click="hideModal('modalright')">Cancel</b-button>
                </template>
            </b-modal>
    </b-colxx>
    </b-row>
    <!--<v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="onContextMenuAction('copy')">
        <i class="simple-icon-docs" />
        <span>Copy</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('move-to-archive')">
        <i class="simple-icon-drawer" />
        <span>Move to archive</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('delete')">
        <i class="simple-icon-trash" />
        <span>Delete</span>
      </v-contextmenu-item>
    </v-contextmenu>-->
  </div>
</template>
<script>// @ts-nocheck

import Vuetable from "vuetable-2/src/components/Vuetable.vue";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { apiUrl, PROXY } from "../../../../constants/config";
import { hToken, loadash, LUX_ZONE, permission, statusA,toMoney } from "../../../../constants/formKey";
import {LGS} from '../../../../constants/formKey';
import {ADD_CARD,VEHICLE_TYPES } from '../../../../constants/formKey';


export default {
  LGS,
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    // "datatable-heading": DatatableHeading
  },
  data() {
    return {
      ADD_CARD,
      head: {headers: hToken()},
      isLoading: true,
      isFetched: false,
      apiBase: `${PROXY}location/garages/`,
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

      // isFetched: false,
      // isLoadinging: true,

      fields: [
        {
        name: "name",
        sortField: "name",
        title: "Name",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%",
        },
        {
          name:"amount",
          sortField: "amount",
          title: "Amount",
          titleClass: "",
          dataClass: "",
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
            callback(val){
            return val? LUX_ZONE(val):"Not added";
            },
        },
          {
            name: "account_vehicles",
            sortField: "account",
            title: "No of vehicles",
            titleClass: "",
            dataClass: "",
            width: "10%",
            callback(val){
            return (Array.isArray(val))? val.length: 0;
          },
        },
        {
          name: "status",
          sortField: "status",
          title: "Status",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return statusA[Number(Boolean(!!Boolean(val)))];
          },
        },
        {
          name: "__slot:edit_type",
          sortField: "edit_type",
          title: "Update",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
      ]
    };
  },
  methods: {

     GetEHICLEtYPES(){
      this.$store.dispatch(VEHICLE_TYPES);
    },
    modalinfo(garages){
    this.RightmodalData = garages
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
      // // alert()
      // console.log(item, 'item');
      // console.log(field, 'feild');
      // console.log(event,'eve');
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
    }
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

    vehicleTypes(){
    return this.$store.getters.vehicleTypes;
  },

    resKey(){
      return this.$store.getters.resKey;
    }
  },
  watch: {
     resKey(){
      if(this.resKey && this.resKey.owner && this.resKey.owner == VEHICLE_TYPES){
        if(this.resKey.status){
          this.isFetched = false;
          this.isLoading = true;
        }else{
          this.isFetched = true;
        }

      }

    }
  },
  created(){
    this.GetEHICLEtYPES();
    // console.log(this.head);
    // console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  },

  beforeRouteEnter(to, from, next){
    next(vm=>{
      if(!permission("vehicles", vm.$store.getters.currentUser)){
        localStorage.clear();
        vm.$router.push('/login');
        return
      }
    })

  }
};
</script>
