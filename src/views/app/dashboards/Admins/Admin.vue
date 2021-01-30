<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="$t('menu.admins')"
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
        <admin-page-listing
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
        ></admin-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import {hToken} from './../../../../constants/formKey'
import Axios from 'axios';
import { apiUrl } from "../../../../constants/config";
import ListPageHeading from "./../ListsHeader/ListPageHeading.vue";
import AdminListing from "./AdminListing.vue";

export default {

  components: {
    "list-page-heading": ListPageHeading,
    "admin-page-listing": AdminListing
  },
  data() {
    return {
       sortOptions: [
        {
          column: "first_name",
          label: "Firstname"
        },
         {
          column: "last_name",
          label: "Lastname"
        },
         {
          column: "email",
          label: "Email"
        },
        {
          column: "phone",
          label: "Phone"
        },
      ],

         agents: [
           {
          "id": 21,
          "first_name": "Samuel",
          "last_name": "Adesina",
          "email": "asoluwaseun@yahoo.com",
          "phone": "08130027102",
          "admin_type_id": "1",
          "status": 1,
          "updatedAt": "2021-01-27T14:13:59.643Z",
          "createdAt": "2021-01-27T14:13:59.643Z"
        },
         {
          "id": 25,
          "first_name": "Samson",
          "last_name": "Aa",
          "email": "adeola@gmail.com",
          "phone": "08135456776",
          "admin_type_id": "1",
          "status": 1,
          "updatedAt": "2021-01-27T14:13:59.643Z",
          "createdAt": "2021-01-27T14:13:59.643Z"
        }
      ],
      isLoad: false,
      apiBase: apiUrl + "/cakes/fordatatable",
      displayMode: "list",
     sort: {
        column: "first_name",
        label: "Firstname"
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
      // this.items = this.agents
      let resp = this.sort.column
  this.items =  this.agents
  .sort(function(a, b){
    var x = a[resp]; var y = b[resp]
    return ((x > y) ? 1 : ((x < y) ? -1 : 0))
            });
    this.isLoad = true;

      Axios
        .get(this.apiUrl)
        .then(response => {
          return response.data;
        })
        .then(res => {
          console.log(res)
          this.total = res.total;
          this.from = res.from;
          this.to = res.to;
              this.items = this.agents

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
        });
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
