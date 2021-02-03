<template>
  <div>
    <b-card>
      <b-tabs card no-fade>
        <b-tab title="Payers">
          <b-button-group class="mb-2">
            <b-button disabled>Export</b-button>
            <b-button variant="primary">PDF</b-button>
            <b-button variant="primary">Excel</b-button>
            <b-button variant="primary">Email</b-button>
          </b-button-group>

          <vuetable
            ref="vuetable"
            class="table-divided order-with-arrow"
            :query-params="makeQueryParams"
            :per-page="payers.perPage"
            :http-options="head"
            :api-url="payers.apiBase"
            :reactive-api-url="false"
            :fields="payers.fields"
            pagination-path
            :row-class="onRowClass"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:cell-rightclicked="rightClicked"
          >
          </vuetable>
        </b-tab>
        <b-tab title="Agents">
          <b-button-group class="mb-2">
            <b-button disabled>Export</b-button>
            <b-button variant="primary">PDF</b-button>
            <b-button variant="primary">Excel</b-button>
            <b-button variant="primary">Email</b-button>
          </b-button-group>

          <vuetable
            ref="vuetable"
            class="table-divided order-with-arrow"
            :query-params="makeQueryParams"
            :per-page="agents.perPage"
            :http-options="head"
            :api-url="agents.apiBase"
            :reactive-api-url="false"
            :fields="agents.fields"
            pagination-path
            :row-class="onRowClass"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:cell-rightclicked="rightClicked"
          />
        </b-tab>
        <b-tab title="Agents System Activities">
          <b-button-group class="mb-2">
            <b-button disabled>Export</b-button>
            <b-button variant="primary">PDF</b-button>
            <b-button variant="primary">Excel</b-button>
            <b-button variant="primary">Email</b-button>
          </b-button-group>

          <vuetable
            ref="vuetable"
            class="table-divided order-with-arrow"
            :query-params="makeQueryParams"
            :per-page="agents_system_activities.perPage"
            :http-options="head"
            :api-url="agents_system_activities.apiBase"
            :reactive-api-url="false"
            :fields="agents_system_activities.fields"
            pagination-path
            :row-class="onRowClass"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:cell-rightclicked="rightClicked"
          />
        </b-tab>
        <b-tab title="Admins System Activities">
          <b-button-group class="mb-2">
            <b-button disabled>Export</b-button>
            <b-button variant="primary">PDF</b-button>
            <b-button variant="primary">Excel</b-button>
            <b-button variant="primary">Email</b-button>
          </b-button-group>

          <vuetable
            ref="vuetable"
            class="table-divided order-with-arrow"
            :query-params="makeQueryParams"
            :per-page="admins_system_activities.perPage"
            :http-options="head"
            :api-url="admins_system_activities.apiBase"
            :reactive-api-url="false"
            :fields="admins_system_activities.fields"
            pagination-path
            :row-class="onRowClass"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:cell-rightclicked="rightClicked"
          />
        </b-tab>
        <b-tab title="Payers System Activities">
          <b-button-group class="mb-2">
            <b-button disabled>Export</b-button>
            <b-button variant="primary">PDF</b-button>
            <b-button variant="primary">Excel</b-button>
            <b-button variant="primary">Email</b-button>
          </b-button-group>

          <vuetable
            ref="vuetable"
            class="table-divided order-with-arrow"
            :query-params="makeQueryParams"
            :per-page="payers_system_activities.perPage"
            :http-options="head"
            :api-url="payers_system_activities.apiBase"
            :reactive-api-url="false"
            :fields="payers_system_activities.fields"
            pagination-path
            :row-class="onRowClass"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:cell-rightclicked="rightClicked"
          />
        </b-tab>
        <b-tab title="Vehicles">
          <b-button-group class="mb-2">
            <b-button disabled>Export</b-button>
            <b-button variant="primary">PDF</b-button>
            <b-button variant="primary">Excel</b-button>
            <b-button variant="primary">Email</b-button>
          </b-button-group>

          <vuetable
            ref="vuetable"
            class="table-divided order-with-arrow"
            :query-params="makeQueryParams"
            :per-page="vehicles.perPage"
            :http-options="head"
            :api-url="vehicles.apiBase"
            :reactive-api-url="false"
            :fields="vehicles.fields"
            pagination-path
            :row-class="onRowClass"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:cell-rightclicked="rightClicked"
          />
        </b-tab>
        <b-tab title="All Vehicle Payments">
          <b-button-group class="mb-2">
            <b-button disabled>Export</b-button>
            <b-button variant="primary">PDF</b-button>
            <b-button variant="primary">Excel</b-button>
            <b-button variant="primary">Email</b-button>
          </b-button-group>

          <vuetable
            ref="vuetable"
            class="table-divided order-with-arrow"
            :query-params="makeQueryParams"
            :per-page="vehicle_payments.perPage"
            :http-options="head"
            :api-url="vehicle_payments.apiBase"
            :reactive-api-url="false"
            :fields="vehicle_payments.fields"
            pagination-path
            :row-class="onRowClass"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:cell-rightclicked="rightClicked"
          />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
  import Vuetable from "vuetable-2/src/components/Vuetable";
  import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap.vue";
  import {PROXY} from "../../../constants/config";
  import {hToken, LUX_ZONE} from "../../../constants/formKey";


  export default {
    name: 'Reports',
    components: {
      vuetable: Vuetable,
      "vuetable-pagination-bootstrap": VuetablePaginationBootstrap
    },
    data(){
      return {
        head: {headers: hToken()},
        isLoad: false,
        payers: {
          apiBase: `${PROXY}admin/payer/details`,//apiUrl + "/cakes/fordatatable",
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
          selectedPayload: null,
          selectedItemVehicles: [],
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
              name: "account_no",
              sortField: "account_no",
              title: "Account no.",
              titleClass: "",
              dataClass: "",
              width: "10%"
            },
            {
              name: "phone",
              sortField: "phone",
              title: "Phone",
              titleClass: "",
              dataClass: "",
              width: "10%"
            }
          ]
        },
        agents: {
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
          selectedPayload: null,
          selectedItemVehicles: [],
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
              name: "phone",
              sortField: "phone",
              title: "Phone",
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
        },
        payers_system_activities:{
          apiBase: `${PROXY}admin/account/activities`,//apiUrl + "/cakes/fordatatable",
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
          selectedPayload: null,
          selectedItemVehicles: [],
          fields: [
            {
              name: "account.account_no",
              sortField: "account.account_no",
              title: "Account No",
              titleClass: "",
              dataClass: "list-item-heading",
              width: "10%"
            },
            {
              name:"description",
              sortField: "description",
              title: "Description",
              titleClass: "",
              dataClass: "",
              width: "10%"
            }
          ]
        },
        agents_system_activities:{
          apiBase: `${PROXY}admin/agent/activities`,//apiUrl + "/cakes/fordatatable",
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
          selectedPayload: null,
          selectedItemVehicles: [],
          fields: [
            {
              name: "agent.agent_no",
              sortField: "agent.agent_no",
              title: "Account No",
              titleClass: "",
              dataClass: "list-item-heading",
              width: "10%"
            },
            {
              name:"description",
              sortField: "description",
              title: "Description",
              titleClass: "",
              dataClass: "",
              width: "10%"
            }
          ]
        },
        admins_system_activities:{
          apiBase: `${PROXY}admin/admin/activities`,//apiUrl + "/cakes/fordatatable",
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
          selectedPayload: null,
          selectedItemVehicles: [],
          fields: [
            {
              name: "admin.first_name",
              sortField: "admin.first_name",
              title: "First Name",
              titleClass: "",
              dataClass: "list-item-heading",
              width: "10%"
            },
            {
              name:"admin.last_name",
              sortField: "admin.last_name",
              title: "Last Name",
              titleClass: "",
              dataClass: "",
              width: "10%"
            },
            {
              name:"description",
              sortField: "description",
              title: "Description",
              titleClass: "",
              dataClass: "",
              width: "10%"
            }
          ]
        },
        vehicles: {
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
          selectedPayload: null,
          selectedItemVehicles: [],
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
              title: "VIN",
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
            }
          ]
        },
        vehicle_payments: {
          apiBase: `${PROXY}admin/vehicles/payments`,//apiUrl + "/cakes/fordatatable",
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
          selectedPayload: null,
          selectedItemVehicles: [],
          fields: [,
            {
              name: "amount",
              sortField: "amount",
              title: "Amount",
              titleClass: "",
              dataClass: "list-item-heading",
              width: "10%"
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
          ],
        },
      }
    },
    methods: {
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
        // console.log(field, 'feild');
        // console.log(item, 'item');
        // console.log(event,'eve');
      },

      rowClicked(dataItem, event) {
        // const itemId = dataItem.id;
        // console.log(dataItem)
        // this.selectedItemVehicles = dataItem.account_vehicles;
        // // this.$refs.modallg.show()
        // return;
        // if (event.shiftKey && this.selectedItems.length > 0) {
        //   let itemsForToggle = this.items;
        //   var start = this.getIndex(itemId, itemsForToggle, "id");
        //   var end = this.getIndex(
        //     this.selectedItems[this.selectedItems.length - 1],
        //     itemsForToggle,
        //     "id"
        //   );
        //   itemsForToggle = itemsForToggle.slice(
        //     Math.min(start, end),
        //     Math.max(start, end) + 1
        //   );
        //   this.selectedItems.push(
        //     ...itemsForToggle.map(item => {
        //       return item.id;
        //     })
        //   );
        //   this.selectedItems = [...new Set(this.selectedItems)];
        // } else {
        //   if (this.selectedItems.includes(itemId)) {
        //     this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        //   } else this.selectedItems.push(itemId);
        // }
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
      cellClick(event, payload){
        if(event.target.id === 'vehic'){
          console.log(payload);
          if(!payload.account_business_detail || !payload.account_business_detail.account_id) return;
          // this.selectedItemVehicles = payload;
          // this.$refs.modallg.show();
          this.$router.push(`payers/${payload.account_business_detail.account_id}`);
        }
        else if(event.target.id === 'view'){
          // this.selectedPayload = null;
          // console.log(this.selectedPayload);
          let payLoad = {...payload};
          delete payLoad.account_vehicles;
          let copy = {...payLoad};
          let account = copy.account_business_detail;
          delete payLoad.account_business_detail;
          let isBusiness = copy.is_business;
          delete payLoad.is_business;
          this.selectedPayload = [payLoad, account, isBusiness];
          // console.log(this.selectedPayload);
          this.$refs.modalright.show();
        }
      }
    },
  }
</script>
