<template>
  <b-row>
    <b-colxx xxs="6" class="mb-4">
      <small-line-chart-card :class="itemClass" label-prefix="N" :data="smallChartData1" />
    </b-colxx>
    <b-colxx xxs="6" class="mb-4">
      <small-line-chart-card :class="itemClass" label-prefix="N" :data="smallChartData2" />
    </b-colxx>
    <b-colxx xxs="6" class="mb-4">
      <small-line-chart-card :class="itemClass" label-prefix="N" :data="smallChartData3" />
    </b-colxx>
    <!-- <b-colxx xxs="6" class="mb-4">
      <small-line-chart-card :class="itemClass" label-prefix="$" :data="smallChartData4" />
    </b-colxx> -->
  </b-row>
</template>
<script>
import SmallLineChartCard from "../Analcomponents/Cards/SmallLineChartCard.vue";
import {
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "../Analcomponents/data/charts";




export default {
  components: {
    "small-line-chart-card": SmallLineChartCard
  },
  props: ["itemClass"],
  data() {
    return {
      smallChartData1,
      smallChartData2,
      smallChartData3,
      smallChartData4
    };
  }
};
</script>
