<template>
<div>
  <nav class="navbar fixed-top">
    <div class="d-flex align-items-center navbar-left">
      <a
        href="#"
        class="menu-button d-none d-md-block"
        @click.prevent.stop="changeSideMenuStatus({step :menuClickCount+1,classNames:menuType,selectedMenuHasSubItems})"
      >
        <menu-icon />
      </a>
      <a
        href="#"
        class="menu-button-mobile d-xs-block d-sm-block d-md-none"
        @click.prevent.stop="changeSideMenuForMobile(menuType)"
      >
        <mobile-menu-icon />
      </a>
    </div>
    <router-link class="navbar-logo" tag="a" :to="adminRoot">
      <span class="text-center logo-size logo-bold">MECP</span>
    </router-link>

    <div class="navbar-right">
      <div class="d-none d-md-inline-block align-middle mr-3">
        <switches
          id="tool-mode-switch"
          v-model="isDarkActive"
          theme="custom"
          class="vue-switcher-small"
          color="primary"
        />
        <b-tooltip target="tool-mode-switch" placement="left" title="Dark Mode"></b-tooltip>
      </div>
      <div class="header-icons d-inline-block align-middle">
        <div class="position-relative d-none d-sm-inline-block">
          <b-dropdown
            variant="empty"
            size="sm"
            right
            toggle-class="header-icon"
            menu-class="position-absolute mt-3 iconMenuDropdown"
            no-caret
          >
            <!--<template slot="button-content">
              <i class="simple-icon-grid" />
            </template>
             <div>
              <router-link tag="a" :to="`${adminRoot}/dashboards/default`" class="icon-menu-item">
                <i class="iconsminds-shop-4 d-block" />
                {{$t('menu.dashboards')}}
              </router-link>
              <router-link tag="a" :to="`${adminRoot}/ui/components/charts`" class="icon-menu-item">
                <i class="iconsminds-bar-chart-4 d-block" />
                Analytics
              </router-link>
              <router-link tag="a" :to="`${adminRoot}/ui`" class="icon-menu-item">
                <i class="iconsminds-user d-block" />
                Payers
              </router-link>
              <router-link tag="a" :to="`${adminRoot}/applications/chat`" class="icon-menu-item">
                <i class="iconsminds-user d-block" />
                Agents
              </router-link>
              <router-link tag="a" :to="`${adminRoot}/applications/survey`" class="icon-menu-item">
                <i class="iconsminds-bus-2 d-block" />
                Vehicles
              </router-link>
              <router-link tag="a" :to="`${adminRoot}/applications/todo`" class="icon-menu-item">
                <i class="iconsminds-check d-block" />
                Vehicle Payments
              </router-link>
            </div>-->
          </b-dropdown>
        </div>

        <div class="position-relative d-none d-sm-inline-block">
          <div class="btn-group">
            <b-button variant="empty" class="header-icon btn-sm" @click="toggleFullScreen">
              <i
                :class="{'d-inline-block':true,'simple-icon-size-actual':fullScreen,'simple-icon-size-fullscreen':!fullScreen }"
              />
            </b-button>
          </div>
        </div>
      </div>
      <div class="user d-inline-block">
        <b-dropdown
          class="dropdown-menu-right"
          right
          variant="empty"
          toggle-class="p-0"
          menu-class="mt-3"
          no-caret
        >
          <template slot="button-content">
            <span class="name mr-1">{{currentUser.first_name}}</span>
            <span>
              <span class="p-3 rounded bg-primary">
              {{currentUser.first_name.charAt(0).toUpperCase()}}
              {{currentUser.last_name.charAt(0).toUpperCase()}}
              </span>
            </span>
          </template>
          <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
// @ts-nocheck
import Switches from "vue-switches";
import notifications from "../../data/notifications";

import { mapGetters, mapMutations, mapActions } from "vuex";
import { MenuIcon, MobileMenuIcon } from "../../components/Svg";
import {
  searchPath,
  menuHiddenBreakpoint,
  localeOptions,
  buyUrl,
  adminRoot
} from "../../constants/config";
import { getDirection, setDirection, getThemeColor, setThemeColor } from "../../utils";
export default {
  components: {
    "menu-icon": MenuIcon,
    "mobile-menu-icon": MobileMenuIcon,
    switches: Switches
  },
  data() {
    return {
      searchKeyword: "",
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      searchPath,
      adminRoot,
      localeOptions,
      buyUrl,
      notifications,
      isDarkActive: false
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile"]),
    ...mapActions(["setLang", "signOut"]),
    search() {
      this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`);
      this.searchKeyword = "";
    },
    searchClick() {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true;
        } else {
          this.search();
          this.isMobileSearch = false;
        }
      } else {
        this.search();
      }
    },
    handleDocumentforMobileSearch() {
      if (!this.isSearchOver) {
        this.isMobileSearch = false;
        this.searchKeyword = "";
      }
    },

    changeLocale(locale, direction) {
      const currentDirection = getDirection().direction;
      if (direction !== currentDirection) {
        setDirection(direction);
      }

      this.setLang(locale);
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      // this.signOut().then(() => {

      // });
    },

    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen();

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.fullScreen = !isInFullScreen;
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems"
    })
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentforMobileSearch);
  },
  created() {
    const color = getThemeColor();
    this.isDarkActive = color.indexOf("dark") > -1;
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
    },
    isDarkActive(val) {
      let color = getThemeColor();
      let isChange = false;
      if (val && color.indexOf("light") > -1) {
        isChange = true;
        color = color.replace("light", "dark");
      } else if (!val && color.indexOf("dark") > -1) {
        isChange = true;
        color = color.replace("dark", "light");
      }
      if (isChange) {
        setThemeColor(color);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    isMobileSearch(val) {
      if (val) {
        document.addEventListener("click", this.handleDocumentforMobileSearch);
      } else {
        document.removeEventListener(
          "click",
          this.handleDocumentforMobileSearch
        );
      }
    }
  }
};
</script>
