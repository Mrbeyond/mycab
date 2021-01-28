<template>
      <div>
  <b-card  class="" no-body >
    <b-card-body >
        <div class="row">
        <b-img fluid-grow alt="Fluid-grow image" style="height:200px" :src="test.image" fluid></b-img>
        </div>
    </b-card-body>
    <b-card-footer>
        <p>owner: {{test.owner}}</p>
      <p>date: {{test.date}}</p>
      <p>payement: {{test.payement}}</p>
      <p>tag: {{test.tag}}</p>
      <h4 class="bg-primary" ><a href="#" class="float-right text-primary">Profile</a> </h4>
    </b-card-footer>
  </b-card>
      </div>
</template>
<script>
import AreaChart from "../../components/Charts/Area";
import { areaChartData } from "../../data/charts";

export default {
    props: ["test"],

  components: {
    "area-chart": AreaChart
  },
  data() {
    return {
      areaChartData
    };
  }
};
</script>
