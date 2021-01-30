<template>
  <b-card :title="'Status'">
    <div  class="mb-4">
      <p class="mb-2">
       Total agents
        <span class="float-right text-muted">{{analytic.total_agents}}</span>
      </p>
      <b-progress :value="(analytic.total_agents / 100) * 100"></b-progress>
    </div>

     <div  class="mb-4">
      <p class="mb-2">
       Total commercial vehicles
        <span class="float-right text-muted">{{analytic.total_commercial_vehicles}}</span>
      </p>
      <b-progress :value="(analytic.total_commercial_vehicles / 100) * 100"></b-progress>
    </div>

     <div  class="mb-4">
      <p class="mb-2">
       Total garages
        <span class="float-right text-muted">{{analytic.total_garages}}</span>
      </p>
      <b-progress :value="(analytic.total_garages / 100) * 100"></b-progress>
    </div>

     <div  class="mb-4">
      <p class="mb-2">
       Total imported vehicles
        <span class="float-right text-muted">{{analytic.total_imported_vehicles}}</span>
      </p>
      <b-progress :value="(analytic.total_imported_vehicles / 100) * 100"></b-progress>
    </div>

     <div  class="mb-4">
      <p class="mb-2">
       Total payers
        <span class="float-right text-muted">{{analytic.total_payers}}</span>
      </p>
      <b-progress :value="(analytic.total_payers / 100) * 100"></b-progress>
    </div>

     <div  class="mb-4">
      <p class="mb-2">
       Total vehicle payment
        <span class="float-right text-muted">{{analytic.total_vehicle_payment}}</span>
      </p>
      <b-progress :value="(analytic.total_vehicle_payment / 100) * 100"></b-progress>
    </div>

     <div  class="mb-4">
      <p class="mb-2">
       Total vehicles
        <span class="float-right text-muted">{{analytic.total_vehicles}}</span>
      </p>
      <b-progress :value="(analytic.total_vehicles / 100) * 100"></b-progress>
    </div>
  </b-card>

  
</template>
<script>
import profileStatuses from "../Analcomponents/data/profileStatuses";

export default {
  props:["analytic"],
  data() {
    return {
      profileStatuses
    };
  }
};
</script>
