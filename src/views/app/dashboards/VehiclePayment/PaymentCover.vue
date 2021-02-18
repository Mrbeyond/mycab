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
    <b-row>
      <b-colxx  v-if="localData !== null" xxs="12">
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
            <template>
            <!-- v-b-modal="'paymentModal'" -->
              <b-button id="detailBtn" ref="detailBtn"

                @click="cellClick($event, props.rowData)"
                variant="primary"
              >
                <i class="simple-icon-magnifier"></i>
              </b-button>
            </template>
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
      <b-modal id="paymentModal" ref="paymentModal" modal-class="modal-right" title="Details" hide-footer>
          <payment-side-details v-if="selectedPayload" :selectedPayload="selectedPayload" />
      </b-modal>
    </div>
  </div>
</template>
<script>// @ts-nocheck

import Axios from 'axios';
import Vuetable from "vuetable-2/src/components/Vuetable";
import { PROXY } from '../../../../constants/config';
import { hToken, LUX_ZONE, permission, statusS, toMoney } from '../../../../constants/formKey';
import VuetablePaginationBootstrap from '../../../../components/Common/VuetablePaginationBootstrap.vue';
import PaymentSideDetails from './PaymentSideDetails.vue';
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
     fetchPayments(){
      Axios.get(`${PROXY}admin/vehicles/payments`, {headers: hToken()})
      .then(res=>{
        if(!res.data.error){
          this.localData = res.data.data;
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
         this.$refs.paymentModal.show();
      //  if(event.target.id === "detailBtn"){
      //   // console.log(this.selectedPayload);
      //   // this.$bvModal.show('paymentModal')
      // }
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
      console.log(paginationData);
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
    if(!permission("finance", this.$store.getters.currentUser)){
      localStorage.clear();
      this.$router.push('/login');
      return
    }else{
      this.fetchPayments();
    }
  },

  beforeRouteEnter(to, from, next){
    next(vm=>{
      if(!permission("finance", vm.$store.getters.currentUser)){
        localStorage.clear();
        vm.$router.push('/login');
        return
      }
    })

  }

}
</script>
