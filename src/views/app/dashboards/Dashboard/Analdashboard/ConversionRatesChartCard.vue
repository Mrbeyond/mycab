<template>
  <b-card class="dashboard-filled-line-chart" no-body>
    <b-card-body>
      <div class="float-left float-none-xs">
        <div class="d-inline-block">
          <h5 class="d-inline">{{ $t('dashboards.conversion-rates') }}</h5>
          <span class="text-muted text-small d-block">{{ $t('dashboards.per-session') }}</span>
        </div>
      </div>
      <b-dropdown
        id="ddown5"
        :text="$t('dashboards.this-week')"
        size="xs"
        variant="outline-secondary"
        class="float-right float-none-xs mt-2"
      >
        <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
        <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
      </b-dropdown>
    </b-card-body>
    <div class="chart card-body pt-0">
      <area-chart :data="conversionChartData" container-class="chart" shadow />
    </div>
  </b-card>
</template>
<script>
import AreaChart from "../Analcomponents/Charts/Area.vue";
import { conversionChartData } from "../Analcomponents/data/charts";
export default {
  components: {
    "area-chart": AreaChart
  },
  data() {
    return {
      conversionChartData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: '',
            data: [65, 60, 68, 60, 58, 63, 60],
            borderColor: colors.themeColor2,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor2,
            pointHoverBackgroundColor: colors.themeColor2,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: colors.themeColor2_10
          }
        ]
      }
    };
  }
};
</script>
