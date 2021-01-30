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
      ></list-page-heading>
      <template v-if="isLoad">
        <terminal-page-listing
          :displayMode="displayMode"
          :items="items"
          :selectedItems="selectedItems"
          :toggleItem="toggleItem"
          :lastPage="lastPage"
          :perPage="perPage"
          :page="page"
          :changePage="changePage"
          :handleContextMenu="handleContextMenu"
          :onContextMenuAction="onContextMenuAction"
        ></terminal-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
  <!-- <div>
  <b-tabs content-class="mt-3" justified>

    <b-tab :title="$t('menu.all-agents')" active>
        <b-row >
        <b-colxx sm="12" md="4" class="mb-4" v-for="(test,index) in vehicles" :key="index">
            <agent-Card v-bind:test="test"></agent-Card>
        </b-colxx>
        </b-row>
    </b-tab>
    <b-tab :title="$t('menu.agents')" active>
        <b-row >
        <b-colxx sm="12" md="4" class="mb-4" v-for="(test,index) in vehicles" :key="index">
            <agent-Card v-bind:test="test"></agent-Card>
        </b-colxx>
        </b-row>
    </b-tab>
    <b-tab :title="$t('menu.port-agents')" active>
        <b-row >
        <b-colxx sm="12" md="4" class="mb-4" v-for="(test,index) in vehicles" :key="index">
            <agent-Card v-bind:test="test"></agent-Card>
        </b-colxx>
        </b-row>
    </b-tab>
    <b-tab :title="$t('menu.garage-agents')" active>
        <b-row >
        <b-colxx sm="12" md="4" class="mb-4" v-for="(test,index) in vehicles" :key="index">
            <agent-Card v-bind:test="test"></agent-Card>
        </b-colxx>
        </b-row>
    </b-tab>
    <b-tab :title="$t('menu.agents-registrations')" active>
        <b-row >
        <b-colxx sm="12" md="4" class="mb-4" v-for="(test,index) in vehicles" :key="index">
            <agent-Card v-bind:test="test"></agent-Card>
        </b-colxx>
        </b-row>
    </b-tab>
  </b-tabs>
</div> -->
</template>

<script>
import axios from "axios";
import { apiUrl } from "../../../../constants/config";
import ListPageHeading from "./../ListsHeader/ListPageHeading";
import TerminalListing from "./TerminalListing.vue";
// import ConversionRatesChartCard from "../../../containers/dashboards/ConversionRatesChartCard";
// import OrderStockRadarChart from "../../../containers/dashboards/OrderStockRadarChart";
// import ProductCategoriesDoughnut from "../../../containers/dashboards/ProductCategoriesDoughnut";
// import ProductCategoriesPolarArea from "../../../containers/dashboards/ProductCategoriesPolarArea";
// import ProfileStatuses from "../../../containers/dashboards/ProfileStatuses";
// import SalesChartCard from "../../../containers/dashboards/SalesChartCard";
// import SmallLineCharts from "../../../containers/dashboards/SmallLineCharts";
// import SortableStaticticsRow from "../../../containers/dashboards/SortableStaticticsRow";
// import AgentsCard from "../../../containers/dashboards/AgentsCard";

export default {

  components: {
    "list-page-heading": ListPageHeading,
    "terminal-page-listing": TerminalListing
  },
//    components: {
//     "converconversion-rates-chart-card": ConversionRatesChartCard,
//     "order-stock-radar-chart": OrderStockRadarChart,
//     "product-categories-doughnut": ProductCategoriesDoughnut,
//     "product-categories-polar-area": ProductCategoriesPolarArea,
//     "profile-statuses": ProfileStatuses,
//     "sales-chart-card": SalesChartCard,
//     "small-line-charts": SmallLineCharts,
//     "sortable-statictics-row": SortableStaticticsRow,
//     "agent-Card": AgentsCard
//   }
// };
  data() {
    return {
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

         agents: [
         {
            "id": 1,
            "state_id": null,
            "terminal_no": "1",
            "status": null,
            "createdAt": "2021-01-28T07:19:09.000Z",
            "updatedAt": "2021-01-28T07:19:09.000Z",
            "agents": []
        },
        {
            "id": 11,
            "state_id": 1,
            "terminal_no": "2",
            "status": 1,
            "createdAt": "2021-01-28T07:40:36.000Z",
            "updatedAt": "2021-01-28T07:40:36.000Z",
            "agents": []
        }
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
      selectedItems: []
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false;
      let resp = this.sort.column
        this.items =  this.agents
        .sort(function(a, b){
          var x = a[resp]; var y = b[resp]
          return ((x > y) ? 1 : ((x < y) ? -1 : 0))
                  });
          this.isLoad = true;
      // axios
      //   .get(this.apiUrl)
      //   .then(response => {
      //     return response.data;
      //   })
      //   .then(res => {
      //     this.total = res.total;
      //     this.from = res.from;
      //     this.to = res.to;
      //         this.items = this.agents

      //   //   this.items = res.data.map(x => {
      //   //     return {
      //   //       ...x,
      //   //       img: x.img.replace("/img/", "/img/products/")
      //   //     };
      //   //   });
      //   var resp = this.sort
      //   // console.log(resp)
      //    this.items =  this.agents.sort(function(a, b){
      //       if(a.resp > b.resp) return 1;
      //       if(a.resp < b.resp) return -1;
      //       return 0;
      //       });
      //     console.log(this.items)
      //     this.perPage = res.per_page;
      //     this.selectedItems = [];
      //     this.lastPage = res.last_page;
      //     this.isLoad = true;
      //   });
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
    }

  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    }
  },
  mounted() {
    this.loadItems();

  }
};
</script>
