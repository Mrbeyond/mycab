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
      <template v-if="isLoad">
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
import ListPageHeading from "./../ListsHeader/ListPageHeading";
import TerminalListing from "./TerminalListing.vue";
import { ADD_TERMINAL, TERMINALS } from '../../../../constants/formKey';

export default {

  components: {
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
      selectedItems: []
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
