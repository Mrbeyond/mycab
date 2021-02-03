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
      <b-colxx  v-if="localData !== null" xxs="12">
          <!--:api-url="apiBase"
          @vuetable:cell-clicked="cellClicked"
          @vuetable:row-clicked="alert(5)"
          -->
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
              @click.prevent="cellClick($event, props.rowData)"
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
import { hToken, LUX_ZONE, statusS, toMoney } from '../../../../constants/formKey';
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
    fields: [,
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
       if(event.target.id === "detailBtn"){
        this.selectedPayload = {...payload};
        // console.log(this.selectedPayload);
        this.$refs.modalright.show();
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
  beforeMount() {
    this.fetchPayments();
  },

  watch: {
  }
}
</script>
