<template>
  <div class="icon-cards-row container">
    <glide-component :settings="glideIconsOption" v-if="analytic" class="mx-auto container">
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total Agent"  icon="simple-icon-user" :value="analytic.total_agents" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total Vehicle" icon="iconsminds-bus-2" :value="analytic.total_vehicles"/>
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total commercial vehicles"  icon="iconsminds-bus-2" :value="analytic.total_commercial_vehicles"/>
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total garages"  icon="iconsminds-bus-2" :value="analytic.total_garages" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total imported vehicles"  icon="iconsminds-bus-2" :value="analytic.total_imported_vehicles" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total  payers"  icon="iconsminds-mail-read" :value="analytic.total_payers" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />

      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />

      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />
      <icon-card class="col-lg-3 col-md-4 col-12" title="Total vehicle payment" icon="iconsminds-envelope" :value="analytic.total_vehicle_payment" />


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
