<template>
<div>
 <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.vehicles')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
  <b-tabs content-class="mt-3" justified>
    <b-tab title="All" active>
        <b-row >
        <b-colxx sm="12" md="4" class="mb-4" v-for="(test,index) in vehicles" :key="index">
            <vehicles-Card v-bind:test="test"></vehicles-Card>
        </b-colxx>
        </b-row>
    </b-tab>

     <b-tab title="Imports">
 Import
    </b-tab>
    <b-tab title="Commercials"><p>Commercials</p></b-tab>
  </b-tabs>
</div>
</template>

<script>
import vehiclesCard from "./vehiclesCard.vue";

export default {
  data () {
    return {
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
  }
};
</script>
