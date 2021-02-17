
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
    <div v-if="RightmodalData" class="mb-5 row">

      <div v-if="RightmodalData.wallet"
        :class="`col-12 ${(RightmodalData.port || RightmodalData.garage)? 'col-md-4':'col-md-6'} d-md-flex `"
      >
        <b-card class=" mb-2 flex-fill" style="border-radius:15px">
           <!-- Agent wallet  part -->
          <div>
            <h1>Wallet info</h1>
            <div v-if="RightmodalData.wallet">
              <p class="text-muted text-small mb-2">Balance</p>
              <p class="mb-3" >&#8358;{{to_money(RightmodalData.wallet.balance)}}</p>
              <p class="text-muted text-small mb-2">Postpaid Balance</p>
              <p class="mb-3" >&#8358;{{to_money(RightmodalData.wallet.postpaid_balance)}}</p>
              <p class="text-muted text-small mb-2">Created on</p>
              <p class="mb-3" >{{Timest(RightmodalData.wallet.createdAt)}}</p>
            </div>
          </div>
        </b-card>
      </div>

      <div  v-if="RightmodalData.basic"
        :class="`col-12 ${(RightmodalData.port || RightmodalData.garage)? 'col-md-4':'col-md-6'} d-md-flex`"
      >
        <b-card class=" mb-2 flex-fill" style="border-radius:15px">
           <!-- Basic agent's info part -->
          <div>
            <h1>Basic info</h1>
            <div v-if="RightmodalData.basic">
              <p class="text-muted text-small mb-2">First Name</p>
              <p class="mb-3" >{{ RightmodalData.basic.first_name }}</p>
              <p class="text-muted text-small mb-2">Last Name</p>
              <p class="mb-3"> {{ RightmodalData.basic.last_name }}</p>
              <p class="text-muted text-small mb-2">Agent NO.</p>
              <p class="mb-3" >{{ RightmodalData.basic.agent_no }}</p>
              <p class="text-muted text-small mb-2">Email</p>
              <p class="mb-3" >{{RightmodalData.basic.email}}</p>
              <p class="text-muted text-small mb-2">Address</p>
              <p class="mb-3" >{{ RightmodalData.basic.address? RightmodalData.basic.address: "Not provided" }}</p>
              <p class="text-muted text-small mb-2">Phone</p>
              <p class="mb-3"> {{ RightmodalData.basic.phone }}</p>
              <p class="text-muted text-small mb-2">Created on</p>
              <p class="mb-3" >{{Timest(RightmodalData.basic.createdAt)}}</p>
            </div>
          </div>
        </b-card>
      </div>

      <div v-if="RightmodalData.garage || RightmodalData.port"
        :class="`col-12 ${(RightmodalData.port || RightmodalData.garage)? 'col-md-4':'col-md-6'} d-md-flex`"
      >
        <b-card class=" mb-2 flex-fill" style="border-radius:15px">          <!-- Port or Garage part -->
          <div >
            <h1>{{ RightmodalData.garage? "Garage":"Port" }}</h1>
            <!-- If agent type is garage  -->
            <div v-if="RightmodalData.garage">
              <p class="text-muted text-small mb-2">Name</p>
              <p class="mb-3" >{{ RightmodalData.garage.name }}</p>
              <p class="text-muted text-small mb-2">Address</p>
              <p class="mb-3"> {{ RightmodalData.garage.address?RightmodalData.garage.address : "Not provided" }}</p>
              <p class="text-muted text-small mb-2">Status</p>
              <p class="mb-3" >{{ Boolean(RightmodalData.garage.status)?"Active":"Inactive" }}</p>
              <p class="text-muted text-small mb-2">Icon</p>
              <p class="mb-3" >{{Boolean(RightmodalData.garage.icon)? RightmodalData.garage.icon: 'Not available'}}</p>
              <p class="text-muted text-small mb-2">Created on</p>
              <p class="mb-3" >{{Timest(RightmodalData.basic.createdAt)}}</p>
            </div>
            <!-- If agent type is part -->
            <div v-else>
              <p class="text-muted text-small mb-2">Name</p>
              <p class="mb-3" >{{ RightmodalData.port.name }}</p>
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <b-row>
      <b-colxx xxs="12">
          <h2 class="text-center">Registered vehicles</h2>
         <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :http-options="head"
          :api-mode="false"
          :data="localData"
          :reactive-api-url="false"
          :fields="fields"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"
        >
        </vuetable>
          <!--@vuetable:cell-clicked="cellClicked"-->
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
    </b-row>
  </div>
