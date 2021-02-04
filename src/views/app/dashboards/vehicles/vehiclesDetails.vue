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
    <div
      class="d-column d-md-flex justify-content-md-between"
    >
      <!-- <div class=""  v-if="RightmodalData !=''"> -->
        <!-- <div class="col-12 col-md-4 px-4 px-md-0"> -->
          <b-card v-if="RightmodalData.account !=null"
            class="text-center shadow-sm mb-3 pt-3 pl-0 pl-md-2 pr-0 pr-md-2"
            style="border-radius:20px"
          >
            <h1>Vehicle Account</h1>
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
        <!-- </div>
        <div class="col-12 col-md-4 px-4 px-md-0"> -->
          <b-card
            class="text-center shadow-sm mb-3 pt-3  "
            style="border-radius:20px"
          >
            <div class="pl-0 pl-md-4 pr-0 pr-md-4">
              <!-- if the account type is garage  -->
              <div v-if="RightmodalData.garage !=null">
                <h1>Vehicle Garage</h1>
                <div  class="d-column justify-content-between">
                  <div>
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
              </div>

              <!-- if the account type is port  -->
              <div v-if="RightmodalData.port !=null" >
                <h1>Vehicle Port</h1>
                <div  class="d-column justify-content-between">
                  <div>
                    <p class="text-muted">Name</p>
                    <p >{{RightmodalData.port.name}}</p>
                  </div>
                  <div>
                    <p class="text-muted">Time</p>
                    <p >{{Timest(RightmodalData.port.createdAt)}}</p>
                  </div>
                  <div>
                    <p class="text-muted">Status</p>
                    <p >{{mapActive(RightmodalData.port.status)}}</p>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        <!-- </div>
        <div class="col-12 col-md-4 px-4 px-md-0"> -->
          <b-card v-if="RightmodalData.type !=null"
            class="text-center shadow-sm mb-3 pt-3"
            style="border-radius:20px">
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
              <div>
                <p class="text-muted">Type</p>
                <p >
                  {{Boolean(RightmodalData.type.is_imported)?
                    'Import':'Garage'
                  }}
                </p>
              </div>
              <div>
                <p class="text-muted">Status</p>
                <p >
                  {{Boolean(RightmodalData.type.status)?
                    'Active':'Inactive'
                  }}
                </p>
              </div>
            </div>
          </b-card>
        <!-- </div>
      </div> -->
    </div>

    <!-- Table Description -->
    <div class="text-center text-muted mt-2">
      <h1>Vehicle Payment Transction(s)</h1>
    </div>
    <b-row>
      <b-colxx  v-if="localData != ''" xxs="12">
        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :api-mode="false"
          :data="localData"
          :fields="fields"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"

        >
          <template slot="actions" slot-scope="props" >
            <b-button id="detailBtn" ref="detailBtn"
              @click.stop="cellClick($event, props.rowData)"
              variant="primary"
            >
              <i class="simple-icon-login"></i>
            </b-button>
          </template>
        </vuetable>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
    </b-row>

    <div>
      <b-modal id="modalright" ref="modalright" modal-class="modal-right" title="Details" hide-footer>
          <payment-side-details v-if="selectedPayload" :selectedPayload="selectedPayload" />
      </b-modal>
    </div>
  </div>
</template>
<script>// @ts-nocheck

