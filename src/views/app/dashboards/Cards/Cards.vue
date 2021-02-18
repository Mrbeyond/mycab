





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
        <h2 class="text-center mb-5">LIST OF CARDS</h2>

        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :http-options="head"
          :api-mode="false"
          :data="cards"
          :reactive-api-url="false"
          :fields="fields"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"
          @vuetable:cell-clicked="cellClicked"
        >
          <!-- <template  slot="garages" slot-scope="props" >
            <div v-if="props">
            <router-link :to="`/dashboard/garages/${props.rowData.id}`" v-if="props.rowData.garages.length>=1">
            <b-btn  title="View Vehicles" badge-variant="dark" v-if="props"  v-b-modal.modalbasic
            >
              View <b-badge variant="primary" rounded-conner>{{props.rowData.garages.length}}</b-badge>
            </b-btn>
            </router-link>
            <b-btn v-else :disabled="props.rowData.garages.length==0"  title="View Vehicles" badge-variant="dark"  v-b-modal.modalbasic
            >
              View <b-badge variant="primary" rounded-conner>{{props.rowData.garages.length}}</b-badge>
            </b-btn>
            </div>
          </template> -->
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
import { hToken, loadash, LUX_ZONE, permission, statusA } from "../../../../constants/formKey";
import {LGS} from '../../../../constants/formKey';
import {ADD_CARD,CARDS } from '../../../../constants/formKey';


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
        name: "card_no",
        sortField: "card_no",
        title: "Card No.",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%",
        },
        {
          name:"createdAt",
          sortField: "createdat",
          title: "Created on",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return LUX_ZONE(val);
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
        //   {
        //   name: "contact_person_phone",
        //   sortField: "contact phone",
        //   title: "Contact number",
        //   titleClass: "",
        //   dataClass: "",
        //   width: "10%"
        // },
        // {
        //   name: "__slot:garages",
        //   sortField: "garages",
        //   title: "Garages",
        //   titleClass: "",
        //   dataClass: "",
        //   width: "10%"
        // },
      ]
    };
  },
  methods: {

     getCards(){
      this.$store.dispatch(CARDS);
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

    cards(){
    return this.$store.getters.cards;
  },

    resKey(){
      return this.$store.getters.resKey;
    }
  },
  watch: {
     resKey(){
      if(this.resKey && this.resKey.owner && this.resKey.owner == CARDS){
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
    if(!permission("cards", this.$store.getters.currentUser)){
      localStorage.clear();
      this.$router.push('/login');
      return
    }else{
    this.getCards();
    }

  },

  beforeRouteEnter(to, from, next){
    next(vm=>{
      if(!permission("cards", vm.$store.getters.currentUser)){
        localStorage.clear();
        vm.$router.push('/login');
        return
      }
    })

  }
};
</script>
