<template>
<div>
 <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.dashboard')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
   <b-row class="d-flex justify-content-around">
    <b-card   no-body >
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px"  src="/assets/img/agents/agent3.jfif" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
        <h2>Total agents: {{analytic.total_agents}}</h2>
    </b-card-footer>
  </b-card>

   <b-card  no-body>
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px"  src="/assets/img/uploads/car.jfif" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
      <h2>Total vehicles: {{analytic.total_vehicles}}</h2>

    </b-card-footer>
  </b-card>

   <b-card no-body >
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px"  src="/assets/img/uploads/port.jpg" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
      <h2>Total imported vehicles: {{analytic.total_imported_vehicles}}</h2>

    </b-card-footer>
  </b-card>

   <b-card no-body >
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px"  src="/assets/img/uploads/garrage.jpg" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
      <h2>Total commercial vehicles: {{analytic.total_commercial_vehicles}}</h2>

    </b-card-footer>
  </b-card>


   <b-card no-body >
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px"  src="/assets/img/uploads/motorcycle.jfif" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
        <h2>Total payers: {{analytic.total_payers}}</h2>
    </b-card-footer>
  </b-card>

  <b-card no-body >
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px"  src="/assets/img/uploads/motorcycle.jfif" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
      <h2>Total vehicle payment: {{analytic.total_vehicle_payment}}</h2>

    </b-card-footer>
  </b-card>

  <b-card no-body >
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px"  src="/assets/img/uploads/motorcycle.jfif" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
        <h2>Total garages: {{analytic.total_garages}}</h2>

    </b-card-footer>
  </b-card>
        </b-row>
</div>
</template>

<script>
import vehiclesCard from "./AnalyticsCarde.vue";
import router from 'vue-router'

export default {
  props: ["analytic"],
  data () {
    return {
      pname:"",
      vehicles: [
        {
          owner: 'Stephen',
          date: '2021/01/24',
          payement:"paid",
          tag:"1",
          image:""
        },
                {
          owner: 'Bola',
          date: '2021/01/21',
          payement:"paid",
          tag:"2",
          image:"/assets/img/uploads/vehicle.jfif"

        },
         {
          owner: 'Victor',
          date: '2020/12/15',
          payement:"paid",
          tag:"3",
          image:""

        },
         {
          owner: 'Sola',
          date: '2021/01/28',
          payement:"yet to pay",
          tag:"yet to tag",
          image:""

        },
      ]
    }
  },
  components: {
    "vehicles-Card": vehiclesCard
  },
  mounted: function(){
      // this.pname =this.$router.currentRoute.params.name
      console.log(this.analytic)
  },
//  watch: {
//     $route(to, from) {
//       this.pname = to.params.name
//       console.log(this.pname)

//     }
//   }
};
</script>
