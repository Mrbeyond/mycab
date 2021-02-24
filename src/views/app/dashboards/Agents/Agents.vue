
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
      <b-colxx xxs="12">
        <h2 class="text-center mb-5">LIST OF AGENTS</h2>

          <!--:api-url="apiBase"

          @vuetable:row-clicked="rowClicked"
          -->
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
          @vuetable:cell-clicked="cellClicked"
        >
          <template slot="edit_agent" slot-scope="props">
            <b-button class="bg-primary" 
            >
              <!--
                @click="modalinfo(props.rowData)"
                v-b-modal.modalbasic-->
               Edit
            </b-button>
          </template>
          <template slot="preview" slot-scope="props">
            <b-button class="bg-primary"  v-b-modal.modalbasic
              @click="modalinfo(props.rowData)"
            >
               <i class="simple-icon-magnifier" />
            </b-button>
          </template>
          <template slot="details" slot-scope="props">
            <router-link :to="`/dashboard/agents/${props.rowData.agent_wallet.agent_id}`">
          <b-button class="bg-primary"><i class="simple-icon-login" /></b-button>
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
            <b-modal v-if="RightmodalData" id="modalbasic" ref="modalright"
             title="Details" modal-class="modal-right"
             >
              <b-card v-if="RightmodalData.wallet" class="shadow-sm mb-3">
                <h1>Wallet info</h1>
                <div v-if="RightmodalData.wallet">
                  <p class="text-muted text-small">Balance</p>
                  <p >&#8358;{{to_money(RightmodalData.wallet.balance)}}</p>
                  <p class="text-muted text-small">Postpaid Balance</p>
                  <p >&#8358;{{to_money(RightmodalData.wallet.postpaid_balance)}}</p>
                  <p class="text-muted text-small">Created on</p>
                  <p >{{Timest(RightmodalData.wallet.createdAt)}}</p>
                </div>
              </b-card>
              <b-card v-if="RightmodalData.basic" class="shadow-sm mb-3">
                <h1>Basic info</h1>
                <div v-if="RightmodalData.basic">
                  <p class="text-muted text-small">First Name</p>
                  <p >{{ RightmodalData.basic.first_name }}</p>
                  <p class="text-muted text-small">Last Name</p>
                  <p> {{ RightmodalData.basic.last_name }}</p>
                  <p class="text-muted text-small">Agent NO.</p>
                  <p >{{ RightmodalData.basic.agent_no }}</p>
                  <p class="text-muted text-small">Email</p>
                  <p >{{RightmodalData.basic.email}}</p>
                  <p class="text-muted text-small">Address</p>
                  <p >{{ RightmodalData.basic.address? RightmodalData.basic.address: "Not provided" }}</p>
                  <p class="text-muted text-small">Phone</p>
                  <p> {{ RightmodalData.basic.phone }}</p>
                  <p class="text-muted text-small">Created on</p>
                  <p >{{Timest(RightmodalData.basic.createdAt)}}</p>
                </div>
              </b-card>
              <b-card v-if="RightmodalData.garage || RightmodalData.port "
                class="shadow-sm "
              >
                <h1>{{ RightmodalData.garage? "Garage":"Port" }}</h1>
                <div v-if="RightmodalData.garage">
                  <p class="text-muted text-small">Name</p>
                  <p >{{ RightmodalData.garage.name }}</p>
                  <p class="text-muted text-small">Address</p>
                  <p> {{ RightmodalData.garage.address?RightmodalData.garage.address : "Not provided" }}</p>
                  <p class="text-muted text-small">Status</p>
                  <p >{{ Boolean(RightmodalData.garage.status)?"Active":"Inactive" }}</p>
                  <p class="text-muted text-small">Icon</p>
                  <p >{{Boolean(RightmodalData.garage.icon)? RightmodalData.garage.icon: 'Not available'}}</p>
                  <p class="text-muted text-small">Created on</p>
                  <p >{{Timest(RightmodalData.basic.createdAt)}}</p>
                </div>
                <div v-else>
                  <p class="text-muted text-small">Name</p>
                  <p >{{ RightmodalData.port.name }}</p>
                </div>
              </b-card>

              <template slot="modal-footer">
                <b-button variant="secondary" @click="hideModal('modalright')">
                  Cancel
                </b-button>
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
import { AGENTS, hToken,LUX_ZONE,permission,/* loadash,*/ toMoney } from "../../../../constants/formKey";
// import DatatableHeading from "../../../../containers/datatable/DatatableHeading";

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
      apiBase: `${PROXY}admin/agent/details`,//apiUrl + "/cakes/fordatatable",
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

      isFetched: false,
      isLoading: true,

      fields: [,
        {
        name: "first_name",
        sortField: "first_name",
        title: "First Name",
        titleClass: "",
        dataClass: "list-item-heading",
        width: "10%"
        },
        {
          name:"last_name",
          sortField: "last_name",
          title: "Last Name",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
        {
          name:"agent_no",
          sortField: "agent_no",
          title: "Agent No",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
        {
          name:"port_id",
          sortField: "port_id",
          title: "Type",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback: (val)=>{
            return Boolean(val)? 'Port': 'Garage';
          }
        },
        {
          name: "phone",
          sortField: "phone",
          title: "Phone",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
        {
          name: "status",
          sortField: "status",
          title: "Satus",
          titleClass: "",
          dataClass: "",
          width: "10%",
          callback(val){
            return Boolean(val)? 'Active': 'Inactive';
          }
        },

        {
          name: "__slot:preview",
          sortField: "",
          title: "Basic info",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
        {
          name: "__slot:edit_agent",
          sortField: "",
          title: "Update",
          titleClass: "",
          dataClass: "",
          width: "10%"
        },
          {
          name: "__slot:details",
          sortField: "",
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
    to_money(val){
      let result = toMoney(val);
      return (result == "0")? "0.00": result;
    },

    Timest(time){
      return LUX_ZONE(time);
    },

    modalinfo(PL){
      let garage = null;
      let port = null;
      let basic = {
        first_name: PL.first_name,
        last_name: PL.last_name,
        phone: PL.phone,
        email: PL.email,
        agent_no: PL.agent_no,
        address: PL.address,
        createdAt: PL.createdAt,
      };

      let wallet = {
        balance: PL.agent_wallet.balance,
        postpaid_balance: PL.agent_wallet.post_paid_balance,
        createdAt: PL.agent_wallet.createdAt,
      }

      if(Boolean(PL.port)){
        port = {
          name: PL.port.name,
          createdAt: PL.port.createdAt,        }
      }else if(Boolean(PL.garage)){
        garage ={
          name: PL.garage.name,
          address: PL.garage.address,
          status: PL.garage.status,
          icon: PL.garage.icon,
          createdAt: PL.garage.createdAt,
        }
      }

      this.RightmodalData = {basic:basic, wallet:wallet, port:port, garage:garage,}
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

    getAgents(){
      this.$store.dispatch(AGENTS);
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

    localData(){
      return this.$store.getters.agents;
    },

    resKey(){
      return this.$store.getters.resKey;
    }

  },
  watch: {
    resKey(){
      if(this.resKey && this.resKey.owner && this.resKey.owner == AGENTS){
        if(!this.resKey.status){
          this.isFetched = true;
        }else{
          this.isFetched = false;
        }
        this.isLoading = false;
      }
    }
  },
  created(){
    if(!permission("agents", this.$store.getters.currentUser)){
      localStorage.clear();
      this.$router.push('/login');
      return
    }else{
      this.getAgents();
    }
    // alert();

    // console.log(this.head);
    // console.log( loadash.sortBy([{a:1,b:2,c:{a:1,b:2}},{a:1,b:2,c:{a:5,b:2}},{a:5,b:2,c:{a:2,b:2}},{a:3,b:2,c:{a:1,b:2}}], ['c.a','c.b']));
  },

  beforeRouteEnter(to, from, next){
    next(vm=>{
      if(!permission("agents", vm.$store.getters.currentUser)){
        localStorage.clear();
        vm.$router.push('/login');
        return
      }
    })

  },

};
</script>
