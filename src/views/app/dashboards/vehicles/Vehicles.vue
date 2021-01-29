<template>
<div>
 <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.vehicles')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
  <b-tabs content-class="mt-3" justified>
    <b-tab title="All" :active="pname==undefined" @click="$router.push(' ')">
        <b-row >
        <b-colxx sm="12" md="4" class="mb-4" v-for="(test,index) in vehicles" :key="index">
            <vehicles-Card v-bind:test="test"></vehicles-Card>
        </b-colxx>
        </b-row>
    </b-tab >
     <b-tab title="Imports" :active="pname=='import'" @click="pname===undefined ? $router.push('vehicles/import') : $router.push('import')">
       Import
    </b-tab>
    <b-tab title="Commercials" :active="pname=='commercial'" @click="pname===undefined ? $router.push('vehicles/commercial') : $router.push('commercial')">
      <p>Commercials</p></b-tab>
  </b-tabs>
</div>
</template>

<script>
import vehiclesCard from "./vehiclesCard.vue";
import router from 'vue-router'

export default {
  data () {
    return {
      pname:"",
      vehicles: [
        {
          owner: 'Stephen',
          date: '2021/01/24',
          payement:"paid",
          tag:"1",
          image:"/assets/img/uploads/car.jfif"
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
          image:"/assets/img/uploads/truck.jfif"

        },
         {
          owner: 'Sola',
          date: '2021/01/28',
          payement:"yet to pay",
          tag:"yet to tag",
          image:"/assets/img/uploads/motorcycle.jfif"

        },
      ]
    }
  },
  components: {
    "vehicles-Card": vehiclesCard
  },
  mounted: function(){
      this.pname =this.$router.currentRoute.params.name
      console.log(this.pname)
  },
 watch: {
    $route(to, from) {
      this.pname = to.params.name
      console.log(this.pname)

    }
  }
};
</script>
