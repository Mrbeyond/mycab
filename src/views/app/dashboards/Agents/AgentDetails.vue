
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
          <!--:api-url="apiBase"
          
          @vuetable:row-clicked="rowClicked"
          -->
          {{apiBase}}
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
          <!-- <div slot="ctions" >
            hjjhjhjhjhj
            <b-button variant="success"
            {{ props.rowData.id }}
            >
            </b-button>
          </div> -->
           <template slot="wallet" slot-scope="props">
             <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
          </template>
          <template slot="agent" slot-scope="props">
          <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
          </template>
            <template slot="accve" slot-scope="props">
            <b-button class="bg-primary">View</b-button>
            </template>
            <template slot="nfc_terminals" slot-scope="props">
            <b-button class="bg-primary">View</b-button>
            </template>
             <template slot="port" slot-scope="props">
             <b-button class="bg-primary" @click="modalinfo(props.rowData.agent_wallet,props.rowData.agent_type,props.rowData.port)"  v-b-modal.modalbasic>View</b-button>
            </template>

          <!-- <div slot="new" >
            View
            <b-button variant="danger" slot="new" slot-scope="news">
            {{ news.rowData.id }}
            </b-button>
          </div> -->
        </vuetable>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>

       <b-colxx xxs="12">
            <b-modal v-if="RightmodalData" id="modalbasic" ref="modalright" :title="$t('modal.modal-title')" modal-class="modal-right">

                 <b-card v-if="RightmodalData.wallet !='' && RightmodalData.wallet !=null" class="text-center shadow mb-3 pt-3" style="border-radius:20px" header="WALLET">
              <b-list-group  class="mb-3">
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                  Balance
                    <b-badge variant="primary" pill>{{RightmodalData.wallet.balance}}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Post paid balance
                    <b-badge variant="primary" pill>{{RightmodalData.wallet.post_paid_balance}}</b-badge>
                  </b-list-group-item>
                </b-list-group>
                   </b-card>

                   <b-card v-if="RightmodalData.type !='' && RightmodalData.type !=null" class="text-center shadow mb-3 pt-3" style="border-radius:20px" header="TYPE">
              <b-list-group  class="mb-3">
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Name
                    <b-badge variant="primary" pill>{{RightmodalData.type.name}}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Slug
                    <b-badge variant="primary" pill>{{RightmodalData.type.slug}}</b-badge>
                  </b-list-group-item>
                </b-list-group>
                   </b-card>

                   <b-card v-if="RightmodalData.port !=''  && RightmodalData.port !=null" class="text-center shadow pt-3" style="border-radius:20px" header="PORT">
                <b-list-group >
                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Name
                    <b-badge variant="primary" pill>{{RightmodalData.port.name}}</b-badge>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Status
                    <b-badge variant="primary" pill v-if="RightmodalData.port.status==1">Active</b-badge>
                    <b-badge variant="primary" pill v-else>Inactive</b-badge>

                  </b-list-group-item>
                </b-list-group>
                   </b-card>
                    <template slot="modal-footer">
                    <b-button variant="secondary" @click="hideModal('modalright')">Cancel</b-button>
                </template>
            </b-modal>
    </b-colxx>
    </b-row>

<b-button v-b-modal.modallg  variant="outline-primary" class="mb-2">{{ $t('modal.launch-small-modal') }}</b-button>
            <b-modal id="modallg" size="lg" title="Large Modal" hide-footer>
                Hello Modal!
            </b-modal>
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
import Axios from 'axios'

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

      // isFetched: false,
      // isLoading: true,

      fields: [,
        {
        name: "first_name",
        sortField: "plate_number",
        title: "First Name",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
        },
        {
          name:"last_name",
          sortField: "vehicle_brand",
          title: "Last Name",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
       
        {
          name: "phone",
          sortField: "vehicle_color",
          title: "Phone",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
         {
          name: "__slot:wallet",
          sortField: "vehicle_model",
          title: "Wallet",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
          {
          name: "__slot:agent",
          sortField: "Type",
          title: "Agent type",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
        //  {
        //   name: "__slot:accve",
        //   sortField: "Account vehicles",
        //   title: "Account vehicles",
        //   titleClass: "",
        //   dataClass: "",
        //   width: "10%"
        // },
        //  {
        //   name: "__slot:nfc_terminals",
        //   sortField: "Account vehicles",
        //   title: "NFC terminals",
        //   titleClass: "",
        //   dataClass: "",
        //   width: "10%"
        // },
        //   {
        //   name: "__slot:port",
        //   sortField: "Account vehicles",
        //   title: "Port",
        //   titleClass: "",
        //   dataClass: "",
        //   width: "10%"
        // },
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
      modalinfo(wallet,type,port){
    this.RightmodalData = {"wallet":wallet,"type":type,"port":port}
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
    },
    loadInfo(){
        Axios.get(this.apiBase,{headers: hToken()})
        .then(res => {
          console.log(res.data.data[0].account_vehicles);
          this.apiBase = res.data.data[0].account_vehicles
          this.total = res.total;
          this.from = res.from;
          this.to = res.to;
              this.items = this.agents
              console.log(this.apiBase);

        //   this.items = res.data.map(x => {
        //     return {
        //       ...x,
        //       img: x.img.replace("/img/", "/img/products/")
        //     };
        //   });
          console.log(this.items)
          this.perPage = res.per_page;
          this.selectedItems = [];
          this.lastPage = res.last_page;
          this.isLoad = true;
        })
        .then(err=>{
          console.log(err);
        });
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
//   mounted() {
//         this.paramId = this.$router.currentRoute.params.id
//       console.log(this.paramId)
//       },
  created(){
    //   this.paramId = this.$router.currentRoute.params.id
    // this.apiBase= `${PROXY}admin/agent/details/${this.paramId}`,
    console.log(this.head);
    this.loadInfo();
    console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  }
};
</script>
