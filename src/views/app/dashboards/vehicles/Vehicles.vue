
<template>
  <div>
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
        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :http-options="head"
          :api-url="apiBase"
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
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>

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
import { hToken, loadash } from "../../../../constants/formKey";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";

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
      apiBase: `${PROXY}admin/vehicle/details`,//apiUrl + "/cakes/fordatatable",
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
      // isLoading: true,

      fields: [
        {
        name: "vehicle_model",
        sortField: "model",
        title: "Model",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
        },
        {
          name:"vehicle_brand",
          sortField: "brand",
          title: "Brand",
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
    modalinfo(account,garage,port,type){
    this.RightmodalData = {"account":account,"garage":garage,"type":type,"port":port}
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
    }
  },
  watch: {
  },
  created(){
    console.log(this.head);
    console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  }
};
</script>
