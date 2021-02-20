import { adminRoot } from "./config";


// id: "dashboards",
// icon: "iconsminds-shop-4",
// label: "menu.dashboards",
// to: `${adminRoot}s`,
// roles: [UserRole.Admin, UserRole.Editor],

const data = [
  {
    id:"dashboard",
    icon:"iconsminds-shop-4",
    label: "menu.dashboard",
    to: `${adminRoot}`,
  },
  {
    id:"payers",
    icon:"simple-icon-people",
    label: "menu.payers",
    to: `${adminRoot}/payers`,
    // roles: [UserRole.Admin, UserRole.Editor],,
    // subs:[
    //   {
    //     icon: "simple-icon-people",
    //     label: "menu.all-payers",
    //     to: `${adminRoot}/payers`,
    //     // roles: [UserRole.Admin, UserRole.Editor],
    //     }
    // ]
  },
  {id:"agents",
  icon:"simple-icon-people",
  label: "menu.agents",
  to: `${adminRoot}/agents`,
  // roles: [UserRole.Admin, UserRole.Editor],,
  // subs:[
  //     {
  //     icon: "simple-icon-list",
  //     label: "menu.all-agents",
  //     to: `${adminRoot}/agents`,
  //     // roles: [UserRole.Admin, UserRole.Editor],
  //     },
  //     {
  //       icon: "simple-icon-people",
  //       label: "menu.port-agents",
  //       to: `${adminRoot}/agents/ports`,
  //       // roles: [UserRole.Admin, UserRole.Editor],
  //     },
  //     {
  //       icon: "simple-icon-people",
  //       label: "menu.garrage-agents",
  //       to: `${adminRoot}/agents/garages`,
  //       // roles: [UserRole.Admin, UserRole.Editor],
  //     },
  //   ]
  },
  {id:"admins",
  icon:"simple-icon-graduation",
  label: "menu.admins",
  to: `${adminRoot}/admins`,
  // roles: [UserRole.Admin, UserRole.Editor],,
  // subs:[
  //   {
  //   icon: "simple-icon-list",
  //   label: "menu.all-admins",
  //   to: `${adminRoot}/admins`,
  //   // roles: [UserRole.Admin, UserRole.Editor],
  //   }
  // ]},
  // {
  //   id:"wallets",
  //   icon:"simple-icon-wallet",
  //   label: "menu.wallets",
  //   to: `${adminRoot}/wallets`,
    // roles: [UserRole.Admin, UserRole.Editor],,
    // subs:[
    //   {
    //   icon: "simple-icon-plus",
    //   label: "menu.wallets",
    //   to: `${adminRoot}/wallets`,
    //   // roles: [UserRole.Admin, UserRole.Editor],
    //   },
      // {
      //   icon: "simple-icon-plus",
      //   label: "menu.add-payer",
      //   to: `${adminRoot}/wallets/transaction`,
      //   // roles: [UserRole.Admin, UserRole.Editor],
      //   },
    // ]
  },

  {id:"vehicles",
  icon:"iconsminds-bus-2",
  label: "menu.vehicles",
  to: `${adminRoot}/vehicles`,
  // roles: [UserRole.Admin, UserRole.Editor],,
  subs:[
    {
    icon: "simple-icon-list",
    label: "menu.all-vehicles",
    to: `${adminRoot}/vehicles`,
    // roles: [UserRole.Admin, UserRole.Editor],
    },
    {
      icon: "simple-icon-list",
      label: "menu.vehicle-types",
      to: `${adminRoot}/vehicle-types`,
      // roles: [UserRole.Admin, UserRole.Editor],
    },
  ]},
  // {
  //   id:"port",
  //   icon:"iconsminds-ship",
  //   label: "menu.port",
  //   to: `${adminRoot}/location/ports`,
  //   // roles: [UserRole.Admin, UserRole.Editor],,
  //   // subs:[
  //   //   {
  //   //   label: "menu.all-vehicle-payments",
  //   //   to: `${adminRoot}/all-vehicle-payments`,
  //   //   // roles: [UserRole.Admin, UserRole.Editor],
  //   //   },
  //   //   {
  //   //     label: "menu.commercial-vehicle-payments",
  //   //     to: `${adminRoot}/commercial-vehicle-payments`,
  //   //     // roles: [UserRole.Admin, UserRole.Editor],
  //   //   },
  //   //   {
  //   //     label: "menu.import-vehicle-payments",
  //   //     to: `${adminRoot}/import-vehicle-payments`,
  //   //     // roles: [UserRole.Admin, UserRole.Editor],
  //   //   },
  //   // ]
  // },

  {
    id:"finance",
    icon:"simple-icon-organization",
    label: "menu.finance",
    to: `${adminRoot}/finance`,
    // roles: [UserRole.Admin, UserRole.Editor],,
    // subs:[
    //   {
    //   label: "menu.all-vehicle-payments",
    //   to: `${adminRoot}/all-vehicle-payments`,
    //   // roles: [UserRole.Admin, UserRole.Editor],
    //   },
    //   {
    //     label: "menu.commercial-vehicle-payments",
    //     to: `${adminRoot}/commercial-vehicle-payments`,
    //     // roles: [UserRole.Admin, UserRole.Editor],
    //   },
    //   {
    //     label: "menu.import-vehicle-payments",
    //     to: `${adminRoot}/import-vehicle-payments`,
    //     // roles: [UserRole.Admin, UserRole.Editor],
    //   },
    // ]
  },
  {id:"vehicle_tags",
    icon:"iconsminds-tag-3",
    label: "menu.vehicle-tags",
    to: `${adminRoot}/tags`,
    // roles: [UserRole.Admin, UserRole.Editor],,
    // subs:[
    //   {
    //   icon: "simple-icon-badge",
    //   label: "menu.all-tags",
    //   to: `${adminRoot}/tags`,
    //   // roles: [UserRole.Admin, UserRole.Editor],
    //   }
    // ]
  },



  {id:"locations",
    icon:"iconsminds-map-marker-2",
    label: "menu.locations",
    to: `${adminRoot}/locations`,
    // roles: [UserRole.Admin, UserRole.Editor],,
    subs:[
      {
        icon: "simple-icon-location-pin",
        label: "Local Governments",
        to: `${adminRoot}/lgs`,
        // roles: [UserRole.Admin, UserRole.Editor],
      },
      {
        icon: "iconsminds-embassy",
        label: "Garages",
        to: `${adminRoot}/garages`,
        // roles: [UserRole.Admin, UserRole.Editor],
      },
      {
        icon: "iconsminds-ship",
        label: "Ports",
        to: `${adminRoot}/ports`,
        // roles: [UserRole.Admin, UserRole.Editor],
      },
    ]},
  {id:"cards",
  icon:"simple-icon-credit-card",
  label: "menu.vehicle-cards",
  to: `${adminRoot}/cards`,
  // roles: [UserRole.Admin, UserRole.Editor],,
  // subs:[
  //   {
  //   icon: "simple-icon-location-pin",
  //   label: "Local Governments",
  //   to: `${adminRoot}/localgovernment`,
  //   // roles: [UserRole.Admin, UserRole.Editor],
  //   },
  //   {
  //     icon: "simple-icon-plus",
  //     label: "Garages",
  //     to: `${adminRoot}/garages`,
  //     // roles: [UserRole.Admin, UserRole.Editor],
  //   },
  // ]
}
  ,
  // subs:[
  //   {
  //   icon: "simple-icon-list",
  //   label: "menu.all-cards",
  //   to: `${adminRoot}/cards`,
  //   // roles: [UserRole.Admin, UserRole.Editor],
  //   },
  //   {
  //     icon: "simple-icon-plus",
  //     label: "menu.add-card",
  //     to: `${adminRoot}/add-card`,
  //     // roles: [UserRole.Admin, UserRole.Editor],
  //   },
  // ]
  {
    id: "terminals",
    icon: "iconsminds-shop-4",
    label: "menu.terminals",
    to: `${adminRoot}/terminals`,
  },
  { id:"reports",
    icon: "simple-icon-notebook",
    label: "menu.reports",
    to: `${adminRoot}/reports`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  { id:"analytics",
    icon: "simple-icon-feed",
    label: "menu.analytics",
    to: `${adminRoot}/analytics`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {id:"settings",
  icon: "simple-icon-settings",
  label: "menu.settings",
  to: `${adminRoot}/settings`,
  subs: [
    { id:"reset-password",
      icon: "simple-icon-password",
      label: "Reset password",
      to: `${adminRoot}/reset-password`,
      // roles: [UserRole.Admin, UserRole.Editor],
  },
  ]
  // roles: [UserRole.Admin, UserRole.Editor],
  }

];
export default data;
