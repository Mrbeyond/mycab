<template>
      <div>
   <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <!-- <b-img fluid-grow alt="Fluid-grow image" style="height:200px" v-if="analytic.image" :src="test.image" fluid></b-img> -->
        </div>
    </b-card-body>
    <b-card-footer>
        <p>Total agents: {{analytic.total_agents}}</p>
    </b-card-footer>
  </b-card>

   <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <!-- <b-img fluid-grow alt="Fluid-grow image" style="height:200px" v-if="analytic.image" :src="test.image" fluid></b-img> -->
        </div>
    </b-card-body>
    <b-card-footer>
      <p>Total vehicles: {{analytic.total_vehicles}}</p>

    </b-card-footer>
  </b-card>

   <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <!-- <b-img fluid-grow alt="Fluid-grow image" style="height:200px" v-if="analytic.image" :src="test.image" fluid></b-img> -->
        </div>
    </b-card-body>
    <b-card-footer>
      <p>Total imported vehicles: {{analytic.total_imported_vehicles}}</p>

    </b-card-footer>
  </b-card>

   <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <!-- <b-img fluid-grow alt="Fluid-grow image" style="height:200px" v-if="analytic.image" :src="test.image" fluid></b-img> -->
        </div>
    </b-card-body>
    <b-card-footer>
      <p>Total commercial vehicles: {{analytic.total_commercial_vehicles}}</p>

    </b-card-footer>
  </b-card>


   <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <!-- <b-img fluid-grow alt="Fluid-grow image" style="height:200px" v-if="analytic.image" :src="test.image" fluid></b-img> -->
        </div>
    </b-card-body>
    <b-card-footer>
        <p>Total payers: {{analytic.total_payers}}</p>
    </b-card-footer>
  </b-card>

  <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <!-- <b-img fluid-grow alt="Fluid-grow image" style="height:200px" v-if="analytic.image" :src="test.image" fluid></b-img> -->
        </div>
    </b-card-body>
    <b-card-footer>
      <p>Total vehicle payment: {{analytic.total_vehicle_payment}}</p>

    </b-card-footer>
  </b-card>

  <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <!-- <b-img fluid-grow alt="Fluid-grow image" style="height:200px" v-if="analytic.image" :src="test.image" fluid></b-img> -->
        </div>
    </b-card-body>
    <b-card-footer>
        <p>Total payers: {{analytic.total_payers}}</p>

    </b-card-footer>
  </b-card>
      </div>
</template>
<script>

export default {
    props: ["analytic"],
  data() {
    return {
    };
  }
};
</script>
