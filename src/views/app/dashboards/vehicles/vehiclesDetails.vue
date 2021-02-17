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
    <div v-if="RightmodalData" class="row">

      <div v-if="RightmodalData.account" class=" col-12 col-md-6 col-lg-3 d-flex ">
        <b-card
          class="shadow-sm mb-3 pt-3 flex-fill"
          style="border-radius:15px"
        >
          <h1>Vehicle Account</h1>
          <div class="d-column justify-content-between">
            <div v-if="RightmodalData.account !=null" >
              <p class="text-small mb-2 text-muted">First name</p>
              <p >{{RightmodalData.account.first_name}}</p>
            </div>
            <div v-if="RightmodalData.account !=null">
              <p class="text-small mb-2 text-muted">Last name</p>
              <p >{{RightmodalData.account.last_name}}</p>
            </div>
            <div v-if="RightmodalData.account !=null">
              <p class="text-small mb-2 text-muted">Phone</p>
              <p >{{RightmodalData.account.phone}}</p>
            </div>
            <div v-if="RightmodalData.account !=null">
              <p class="text-small mb-2 text-muted">Account No.</p>
              <p >{{RightmodalData.account.account_no}}</p>
            </div>
            <div v-if="RightmodalData.account !=null">
              <p class="text-small mb-2 text-muted">Email</p>
              <p >{{RightmodalData.account.email}}</p>
            </div>
            <div v-if="RightmodalData.status !=null">
              <p class="text-small mb-2 text-muted">Status</p>
              <p >{{RightmodalData.account.status?"Active":"Inactive"}}</p>
            </div>
            <div v-if="RightmodalData.createdAt !=null">
              <p class="text-small mb-2 text-muted">Created On</p>
              <p >{{Timest(RightmodalData.account.createdAt)}}</p>
            </div>
          </div>
        </b-card>
      </div>

      <div v-if="Boolean(RightmodalData.createdAt)" class=" col-12 col-md-6 col-lg-3 d-flex ">
        <b-card
          class="shadow-sm mb-3 pt-3 flex-fill"
          style="border-radius:15px"
        >
          <h1>Vehicle Info</h1>
          <div class="d-column justify-content-between">
            <div v-if="RightmodalData.is_imported !=null" >
              <p class="text-small mb-2 text-muted">Type</p>
              <p >{{RightmodalData.is_imported? "Import": "Garage"}}</p>
            </div>
            <div v-if="RightmodalData.tag_assigned !=null">
              <p class="text-small mb-2 text-muted">Tag</p>
              <p >{{RightmodalData.tag_assigned? "Tag assigned": "Tag not assigned"}}</p>
            </div>
            <div v-if="RightmodalData.vehicle_brand !=null">
              <p class="text-small mb-2 text-muted">Brand</p>
              <p >{{RightmodalData.vehicle_brand}}</p>
            </div>
            <div v-if="RightmodalData.vehicle_model !=null">
              <p class="text-small mb-2 text-muted">Model</p>
              <p >{{RightmodalData.vehicle_model}}</p>
            </div>
            <div v-if="RightmodalData.vehicle_color !=null">
              <p class="text-small mb-2 text-muted">Color</p>
              <p >{{RightmodalData.vehicle_color}}</p>
            </div>
            <div v-if="RightmodalData.vehicle_year !=null">
              <p class="text-small mb-2 text-muted">Year</p>
              <p >{{RightmodalData.vehicle_year}}</p>
            </div>
            <div>
              <p class="text-small mb-2 text-muted">Created On</p>
              <p >{{Timest(RightmodalData.createdAt)}}</p>
            </div>
          </div>
        </b-card>
      </div>

      <div class=" col-12 col-md-6 col-lg-3 d-flex "
        v-if="RightmodalData.garage || RightmodalData.port"
      >
        <b-card
          class="shadow-sm mb-3 pt-3 flex-fill "
          style="border-radius:15px"
        >
            <!-- if the account type is garage  -->
            <div v-if="RightmodalData.garage !=null">
              <h1>Vehicle Garage</h1>
              <p class="text-small mb-2 text-muted">Name</p>
              <p >{{RightmodalData.garage.name}}</p>

              <p class="text-small mb-2 text-muted">Address</p>
              <p >{{RightmodalData.garage.address?RightmodalData.garage.address:"Not added"}}</p>

              <p class="text-small mb-2 text-muted">Latitude</p>
              <p >{{RightmodalData.garage.latitude?RightmodalData.garage.latitude:"Not added"}}</p>

              <p class="text-small mb-2 text-muted">Longitude</p>
              <p >{{RightmodalData.garage.longitude?RightmodalData.garage.longitude:"Not added"}}</p>

              <p class="text-small mb-2 text-muted">Created On</p>
              <p >{{Timest(RightmodalData.garage.createdAt)}}</p>
            </div>

            <!-- if the account type is port  -->
            <div v-if="RightmodalData.port !=null" >
              <h1>Vehicle Port</h1>
                <p class="text-small mb-2 text-muted">Name</p>
                <p >{{RightmodalData.port.name}}</p>
                <p class="text-small mb-2 text-muted">Created On</p>
                <p >{{Timest(RightmodalData.port.createdAt)}}</p>
                <p class="text-small mb-2 text-muted">Status</p>
                <p >{{mapActive(RightmodalData.port.status)}}</p>
            </div>
        </b-card>
      </div>

      <div v-if="RightmodalData.vehicle_type_details" class=" col-12 col-md-6 col-lg-3 d-flex ">
        <b-card
          class="shadow-sm mb-3 pt-3 flex-fill"
          style="border-radius:15px"
        >
          <h1>Vehicle Type details</h1>
          <div  class="d-column  justify-content-between">
            <div >
              <p class="text-small mb-2 text-muted">Name</p>
              <p >{{RightmodalData.vehicle_type_details.name}}</p>
            </div>
            <div>
              <p class="text-small mb-2 text-muted">Amount</p>
              <p >&#8358;{{to_money(RightmodalData.vehicle_type_details.amount)}}</p>
            </div>
            <div>
              <p class="text-small mb-2 text-muted">Type</p>
              <p >
                {{Boolean(RightmodalData.vehicle_type_details.is_imported)?
                  'Import':'Garage'
                }}
              </p>
            </div>
            <div>
              <p class="text-small mb-2 text-muted">Status</p>
              <p >
                {{Boolean(RightmodalData.vehicle_type_details.status)?
                  'Active':'Inactive'
                }}
              </p>
            </div>
          </div>
        </b-card>
      </div>

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
          <!--<template slot="actions" slot-scope="props" >
            <b-button id="detailBtn" ref="detailBtn"
              @click.stop="cellClick($event, props.rowData)"
              variant="primary"
            >
              <i class="simple-icon-login"></i>
            </b-button>
          </template>-->
        </vuetable>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
    </b-row>

    <!--<div>
      <b-modal id="modalright" ref="modalright" modal-class="modal-right" title="Details" hide-footer>
          <payment-side-details v-if="selectedPayload" :selectedPayload="selectedPayload" />
      </b-modal>
    </div>-->
  </div>