</template>
<script>// @ts-nocheck

import Vuetable from "vuetable-2/src/components/Vuetable.vue";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import { apiUrl, PROXY } from "../../../../constants/config";
import { hToken, loadash, LUX_ZONE, permission, toMoney } from "../../../../constants/formKey";
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
      RigthVery:"",
      apiBase: "",
      localData: null,
      apiBase:`${PROXY}admin/agent/details`,


      isFetched: false,
      isLoading: true,

      fields: [
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
          name: "is_imported",
          sortField: "is_imported",
          title: "Type",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return Boolean(val)? "Import":"Garage"
          },
        },
        {
          name: "plate_number",
          sortField: "plate_number",
          title: "Plate number",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return (val)? val:"Not added"
          }
        },
        {
          name: "vehicle_identification_number",
          sortField: "vehicle_identification_number",
          title: "VIN",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return (val)? val:"Not added"
          }
        },
        {
          name: "status",
          sortField: "status",
          title: "Status",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return Boolean(val)? "Active":"Inactive"
          },
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
        name: "vehicle_year",
        sortField: "vehicle_year",
        title: "Vehicle year",
        titleClass: "",
        dataClass: "",
        width: "10%"
        },
        {
          name: "createdAt",
          sortField: "createdAt",
          title: "Created On",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return LUX_ZONE(val);
          },
        },
      ]
    };
  },
  methods: {
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
      // console.log(item, 'item');
      // console.log(field, 'feild');
      // console.log(event,'eve');
    },

    rowClicked(dataItem, event) {
      // const itemId = dataItem.id;
      // console.log(dataItem)
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
      // console.log(paginationData);
      // this.from = paginationData.from;
      // this.to = paginationData.to;
      // this.total = paginationData.total;
      // this.lastPage = paginationData.last_page;
      // this.items = paginationData.data;
      // this.$refs.pagination.setPaginationData(paginationData);
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
          let PAYLOAD = res.data.data[0]
          this.localData = PAYLOAD.account_vehicles;
          let port = null;
          let garage = null;
          console.log(this.localData);
          let basic = {
            first_name: PAYLOAD.first_name,
            last_name: PAYLOAD.last_name,
            phone: PAYLOAD.phone,
            email: PAYLOAD.email,
            agent_no: PAYLOAD.agent_no,
            address: PAYLOAD.address,
            createdAt: PAYLOAD.createdAt,
          };

          let wallet = {
            balance: PAYLOAD.agent_wallet.balance,
            postpaid_balance: PAYLOAD.agent_wallet.post_paid_balance,
            createdAt: PAYLOAD.agent_wallet.createdAt,
          }

          if(Boolean(PAYLOAD.port)){
            port = {
              name: PAYLOAD.port.name,
              createdAt: PAYLOAD.port.createdAt,        }
          }else if(Boolean(PAYLOAD.garage)){
            garage ={
              name: PAYLOAD.garage.name,
              address: PAYLOAD.garage.address,
              status: PAYLOAD.garage.status,
              icon: PAYLOAD.garage.icon,
              createdAt: PAYLOAD.garage.createdAt,
            }
          }

          this.RightmodalData = {basic:basic, wallet:wallet, port:port, garage:garage,}
          console.log( this.RightmodalData)

          this.isFetched = true;
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

    Timest(time){
      return LUX_ZONE(time);
    },


    to_money(val){
      let result = toMoney(val);
      return (result == "0")? "0.00": result;
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
  },
  watch: {
  },
  mounted() {
    this.paramId = this.$router.currentRoute.params.id
       this.fetchagent(this.paramId)
      },
  created(){
    if(!permission("agents", this.$store.getters.currentUser)){
      localStorage.clear();
      this.$router.push('/login');
      return
    }
    //   this.paramId = this.$router.currentRoute.params.id
    //    this.fetchagent(this.paramId)
    // alert()

    // this.apiBase= `${PROXY}admin/agent/details/${this.paramId}`,

    // console.log(this.paramId);
    // console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  }
};
</script>
