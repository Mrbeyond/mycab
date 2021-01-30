<template>
  <b-card class="h-100" title="Activeness">
    <div class="dashboard-donut-chart">
      <doughnut-chart :data="doughnutChartData" shadow />
    </div>
  </b-card>
</template>
<script>
import DoughnutChart from "../Analcomponents/Charts/Doughnut";
import { doughnutChartData } from "../Analcomponents/data/charts";

export default {
  components: {
    "doughnut-chart": DoughnutChart
  },
  data() {
    return {
      doughnutChartData
    };
  }
};
</script>
