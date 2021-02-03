
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
  <b-row class="align-items-center mb-5 justify-content-center m-1 row justify-content-between" v-if="RightmodalData !=''">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
        <b-card v-if="RightmodalData.account !=null" class="text-center shadow-sm mb-3 pt-3 col-lg-12" style="border-radius:20px">
          <h1>Account</h1>
          <div class="d-column justify-content-between">
            <div v-if="RightmodalData.account !=null" >
              <p class="text-muted">First name</p>
              <p >{{RightmodalData.account.first_name}}</p>
            </div>
            <div v-if="RightmodalData.account !=null">
              <p class="text-muted">Last name</p>
              <p >{{RightmodalData.account.last_name}}</p>
            </div>
            <div v-if="RightmodalData.account !=null">
              <p class="text-muted">Phone</p>
              <p >{{RightmodalData.account.phone}}</p>
            </div>
            <div v-if="RightmodalData.account !=null">
              <p class="text-muted">Account No.</p>
              <p >{{RightmodalData.account.account_no}}</p>
            </div>
          </div>
      </b-card>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <b-card v-if="RightmodalData" class="text-center shadow-sm mb-3 pt-3 col-lg-12" style="border-radius:20px">
        <h1>Garage & Port</h1>
        <div  class="d-column justify-content-between">
          <div v-if="RightmodalData.garage !=null">
            <p class="text-muted">Name</p>
            <p >{{RightmodalData.garage.name}}</p>
          </div>
          <div v-if="RightmodalData.garage !=null">
            <p class="text-muted">Address</p>
            <p >{{RightmodalData.garage.address}}</p>
          </div>
          <div v-if="RightmodalData.garage !=null">
            <p class="text-muted">Latitude</p>
            <p >{{RightmodalData.garage.latitude}}</p>
          </div>
          <div v-if="RightmodalData.garage !=null">
            <p class="text-muted">Longitude</p>
            <p >{{RightmodalData.garage.longitude}}</p>
          </div>
          <div v-if="RightmodalData.port !=null">
            <p class="text-muted">Port</p>
            <p >{{RightmodalData.port.name}}</p>
          </div>
        </div>
      </b-card>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <b-card v-if="RightmodalData.type !=null" class="text-center shadow-sm mb-3 pt-3 col-lg-12" style="border-radius:20px">
        <h1>Vehicle Type details</h1>
        <div  class="d-column  justify-content-between">
          <div >
            <p class="text-muted">Name</p>
            <p >{{RightmodalData.type.name}}</p>
          </div>
          <div>
            <p class="text-muted">Amount</p>
            <p >&#8358;{{to_money(RightmodalData.type.amount)}}</p>
          </div>
        </div>
      </b-card>
    </div>
  </div>
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
          :data="account"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"
          @vuetable:cell-clicked="cellClicked"
        >
        </vuetable>
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
import { hToken, loadash, toMoney } from "../../../../constants/formKey";
// import DatatableHeading from "../../../../containers/datatable/DatatableHeading";
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
      apiBase:`${PROXY}admin/vehicle/details`,
      account:[{"id":41,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"11","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-28T15:25:36.000Z","updatedAt":"2021-01-28T15:25:36.000Z","account":{"id":"4d545178","first_name":"Samuel","last_name":"Adesina","account_no":"MECP1611770316343","phone":"08130027102","email":"adesinasamueloluwaseun@gmail.com","address":null,"payer_id":"222","state_id":1,"verified":0,"status":1,"createdAt":"2021-01-27T17:58:39.000Z","updatedAt":"2021-01-28T04:05:26.000Z"},"account_vehicle_payments":[{"id":1,"agent_id":11,"garage_id":null,"account_vehicle_id":41,"amount":10000,"account_wallet_transaction_id":21,"status":null,"createdAt":"2021-01-28T15:25:38.000Z","updatedAt":"2021-01-28T15:25:38.000Z"}],"port":{"id":1,"state_id":1,"name":"Apapa","status":1,"createdAt":"2021-01-31T17:03:42.000Z","updatedAt":null},"garage":null,"is_imported":true,"tag_assigned":false,"vehicle_type_details":{"id":11,"state_id":1,"is_imported":1,"name":"5 - 10 years - NGN20,000 one time fee","amount":20000,"status":1,"createdAt":null,"updatedAt":null}},{"id":61,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:35:55.000Z","updatedAt":"2021-01-29T18:35:55.000Z","account":{"id":"4d545178","first_name":"Samuel","last_name":"Adesina","account_no":"MECP1611770316343","phone":"08130027102","email":"adesinasamueloluwaseun@gmail.com","address":null,"payer_id":"222","state_id":1,"verified":0,"status":1,"createdAt":"2021-01-27T17:58:39.000Z","updatedAt":"2021-01-28T04:05:26.000Z"},"account_vehicle_payments":[{"id":41,"agent_id":11,"garage_id":null,"account_vehicle_id":61,"amount":10000,"account_wallet_transaction_id":81,"status":null,"createdAt":"2021-01-29T18:35:56.000Z","updatedAt":"2021-01-29T18:35:56.000Z"}],"port":{"id":1,"state_id":1,"name":"Apapa","status":1,"createdAt":"2021-01-31T17:03:42.000Z","updatedAt":null},"garage":null,"is_imported":true,"tag_assigned":false,"vehicle_type_details":{"id":11,"state_id":1,"is_imported":1,"name":"5 - 10 years - NGN20,000 one time fee","amount":20000,"status":1,"createdAt":null,"updatedAt":null}},{"id":71,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"1111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:37:19.000Z","updatedAt":"2021-01-29T18:37:19.000Z","account":{"id":"4d545178","first_name":"Samuel","last_name":"Adesina","account_no":"MECP1611770316343","phone":"08130027102","email":"adesinasamueloluwaseun@gmail.com","address":null,"payer_id":"222","state_id":1,"verified":0,"status":1,"createdAt":"2021-01-27T17:58:39.000Z","updatedAt":"2021-01-28T04:05:26.000Z"},"account_vehicle_payments":[],"port":{"id":1,"state_id":1,"name":"Apapa","status":1,"createdAt":"2021-01-31T17:03:42.000Z","updatedAt":null},"garage":null,"is_imported":true,"tag_assigned":false,"vehicle_type_details":{"id":11,"state_id":1,"is_imported":1,"name":"5 - 10 years - NGN20,000 one time fee","amount":20000,"status":1,"createdAt":null,"updatedAt":null}},{"id":81,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"11111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:39:53.000Z","updatedAt":"2021-01-29T18:39:53.000Z","account":{"id":"4d545178","first_name":"Samuel","last_name":"Adesina","account_no":"MECP1611770316343","phone":"08130027102","email":"adesinasamueloluwaseun@gmail.com","address":null,"payer_id":"222","state_id":1,"verified":0,"status":1,"createdAt":"2021-01-27T17:58:39.000Z","updatedAt":"2021-01-28T04:05:26.000Z"},"account_vehicle_payments":[],"port":{"id":1,"state_id":1,"name":"Apapa","status":1,"createdAt":"2021-01-31T17:03:42.000Z","updatedAt":null},"garage":null,"is_imported":true,"tag_assigned":false,"vehicle_type_details":{"id":11,"state_id":1,"is_imported":1,"name":"5 - 10 years - NGN20,000 one time fee","amount":20000,"status":1,"createdAt":null,"updatedAt":null}},{"id":111,"vehicle_type_id":11,"plate_number":null,"vehicle_identification_number":"111111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:52:48.000Z","updatedAt":"2021-01-29T18:52:48.000Z","account":{"id":"4d545178","first_name":"Samuel","last_name":"Adesina","account_no":"MECP1611770316343","phone":"08130027102","email":"adesinasamueloluwaseun@gmail.com","address":null,"payer_id":"222","state_id":1,"verified":0,"status":1,"createdAt":"2021-01-27T17:58:39.000Z","updatedAt":"2021-01-28T04:05:26.000Z"},"account_vehicle_payments":[{"id":51,"agent_id":11,"garage_id":null,"account_vehicle_id":111,"amount":10000,"account_wallet_transaction_id":131,"status":null,"createdAt":"2021-01-29T18:52:49.000Z","updatedAt":"2021-01-29T18:52:49.000Z"}],"port":{"id":1,"state_id":1,"name":"Apapa","status":1,"createdAt":"2021-01-31T17:03:42.000Z","updatedAt":null},"garage":null,"is_imported":true,"tag_assigned":false,"vehicle_type_details":{"id":11,"state_id":1,"is_imported":1,"name":"5 - 10 years - NGN20,000 one time fee","amount":20000,"status":1,"createdAt":null,"updatedAt":null}},{"id":11,"vehicle_type_id":1,"plate_number":"11","vehicle_identification_number":null,"vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-28T09:49:08.000Z","updatedAt":"2021-01-28T09:49:08.000Z","account":{"id":"4d545178","first_name":"Samuel","last_name":"Adesina","account_no":"MECP1611770316343","phone":"08130027102","email":"adesinasamueloluwaseun@gmail.com","address":null,"payer_id":"222","state_id":1,"verified":0,"status":1,"createdAt":"2021-01-27T17:58:39.000Z","updatedAt":"2021-01-28T04:05:26.000Z"},"account_vehicle_payments":[{"id":31,"agent_id":11,"garage_id":null,"account_vehicle_id":11,"amount":300,"account_wallet_transaction_id":71,"status":1,"createdAt":"2021-01-29T18:17:42.000Z","updatedAt":"2021-01-29T18:17:42.000Z"},{"id":61,"agent_id":11,"garage_id":null,"account_vehicle_id":11,"amount":300,"account_wallet_transaction_id":71,"status":1,"createdAt":"2021-01-28T18:17:42.000Z","updatedAt":"2021-01-28T18:17:42.000Z"}],"port":null,"garage":null,"is_imported":false,"tag_assigned":true,"vehicle_type_details":{"id":1,"state_id":1,"is_imported":1,"name":"0 - 5 years - NGN30,000 one time fee","amount":30000,"status":1,"createdAt":null,"updatedAt":null}}],

      isFetched: false,
      isLoading: true,

       fields: [
      {
      name: "vehicle_type_id",
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
        name:"plate_number",
        sortField: "status",
        title: "Status",
        titleClass: "",
        dataClass: "",
        width: "10%",
        callback(val){
          return statusS[Number(val)]
        }
      },
      {
        name: "vehicle_identification_numbe",
        sortField: "createdAt",
        title: "Created On",
        titleClass: "",
        dataClass: "",
        width: "10%",
        callback(value){
          return LUX_ZONE(value);
        },
      },
      {
        name: "__slot:actions",
        title: "Full Details",
        titleClass: "center aligned text-right",
        dataClass: "center aligned text-right",
        width: "10%"
      },

    ],
    };
  },
  methods: {
    to_money(val){
      let result = toMoney(val);
      return (result == "0")? "0.00": result;
    },

    modalinfo(wallet,type,port){
      this.RightmodalData = {"wallet":wallet,"type":type,"port":port}
  //  console.log( this.RightmodalData)
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
    fetchvehicleDetails(id){
      console.log(`${this.apiBase}/${id}`);
      Axios.get(`${this.apiBase}/${id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          console.log(res);
          this.agentDetails = res.data.data[0].account_vehicle_payments;
           this.RightmodalData = {"account":res.data.data[0].account,"garage":res.data.data[0].garage,"type":res.data.data[0].vehicle_type_details,"port":res.data.data[0].port}
          // this.RightmodalData = {"wallet":res.data.data[0].agent_wallet,"type":res.data.data[0].agent_type,"port":res.data.data[0].port}
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
       this.fetchvehicleDetails(this.paramId)
      // console.log(this.apiBase);
      },
  created(){
    //   this.paramId = this.$router.currentRoute.params.id
    //    this.fetchagent(this.paramId)

    // this.apiBase= `${PROXY}admin/agent/details/${this.paramId}`,

  //   console.log(this.paramId);
  //   console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  }
};
</script>