</template>
<script>// @ts-nocheck

import Axios from 'axios';
import Vuetable from "vuetable-2/src/components/Vuetable";
import { PROXY } from '../../../../constants/config';
import { hToken, LUX_ZONE, permission, statusA, statusS, toMoney } from '../../../../constants/formKey';
import VuetablePaginationBootstrap from '../../../../components/Common/VuetablePaginationBootstrap.vue';
// import PaymentSideDetails from '../VehiclePayment/PaymentSideDetails';
export default {
  components: {
    VuetablePaginationBootstrap,
    vuetable: Vuetable,
    // PaymentSideDetails,
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
      // {
      //   name: "__slot:actions",
      //   title: "Full Details",
      //   titleClass: "center aligned text-right",
      //   dataClass: "center aligned text-right",
      //   width: "10%"
      // },

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
           this.RightmodalData =  res.data.data[0];
          //  {
          //    "account":res.data.data[0].account,
          //   "garage":res.data.data[0].garage,
          //   "type":res.data.data[0].vehicle_type_details,
          //   "port":res.data.data[0].port
          //  }
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
  created() {
    if(!permission("vehicles", this.$store.getters.currentUser)){
      localStorage.clear();
      this.$router.push('/login');
      return
    }else{
      this.paramId = this.$router.currentRoute.params.id
      this.fetchvehicleDetails(this.paramId)
    }
  },

  watch: {
  }
}
</script>
