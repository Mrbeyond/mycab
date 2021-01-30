<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="$t('menu.cards')"
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
        <tran-page-listing
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
        ></tran-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import axios from "axios";
import { apiUrl } from "../../../../constants/config";
import ListPageHeading from "./../ListsHeader/ListPageHeading.vue";
import TransactionListing from "./TransactionListing.vue";

export default {

  components: {
    "list-page-heading": ListPageHeading,
    "tran-page-listing": TransactionListing
  },
  data() {
    return {
       sortOptions: [
        {
          column: "balance",
          label: "Balance"
        },
         {
          column: "post_paid_balance",
          label: "Post paid  balance"
        },
      ],

         agents: [
          {
          "balance": 202000,
          "post_paid_balance": 0,
          "account_wallet_transactions": [
            {
              "reference": null,
              "description": null,
              "amount": 2000,
              "type": 1,
              "status": 1,
              "createdAt": "2021-01-28T14:26:11.000Z",
              "payment_channel": {
                "name": "Paystack"
              }
            },
            {
              "reference": null,
              "description": null,
              "amount": 200000,
              "type": 1,
              "status": 1,
              "createdAt": "2021-01-28T13:50:33.000Z",
              "payment_channel": null
            }
          ]
    },

    
     {
          "balance": 202000,
          "post_paid_balance": 0,
          "account_wallet_transactions": [
            {
              "reference": null,
              "description": null,
              "amount": 2000,
              "type": 1,
              "status": 1,
              "createdAt": "2021-01-28T14:26:11.000Z",
              "payment_channel": {
                "name": "Paystack"
              }
            },
            {
              "reference": null,
              "description": null,
              "amount": 200000,
              "type": 1,
              "status": 1,
              "createdAt": "2021-01-28T13:50:33.000Z",
              "payment_channel": null
            }
          ]
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
          console.log(this.items)

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
