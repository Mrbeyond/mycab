<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="$t('menu.terminals')"
        :selectAll="selectAll"
        :isSelectedAll="isSelectedAll"
        :isAnyItemSelected="isAnyItemSelected"
        :keymap="keymap"
        :displayMode="displayMode"
        :changeDisplayMode="changeDisplayMode"
        :changeOrderBy="changeOrderBy"
        :changePageSize="changePageSize"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="total"
        :perPage="perPage"
        :sortOptions="sortOptions"
        :formKey="ADD_TERMINAL"
      ></list-page-heading>
      <!-- <template v-if="isLoad">
        <terminal-page-listing
          :displayMode="displayMode"
          :items="terminals"
          :selectedItems="selectedItems"
          :toggleItem="toggleItem"
          :lastPage="lastPage"
          :perPage="perPage"
          :page="page"
          :changePage="changePage"
          :handleContextMenu="handleContextMenu"
          :onContextMenuAction="onContextMenuAction"
        ></terminal-page-listing>
      </template> -->
        <b-row>
      <b-colxx xxs="12">
        <vuetable v-if="isLoad"
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :http-options="head"
          :data="terminal"
          :reactive-api-url="false"
          :fields="fields"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:cell-rightclicked="rightClicked"
          @vuetable:cell-clicked="cellClicked"
        >
           <template slot="Details" slot-scope="props">
             <b-button class="bg-primary" @click="modalinfo(props.rowData.account,props.rowData.garage,props.rowData.port,props.rowData.vehicle_type_details)"  v-b-modal.modalbasic>Preview</b-button>
          </template>
            <template slot="details" slot-scope="props">
              <router-link :to="`/dashboard/vehicles/${props.rowData.id}`">
            <b-button class="bg-primary">Full details</b-button>
              </router-link>
            </template>
        </vuetable>
        <template v-else>
        <div class="loading"></div>
      </template>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>

       <!-- <b-colxx xxs="12">
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
    </b-colxx> -->
    </b-row>
      
    </b-colxx>
  </b-row>
</template>

<script>
import axios from "axios";
import { apiUrl } from "../../../../constants/config";
import ListPageHeading from "./../ListsHeader/ListPageHeading";
import TerminalListing from "./TerminalListing.vue";
import { ADD_TERMINAL, TERMINALS } from '../../../../constants/formKey';
import Vuetable from "vuetable-2/src/components/Vuetable.vue";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap.vue";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";
import { hToken, loadash } from "../../../../constants/formKey";

export default {

  components: {
    vuetable: Vuetable,
     "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "list-page-heading": ListPageHeading,
    "terminal-page-listing": TerminalListing
  },

  data() {
    return {
        ADD_TERMINAL,
       sortOptions: [
        {
          column: "terminal_no",
          label: "Terminal Number"
        },
         {
          column: "state_id",
          label: "State"
        },
      ],


      isLoad: false,
      apiBase: apiUrl + "/cakes/fordatatable",
      displayMode: "list",
     sort: {
        column: "tag_no",
        label: "Tag Number"
      },
      page: 1,
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      selectedItems: [],

      fields: [
        {
        name: "terminal_no",
        sortField: "model",
        title: "Terminal No.",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
        },
        {
          name:"updatedAt",
          sortField: "update",
          title: "Updated",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
       
        {
          name: "vehicle_model",
          sortField: "color",
          title: "Color",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
          {
          name: "plate_number",
          sortField: "plate number",
          title: "Plate number",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
           {
          name: "vehicle_identification_number",
          sortField: "id",
          title: "ID",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
         {
          name: "vehicle_year",
          sortField: "year",
          title: "Year",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
         {
          name: "__slot:Details",
          sortField: "Details",
          title: "Details",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
          {
          name: "__slot:details",
          sortField: "details",
          title: "Full details",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
      ]
    };
  },
  methods: {
    getTerminals(){
      this.$store.dispatch(TERMINALS);
    },
    loadItems() {
      this.isLoad = false;
      let resp = this.sort.column
      this.items =  this.agents
      .sort(function(a, b){
        var x = a[resp]; var y = b[resp]
        return ((x > y) ? 1 : ((x < y) ? -1 : 0))
                });
        this.isLoad = true;

    },
 onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
    },
    changeOrderBy(sort) {
      this.sort = sort;
      this.loadItems()
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
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
    toggleItem(event, itemId) {
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
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    },
    changePage(pageNum) {
      this.page = pageNum;
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
    apiUrl() {
      return `${this.apiBase}?sort=${this.sort.column}&page=${this.page}&per_page=${this.perPage}&search=${this.search}`;
    },
    terminals(){
      return this.$store.getters.terminals;
    },
    resKey(){
      return this.$store.getters.resKey;
    }



  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      // this.loadItems();
    },
    resKey(){
      if(this.resKey && this.resKey.owner && this.resKey.owner == TERMINALS){
        this.isLoad = true;
      }
    }

  },
  mounted() {
    // this.loadItems();
  },
  created() {
    // this.loadItems();
    this.getTerminals();

  }
};
</script>