import Axios from 'axios';
import Vuetable from "vuetable-2/src/components/Vuetable";
import { PROXY } from '../../../../constants/config';
import { hToken, LUX_ZONE, statusA, statusS, toMoney } from '../../../../constants/formKey';
import VuetablePaginationBootstrap from '../../../../components/Common/VuetablePaginationBootstrap.vue';
import PaymentSideDetails from '../VehiclePayment/PaymentSideDetails';
export default {
  components: {
    VuetablePaginationBootstrap,
    vuetable: Vuetable,
    PaymentSideDetails,
  },
  data: ()=>({

    localData: null,
    isLoading: true,
    isFetched: false,
    selectedPayload: null,

    sort: "",
    page: 1,
    perPage: 8,
    search: "",
    from: 0,
    to: 0,
    total: 0,
    lastPage: 0,
    apiBase:`${PROXY}admin/vehicle/details`,
    RightmodalData:"",
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
        name:"status",
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
      {
        name: "__slot:actions",
        title: "Full Details",
        titleClass: "center aligned text-right",
        dataClass: "center aligned text-right",
        width: "10%"
      },

    ],

  }),
  methods: {
      mapActive(val){
      return statusA[Number(val)]
    },
     to_money(val){
      let result = toMoney(val);
      return (result == "0")? "0.00": result;
    },
     fetchvehicleDetails(id){
      // console.log(`${this.apiBase}/${id}`);
      Axios.get(`${this.apiBase}/${id}`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          // console.log(res);
        //   this.localData = [{"id":1,"agent_id":11,"garage_id":null,"account_vehicle_id":41,"amount":10000,"account_wallet_transaction_id":21,"status":null,"createdAt":"2021-01-28T15:25:38.000Z","updatedAt":"2021-01-28T15:25:38.000Z","account_vehicle":{"id":41,"account_id":141,"vehicle_type_id":11,"agent_id":11,"garage_id":null,"port_id":1,"plate_number":null,"vehicle_identification_number":"11","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-28T15:25:36.000Z","updatedAt":"2021-01-28T15:25:36.000Z"},"account_wallet_transaction":{"account_wallet_id":131,"amount":10000,"type":0,"status":1,"createdAt":"2021-01-28T15:25:37.000Z","updatedAt":"2021-01-28T15:25:37.000Z"},"garage":null},{"id":31,"agent_id":11,"garage_id":null,"account_vehicle_id":11,"amount":300,"account_wallet_transaction_id":71,"status":1,"createdAt":"2021-01-29T18:17:42.000Z","updatedAt":"2021-01-29T18:17:42.000Z","account_vehicle":{"id":11,"account_id":141,"vehicle_type_id":1,"agent_id":11,"garage_id":1,"port_id":null,"plate_number":"11","vehicle_identification_number":null,"vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-28T09:49:08.000Z","updatedAt":"2021-01-28T09:49:08.000Z"},"account_wallet_transaction":{"account_wallet_id":131,"amount":300,"type":0,"status":1,"createdAt":"2021-01-29T18:17:41.000Z","updatedAt":"2021-01-29T18:17:41.000Z"},"garage":null},{"id":41,"agent_id":11,"garage_id":null,"account_vehicle_id":61,"amount":10000,"account_wallet_transaction_id":81,"status":null,"createdAt":"2021-01-29T18:35:56.000Z","updatedAt":"2021-01-29T18:35:56.000Z","account_vehicle":{"id":61,"account_id":141,"vehicle_type_id":11,"agent_id":11,"garage_id":null,"port_id":1,"plate_number":null,"vehicle_identification_number":"111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:35:55.000Z","updatedAt":"2021-01-29T18:35:55.000Z"},"account_wallet_transaction":{"account_wallet_id":131,"amount":10000,"type":0,"status":1,"createdAt":"2021-01-29T18:35:56.000Z","updatedAt":"2021-01-29T18:35:56.000Z"},"garage":null},{"id":51,"agent_id":11,"garage_id":null,"account_vehicle_id":111,"amount":10000,"account_wallet_transaction_id":131,"status":null,"createdAt":"2021-01-29T18:52:49.000Z","updatedAt":"2021-01-29T18:52:49.000Z","account_vehicle":{"id":111,"account_id":141,"vehicle_type_id":11,"agent_id":11,"garage_id":null,"port_id":1,"plate_number":null,"vehicle_identification_number":"111111","vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-29T18:52:48.000Z","updatedAt":"2021-01-29T18:52:48.000Z"},"account_wallet_transaction":{"account_wallet_id":131,"amount":10000,"type":0,"status":1,"createdAt":"2021-01-29T18:52:48.000Z","updatedAt":"2021-01-29T18:52:48.000Z"},"garage":null},{"id":61,"agent_id":11,"garage_id":null,"account_vehicle_id":11,"amount":300,"account_wallet_transaction_id":71,"status":1,"createdAt":"2021-01-28T18:17:42.000Z","updatedAt":"2021-01-28T18:17:42.000Z","account_vehicle":{"id":11,"account_id":141,"vehicle_type_id":1,"agent_id":11,"garage_id":1,"port_id":null,"plate_number":"11","vehicle_identification_number":null,"vehicle_color":"red","vehicle_brand":"Toyota","vehicle_year":"2002","vehicle_model":"Corolla","status":1,"createdAt":"2021-01-28T09:49:08.000Z","updatedAt":"2021-01-28T09:49:08.000Z"},"account_wallet_transaction":{"account_wallet_id":131,"amount":300,"type":0,"status":1,"createdAt":"2021-01-29T18:17:41.000Z","updatedAt":"2021-01-29T18:17:41.000Z"},"garage":null}];
          this.localData = res.data.data[0].account_vehicle_payments;
           this.RightmodalData = {"account":res.data.data[0].account,"garage":res.data.data[0].garage,"type":res.data.data[0].vehicle_type_details,"port":res.data.data[0].port}
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

    Timest(time){
      return LUX_ZONE(time);
    },

     cellClick(event, payload){
         this.selectedPayload = {...payload};
        //  console.log(this.selectedPayload);
         this.$refs.modalright.show();
    //    if(event.target.id === "detailBtn"){
    //   }
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

    onPaginationData(paginationData) {
      // console.log(paginationData);
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      this.lastPage = paginationData.last_page;
      this.items = paginationData.data;
      this.$refs.pagination.setPaginationData(paginationData);
    },

    rightClicked(dataItem, field, event) {
      event.preventDefault();
      // if (!this.selectedItems.includes(dataItem.id)) {
      //   this.selectedItems = [dataItem.id];
      // }
      // this.$refs.contextmenu.show({ top: event.pageY, left: event.pageX });
    },

    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    onRowClass(dataItem, index) {
      // if (this.selectedItems.includes(dataItem.id)) {
      //   return "selected";
      // }
      return "";
    },

  },
  beforeMount() {
        this.paramId = this.$router.currentRoute.params.id
       this.fetchvehicleDetails(this.paramId)
    // this.fetchPayments();
  },

  watch: {
  }
}
</script>
