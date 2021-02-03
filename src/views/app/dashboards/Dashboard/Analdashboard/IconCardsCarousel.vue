<template>
  <div class="icon-cards-row container">
    <glide-component :settings="glideIconsOption" v-if="analytic" class="mx-auto container">
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total Vehicle Payments" :is_currency="true" icon="simple-icon-user" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="All Payers"  icon="simple-icon-user" :value="analytic.total_payers" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Port Agents"  icon="simple-icon-user" :value="analytic.total_port_agents" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Garage Agents"  icon="simple-icon-user" :value="analytic.total_garage_agents" />

      <icon-card class="col-lg-3 col-md-4 col-12" title="All Vehicles" icon="iconsminds-bus-2" :value="analytic.total_vehicles"/>
      <icon-card class="col-lg-3 col-md-4 col-12" title="Commercial Vehicles"  icon="iconsminds-bus-2" :value="analytic.total_commercial_vehicles"/>
      <icon-card class="col-lg-3 col-md-4 col-12" title="Imported Vehicles"  icon="iconsminds-bus-2" :value="analytic.total_imported_vehicles" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="All Garages"  icon="iconsminds-embassy" :value="analytic.total_garages" />

      <icon-card class="col-lg-3 col-md-4 col-12" title="All Vehicle Tags"  icon="iconsminds-tag-3" :value="analytic.total_vehicle_tags" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Tagged Vehicles"  icon="iconsminds-tag-3" :value="analytic.total_tagged_vehicles" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Untagged Vehicles"  icon="iconsminds-tag-3" :value="analytic.total_untagged_vehicles" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="All Ports"  icon="iconsminds-ship" :value="analytic.total_ports" />
    </glide-component>
  </div>
</template>
<script>
import GlideComponent from "../Analcomponents/Carousel/GlideComponent";
import IconCard from "../Analcomponents/Cards/IconCard.vue";

export default {
  props: ["analytic"],
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard
  },
  data() {
    return {
      glideIconsOption: {
        gap: 10,
        perView: 4,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 7
          },
          576: {
            perView: 7
          },
          1600: {
            perView: 7
          },
          1800: {
            perView: 7
          }
        },
        hideNav: true
      }
    };
  }
};
</script>
